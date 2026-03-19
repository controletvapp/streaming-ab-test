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

  const PUBLICATION_ID = "pub_b35d114e-c041-4832-8c44-78f22bbe71b8";

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
        utm_source: "voubuscar.com",
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
