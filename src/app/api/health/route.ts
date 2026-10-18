export const dynamic = "force-dynamic";
export function GET() {
  return Response.json(
    { status: "ok", service: "nursingpods-web" },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
