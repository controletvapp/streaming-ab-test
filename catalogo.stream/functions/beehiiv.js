export async function onRequest(context) {
  // Preflight CORS
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let email;
  try {
    const body = await context.request.json();
    email = body.email;
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return new Response("Invalid email", { status: 400 });
  }

  const PUBLICATION_ID = "pub_11d7cb27-dd26-472a-beb2-419f3e7d147b";

  const resp = await fetch(
    `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: false,
        utm_source: "catalogo.stream",
        utm_medium: "onboarding",
      }),
    }
  );

  return new Response(JSON.stringify({ ok: resp.ok, status: resp.status }), {
    status: resp.ok ? 200 : resp.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
