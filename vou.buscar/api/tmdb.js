export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.searchParams.get("path");
  if (!path) return new Response("Missing path", { status: 400 });

  const params = new URLSearchParams(url.searchParams);
  params.delete("path");
  params.set("api_key", context.env.TMDB_API_KEY);

  const tmdbUrl = `https://api.themoviedb.org${path}?${params.toString()}`;
  const resp = await fetch(tmdbUrl);
  const data = await resp.text();

  return new Response(data, {
    status: resp.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
