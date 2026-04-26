/**
 * Parses markdown-style project descriptions from content.json
 * into structured objects for clean, professional rendering.
 */

export interface ParsedDescription {
  summary: string;
  highlights: { title: string; detail: string }[];
  impact: string[];
}

/**
 * Extract a clean summary from the first portion of the description,
 * stopping before any bullet points or highlight markers.
 */
function extractSummary(raw: string): string {
  // Split on newlines and take content before the first bullet/highlight
  const lines = raw.split(/\\n|\n/).map((l) => l.trim()).filter(Boolean);
  const summaryLines: string[] = [];

  for (const line of lines) {
    // Stop at the first bullet point or highlight marker
    if (line.startsWith("-") || line.startsWith("*") || line.startsWith("Here are")) break;
    summaryLines.push(line);
  }

  let summary = summaryLines.join(" ").trim();

  // Clean up any residual markdown
  summary = cleanMarkdown(summary);

  // Limit to ~2-3 sentences
  const sentences = summary.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 3) {
    summary = sentences.slice(0, 3).join("").trim();
  }

  return summary || cleanMarkdown(lines[0] || "");
}

/**
 * Extract bullet-point highlights (items starting with - or *)
 */
function extractHighlights(raw: string): { title: string; detail: string }[] {
  const lines = raw.split(/\\n|\n/).map((l) => l.trim()).filter(Boolean);
  const highlights: { title: string; detail: string }[] = [];

  for (const line of lines) {
    // Match lines starting with -, *, or numbered patterns
    const bulletMatch = line.match(/^[-*]+\s*(?:\*{2,3})?(.+)/);
    if (!bulletMatch) continue;

    let content = bulletMatch[1].trim();
    content = cleanMarkdown(content);

    // Try to split into title: detail using *** or ** or : separators
    const colonSplit = content.match(/^([^:]+?):\s*(.+)/);
    if (colonSplit) {
      highlights.push({
        title: colonSplit[1].trim(),
        detail: colonSplit[2].trim(),
      });
    } else {
      highlights.push({
        title: content,
        detail: "",
      });
    }
  }

  return highlights;
}

function extractImpact(raw: string): string[] {
  const cleaned = cleanMarkdown(raw);
  const impacts: string[] = [];

  // Split into sentences, handling newlines and punctuation
  const sentences = cleaned.match(/[^.!?\n]+[.!?]+/g) || [];

  const seen = new Set<string>();
  for (const sentence of sentences) {
    let trimmed = sentence.trim();
    
    // Clean up leading list characters like "- "
    trimmed = trimmed.replace(/^[-*]\s*/, "").trim();

    if (trimmed.length < 10 || seen.has(trimmed)) continue;
    
    // Check if it's an impact sentence
    if (
      /\d+\.?\d*x/i.test(trimmed) || 
      /\d+%/i.test(trimmed) || 
      /\breduced\b/i.test(trimmed) || 
      /\bimproved\b/i.test(trimmed) || 
      /\bachieved\b/i.test(trimmed) || 
      /under \d+/i.test(trimmed)
    ) {
      impacts.push(trimmed);
      seen.add(trimmed);
    }
  }

  return impacts.slice(0, 4);
}

/**
 * Remove markdown formatting characters
 */
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*{1,3}/g, "")      // Remove *, **, ***
    .replace(/#{1,6}\s?/g, "")     // Remove heading markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
    .replace(/`([^`]+)`/g, "$1")   // `code` → code
    .replace(/\s{2,}/g, " ")       // Collapse multiple spaces
    .trim();
}

/**
 * Main parser: takes a raw description string and returns structured data
 */
export function parseDescription(raw: string): ParsedDescription {
  if (!raw) {
    return { summary: "", highlights: [], impact: [] };
  }

  return {
    summary: extractSummary(raw),
    highlights: extractHighlights(raw),
    impact: extractImpact(raw),
  };
}
