const INTERNAL_ORIGIN = "https://zedu.chat";

/**
 * Returns a safe, same-origin redirect path for a user-controlled value.
 *
 * Only root-relative paths are accepted. Protocol-relative URLs (`//evil.com`),
 * absolute URLs (`https://evil.com`), backslash tricks (`/\\evil.com`) and
 * control characters are rejected by resolving the value against the app's
 * origin and checking that it stays on that origin.
 */
export function safeRedirect(value: string | null | undefined): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  if (/[\u0000-\u001F\u007F]/.test(trimmed)) return null;

  try {
    const url = new URL(trimmed, INTERNAL_ORIGIN);
    if (url.origin !== INTERNAL_ORIGIN) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}
