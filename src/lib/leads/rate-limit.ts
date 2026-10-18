import { createHmac } from "node:crypto";
import { mkdir, open } from "node:fs/promises";
import path from "node:path";
// Atomic exclusive files support multiple Node workers on ONE shared persistent filesystem.
// Use a distributed implementation before scaling to separate hosts/serverless instances.
export async function takeRateSlot(
  directory: string,
  key: string,
  secret: string,
  limit: number,
  now = Date.now(),
): Promise<boolean> {
  const bucket = String(Math.floor(now / 3600000));
  const folder = path.join(directory, "rates", bucket);
  await mkdir(folder, { recursive: true, mode: 0o700 });
  const digest = createHmac("sha256", secret).update(key).digest("hex");
  for (let i = 0; i < limit; i++) {
    try {
      const f = await open(path.join(folder, `${digest}-${i}`), "wx", 0o600);
      await f.close();
      return true;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    }
  }
  return false;
}
export async function claimSubmission(directory: string, nonce: string) {
  const folder = path.join(
    directory,
    "submissions",
    String(Math.floor(Date.now() / 3600000)),
  );
  await mkdir(folder, { recursive: true, mode: 0o700 });
  const safe = nonce.replace(/[^a-zA-Z0-9-]/g, "");
  if (!safe || safe !== nonce) throw new Error("Invalid nonce");
  try {
    const f = await open(path.join(folder, safe), "wx", 0o600);
    await f.close();
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "EEXIST") return false;
    throw e;
  }
}
