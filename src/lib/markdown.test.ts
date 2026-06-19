import { describe, it, expect } from "vitest";
import { renderMarkdown, resolveGuideShortcodes, type GuideLinkResolver } from "./markdown";

const resolve: GuideLinkResolver = (slug, label) =>
  slug === "known" ? { href: "/pl/guides/known", label: label || "Known guide" } : null;

describe("resolveGuideShortcodes", () => {
  it("expands [guide:slug] using the resolved label", () => {
    expect(resolveGuideShortcodes("See [guide:known].", resolve)).toBe(
      "See [Known guide](/pl/guides/known).",
    );
  });

  it("honours a custom label", () => {
    expect(resolveGuideShortcodes("[guide:known|Custom]", resolve)).toBe("[Custom](/pl/guides/known)");
  });

  it("degrades unknown slugs to plain text", () => {
    expect(resolveGuideShortcodes("[guide:missing]", resolve)).toBe("missing");
    expect(resolveGuideShortcodes("[guide:missing|Label]", resolve)).toBe("Label");
  });
});

describe("renderMarkdown", () => {
  it("renders headings and lists to HTML", () => {
    const html = renderMarkdown("## Title\n\n- a\n- b");
    expect(html).toContain("<h2>Title</h2>");
    expect(html).toContain("<li>a</li>");
  });

  it("sanitizes disallowed HTML", () => {
    const html = renderMarkdown("Hello <script>alert(1)</script> world");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
  });

  it("expands guide shortcodes into links when a resolver is given", () => {
    const html = renderMarkdown("See [guide:known].", { resolveGuide: resolve });
    expect(html).toContain('href="/pl/guides/known"');
    expect(html).toContain(">Known guide</a>");
  });
});
