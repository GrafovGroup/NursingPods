import type { Lead } from "./validation";
import type { LeadSettings } from "./settings";
export type Accepted = { accepted: true; providerId: string };
export function notification(lead: Lead) {
  const fr = lead.locale === "fr";
  const labels = fr
    ? [
        "Nom",
        "Organisation",
        "Courriel",
        "Téléphone",
        "Ville",
        "Province ou territoire",
        "Intérêt",
        "Détails",
        "Échéancier",
      ]
    : [
        "Name",
        "Organization",
        "Email",
        "Phone",
        "City",
        "Province or territory",
        "Interest",
        "Details",
        "Timeline",
      ];
  const keys = [
    "name",
    "organization",
    "email",
    "phone",
    "city",
    "province",
    "interest",
    "details",
    "timeline",
  ] as const;
  return {
    subject: fr
      ? "Nouvelle demande de projet — NursingPods.ca"
      : "New project inquiry — NursingPods.ca",
    text:
      keys.map((k, i) => `${labels[i]}: ${lead[k]}`).join("\n\n") +
      `\n\nConsent: ${lead.consentVersion}\nLocale: ${lead.locale}`,
  };
}
export async function sendLead(
  lead: Lead,
  requestId: string,
  settings: LeadSettings,
  transport: typeof fetch = fetch,
): Promise<Accepted> {
  if (!settings.ready) throw new Error("Delivery disabled");
  const mail = notification(lead);
  const resend = settings.provider === "resend";
  const url = resend ? "https://api.resend.com/emails" : settings.webhookUrl;
  const response = await transport(url, {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(10000),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resend ? settings.apiKey : settings.webhookSecret}`,
      "Idempotency-Key": `nursingpods-${requestId}`,
    },
    body: JSON.stringify(
      resend
        ? {
            from: settings.from,
            to: [settings.to],
            reply_to: lead.email,
            ...mail,
          }
        : {
            schemaVersion: 1,
            requestId,
            from: settings.from,
            to: settings.to,
            replyTo: lead.email,
            ...mail,
            lead,
          },
    ),
  });
  if (!response.ok) throw new Error("Provider rejected request");
  const data = await response.json();
  const providerId = resend ? data.id : data.accepted === true ? data.id : null;
  if (typeof providerId !== "string" || !providerId || providerId.length > 200)
    throw new Error("Acceptance was not confirmed");
  return { accepted: true, providerId };
}
