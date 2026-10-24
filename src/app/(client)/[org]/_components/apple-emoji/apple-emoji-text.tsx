"use client";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

import { replaceEmojiWithImages } from "~/lib/apple-emoji";

export function AppleEmojiText({ text }: { text?: string | null }) {
  const value = text || "";
  const html = replaceEmojiWithImages(value);

  if (html === value) return <>{value}</>;

  // Only allow safe <img> tags produced by the emoji replacer; escape everything else.
  const sanitized = html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    const safeAttrMatch = attrs.match(
      /\s(src|alt|class|draggable)="([^"]*)"/gi
    );
    if (!safeAttrMatch) return escapeHtml(match);
    const safeAttrs = safeAttrMatch
      .map((a: string) => {
        const m = a.match(/\s(\w[\w-]*)="([^"]*)"/);
        if (!m) return "";
        const name = m[1].toLowerCase();
        const val = m[2];
        if (name === "src" && !/^https?:\/\//i.test(val)) return "";
        if (name === "alt" || name === "class" || name === "draggable") {
          if (name === "draggable") return ` draggable="${val}"`;
          return ` ${name}="${escapeHtml(val)}"`;
        }
        return "";
      })
      .join("");
    return `<img${safeAttrs}>`;
  });

  return <span dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
