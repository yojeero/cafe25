export const config = {
  runtime: "edge",
};

const EDGES = [61, 21, 5, 7];
const STREAM_PATH = "max5-city23?aggregator=C23-homepage";
const BASE = "https://edge";

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Icy-MetaData": "1",
        "Referer": "https://www.city23.at/",
        "Origin": "https://www.city23.at",
      },
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export default async function handler() {
  let response = null;

  for (const edge of EDGES) {
    const url = `${BASE}${edge}.stream.maxfive.com/${STREAM_PATH}`;

    try {
      const res = await fetchWithTimeout(url);
      if (res.ok && res.body) {
        response = res;
        break;
      }
    } catch (_) {}
  }

  if (!response) {
    return new Response("Stream unavailable", { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", response.headers.get("Content-Type") || "audio/mpeg");
  headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  headers.set("Pragma", "no-cache");
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, { status: 200, headers });
}
