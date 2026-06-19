/**
 * Helpers that turn the authored, structured Polish source content into the
 * Markdown body used by the Phase 3 content model. Keeping the source
 * structured (rather than hand-writing Markdown) avoids escaping mistakes and
 * keeps the seed readable; the Markdown is the storage/transport format.
 */

export interface Section {
  heading: string;
  body?: string[];
  bullets?: string[];
}

/** Render a lead paragraph + a list of sections to a Markdown string. */
export function sectionsToMarkdown(lead: string, sections: Section[]): string {
  const parts: string[] = [];
  if (lead) parts.push(lead.trim());
  for (const s of sections) {
    if (s.heading) parts.push(`## ${s.heading.trim()}`);
    for (const p of s.body ?? []) parts.push(p.trim());
    if (s.bullets?.length) parts.push(s.bullets.map((b) => `- ${b.trim()}`).join("\n"));
  }
  return parts.join("\n\n");
}
