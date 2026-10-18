import { leadSettings } from "@/lib/leads/settings";
import { signToken } from "@/lib/leads/tokens";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const settings = leadSettings();
  return Response.json(
    {
      enabled: settings.ready,
      token: settings.ready ? signToken("form", settings.secret) : null,
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
