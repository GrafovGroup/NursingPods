import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
export function signToken(
  purpose: "form" | "accepted",
  secret: string,
  now = Date.now(),
) {
  const payload = Buffer.from(
    JSON.stringify({ purpose, at: now, nonce: randomUUID() }),
  ).toString("base64url");
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
}
export function verifyToken(
  token: unknown,
  purpose: "form" | "accepted",
  secret: string,
  now = Date.now(),
): { nonce: string; at: number } | null {
  if (typeof token !== "string" || token.length > 512 || secret.length < 32)
    return null;
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length) return null;
  const expected = createHmac("sha256", secret).update(payload).digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  )
    return null;
  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString());
    const age = now - value.at;
    if (
      value.purpose !== purpose ||
      typeof value.nonce !== "string" ||
      age < 0 ||
      age > (purpose === "form" ? 3600000 : 600000) ||
      (purpose === "form" && age < 2000)
    )
      return null;
    return { nonce: value.nonce, at: value.at };
  } catch {
    return null;
  }
}
