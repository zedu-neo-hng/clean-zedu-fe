export function safeRedirect(
  value: string | null | undefined,
  fallback: string
): string {
  if (!value) return fallback;
  const isInternalPath =
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\");
  return isInternalPath ? value : fallback;
}
