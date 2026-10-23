import assert from "node:assert/strict";
import { test } from "node:test";

import { safeRedirect } from "./safe-redirect.ts";

const fallback = "/my-org";

test("keeps internal paths", () => {
  assert.equal(safeRedirect("/my-org/channels", fallback), "/my-org/channels");
  assert.equal(
    safeRedirect("/settings?tab=account", fallback),
    "/settings?tab=account"
  );
});

test("falls back for missing values", () => {
  assert.equal(safeRedirect(null, fallback), fallback);
  assert.equal(safeRedirect(undefined, fallback), fallback);
  assert.equal(safeRedirect("", fallback), fallback);
});

test("rejects absolute and script URLs", () => {
  assert.equal(safeRedirect("https://example.org", fallback), fallback);
  assert.equal(safeRedirect("http://example.org", fallback), fallback);
  assert.equal(safeRedirect("javascript:alert(1)", fallback), fallback);
});

test("rejects protocol-relative and backslash paths", () => {
  assert.equal(safeRedirect("//evil.example", fallback), fallback);
  assert.equal(safeRedirect("/\\evil.example", fallback), fallback);
});
