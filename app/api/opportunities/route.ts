import { unstable_cache } from "next/cache";
import { discover, sourceName, sourceUrl, stillOpen, verifiedFallback, type Discovery } from "../../../lib/opportunities";

export const dynamic = "force-dynamic";

const hour = 3_600_000;
const freshFor = 6 * hour;
const keepFor = 24 * hour;
const unavailable: Discovery = { status: "unavailable", sourceName, sourceUrl, checkedAt: null, opportunities: [] };
const cachedDiscovery = unstable_cache(discover, ["stay-soban-touraz-public-calls-v1"], { revalidate: freshFor / 1000 });
let retryAfter = 0;
let lastRead: Discovery | null = null;

function onFailure(now: number) {
  if (lastRead?.checkedAt) {
    return now - Date.parse(lastRead.checkedAt) < keepFor
      ? stillOpen({ ...lastRead, status: "stale" }, now) : unavailable;
  }
  return verifiedFallback(now);
}

export async function GET() {
  if (retryAfter > Date.now()) return Response.json(onFailure(Date.now()), { headers: { "Cache-Control": "no-store" } });
  try {
    const snapshot = await cachedDiscovery();
    lastRead = snapshot;
    const now = Date.now();
    const age = snapshot.checkedAt ? now - Date.parse(snapshot.checkedAt) : Infinity;
    // Next can serve the last successful snapshot during revalidation; closing clocks still apply.
    const result = age >= keepFor ? unavailable : stillOpen({ ...snapshot, status: age >= freshFor ? "stale" : "ready" }, now);
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch {
    retryAfter = Date.now() + 5 * 60_000;
    return Response.json(onFailure(Date.now()), { headers: { "Cache-Control": "no-store" } });
  }
}
