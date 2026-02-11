export const config = { runtime: "edge" };

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
  const url = "https://edge61.stream.maxfive.com/max5-city23?aggregator=C23-homepage";
  const res = await fetch(url, { headers: { "Icy-MetaData": "1" } });

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
