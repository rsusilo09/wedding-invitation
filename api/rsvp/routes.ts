export async function POST(req: Request) {
  const body = await req.json();

  console.log("RSVP Data:", body);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}