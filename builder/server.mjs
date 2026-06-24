// In-place static rebuilder.
//
// Runs alongside the API with the frontend source + Astro installed and the
// served `frontend` volume mounted read-write at SERVE_DIR. On POST /rebuild it
// runs `astro build` against the live API (CONTENT_API) into a temp dir, then
// swaps the freshly built files into SERVE_DIR. Triggered by the API's
// POST /api/rebuild (the admin "Publish" button).
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { cp, rm, mkdtemp, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PORT = Number(process.env.BUILDER_PORT) || 9000;
const SERVE_DIR = process.env.SERVE_DIR || "/srv/dist";
const APP_DIR = process.env.APP_DIR || "/app";

let building = false;

function astroBuild(outDir) {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["astro", "build", "--outDir", outDir], {
      cwd: APP_DIR,
      env: process.env, // CONTENT_API is set here so the build reads the DB
      stdio: "inherit",
    });
    proc.on("error", reject);
    proc.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`astro build exited ${code}`))));
  });
}

async function swapInto(outDir) {
  // Replace the contents of SERVE_DIR (keep the mount point itself).
  for (const entry of await readdir(SERVE_DIR)) {
    await rm(join(SERVE_DIR, entry), { recursive: true, force: true });
  }
  await cp(outDir, SERVE_DIR, { recursive: true });
}

async function rebuild() {
  const outDir = await mkdtemp(join(tmpdir(), "astro-build-"));
  try {
    await astroBuild(outDir);
    await swapInto(outDir);
    console.log("[builder] rebuild complete");
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
}

createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/rebuild") {
    if (building) {
      res.writeHead(409, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "already building" }));
    }
    building = true;
    // Acknowledge immediately; the build runs in the background.
    res.writeHead(202, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "building" }));
    rebuild()
      .catch((err) => console.error("[builder] rebuild failed:", err))
      .finally(() => {
        building = false;
      });
    return;
  }
  res.writeHead(404);
  res.end();
}).listen(PORT, () => console.log(`[builder] listening on :${PORT}`));
