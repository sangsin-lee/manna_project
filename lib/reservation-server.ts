import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";
import { decodeBooking } from "@/lib/reservation-policy";
export const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function adminToken(id: string) {
  const secret =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Reservation storage unavailable");
  return createHmac("sha256", secret)
    .update(`manna-reservation-admin-v1:${id}`)
    .digest("hex");
}
export const validId = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
export async function readBooking(id: string) {
  if (!validId(id)) return null;
  const db = createSupabaseAdmin();
  const { data, error } = await db
    .from("inquiries")
    .select("id,name,phone,preferred_date,guests,message,created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Reservation read failed");
  const meta = decodeBooking(data?.message);
  return data && meta ? { db, row: data, meta } : null;
}
export function safeOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const source = new URL(origin);
    return (
      ["https:", "http:"].includes(source.protocol) &&
      source.host === (request.headers.get("host") || new URL(request.url).host)
    );
  } catch {
    return false;
  }
}
export const noStore = {
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
};
export const escape = (text: unknown) =>
  String(text ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
