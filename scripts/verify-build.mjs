// Build-time sanity check on the prerendered output (run after `astro build`).
// Verifies every route produced non-empty HTML with a non-empty <title>, that
// indexable pages carry real body text, and that titles are unique within each
// language (guards against the old "one title for every page" regression).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const errors = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(DIST);
if (files.length === 0) errors.push("No HTML files found in dist/ - did the build run?");

const byLang = {};
for (const f of files) {
  const html = readFileSync(f, "utf8");

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "").trim();
  if (!title) errors.push(`${f}: missing or empty <title>`);

  const noindex = /name="robots"[^>]*content="noindex/.test(html);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // Indexable pages must ship real content without JS; admin/404 are noindex.
  if (!noindex && body.length < 100) {
    errors.push(`${f}: indexable page has too little static text (${body.length} chars)`);
  }

  const rel = f.slice(DIST.length + 1).replace(/\\/g, "/");
  const lang = rel.split("/")[0];
  (byLang[lang] ??= []).push({ f, title });
}

for (const [lang, pages] of Object.entries(byLang)) {
  const seen = new Map();
  for (const { f, title } of pages) {
    if (seen.has(title)) {
      errors.push(`Duplicate <title> within /${lang}/: "${title}" (${seen.get(title)} & ${f})`);
    } else {
      seen.set(title, f);
    }
  }
}

if (errors.length) {
  console.error(`\n[verify-build] FAILED (${errors.length} issue(s)):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`[verify-build] OK - ${files.length} HTML files: non-empty titles + bodies, per-language titles unique.`);
