import type { Lead } from "./validation";
export async function forwardToCrm(
  lead: Lead,
  requestId: string,
  env: Record<string, string | undefined> = process.env,
  transport: typeof fetch = fetch,
) {
  if (
    env.CRM_WEBHOOK_ENABLED !== "true" ||
    env.OUTBOUND_DELIVERY_AUTHORIZED !== "true"
  )
    return { status: "disabled" as const };
  const endpoint = env.CRM_WEBHOOK_URL || "",
    secret = env.CRM_WEBHOOK_SECRET || "";
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw Error("CRM configuration invalid");
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    secret.length < 32
  )
    throw Error("CRM configuration invalid");
  const response = await transport(url, {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(5000),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
      "Idempotency-Key": requestId,
    },
    body: JSON.stringify({ schemaVersion: 1, requestId, lead }),
  });
  if (!response.ok) throw Error("CRM rejected request");
  const result = await response.json();
  if (result.accepted !== true || typeof result.id !== "string" || !result.id)
    throw Error("CRM acknowledgement missing");
  return { status: "accepted" as const, id: result.id };
}
