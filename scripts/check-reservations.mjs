import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { createHmac, randomBytes, randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
// Isolated storage/mail fixtures. No production data or external email is used.
const rows = new Map();
let mail = 0;
const fixture = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://127.0.0.1:4176");
  let body = "";
  for await (const chunk of req) body += chunk;
  res.setHeader("Content-Type", "application/json");
  if (u.pathname === "/emails") {
    mail++;
    res.end(JSON.stringify({ id: randomUUID() }));
    return;
  }
  if (u.pathname !== "/rest/v1/inquiries") {
    res.statusCode = 404;
    res.end("{}");
    return;
  }
  const id = (u.searchParams.get("id") || "").replace(/^eq\./, ""),
    old = rows.get(id);
  if (req.method === "HEAD") {
    res.setHeader("Content-Range", "*/0");
    res.end();
    return;
  }
  if (req.method === "GET") {
    res.end(JSON.stringify(old || null));
    return;
  }
  if (req.method === "POST") {
    const row = JSON.parse(body);
    if (rows.has(row.id)) {
      res.statusCode = 409;
      res.end(JSON.stringify({ code: "23505" }));
      return;
    }
    rows.set(row.id, { ...row, created_at: new Date().toISOString() });
    res.statusCode = 201;
    res.end("");
    return;
  }
  if (req.method === "PATCH") {
    const match = (u.searchParams.get("message") || "").replace(/^eq\./, "");
    if (!old || old.message !== match) {
      res.end("null");
      return;
    }
    Object.assign(old, JSON.parse(body));
    res.end(JSON.stringify({ id }));
    return;
  }
  res.statusCode = 405;
  res.end("{}");
});
await new Promise((r) => fixture.listen(4176, "127.0.0.1", r));
const secret = "reservation-test-secret-not-production";
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "4175",
  ],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:4176",
      SUPABASE_SERVICE_ROLE_KEY: secret,
      RESEND_API_KEY: "re_test_fixture",
      ADMIN_EMAIL: "operator@example.invalid",
      RESEND_BASE_URL: "http://127.0.0.1:4176",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let logs = "";
child.stdout.on("data", (x) => (logs += x));
child.stderr.on("data", (x) => (logs += x));
const base = "http://127.0.0.1:4175";
try {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(base + "/classes");
      if (r.ok) break;
    } catch {}
    if (i === 49) throw Error(logs);
    await delay(250);
  }
  const policy = await import("../lib/reservation-policy.ts");
  assert.match(policy.dateError("2028-02-30", "2027-01-01"), /올바른/);
  assert.match(policy.dateError("2026-11-08", "2026-11-03"), /일요일/);
  assert.match(policy.dateError("2026-11-03", "2026-11-03"), /내일/);
  assert.equal(
    policy.seoulDate(new Date("2026-11-03T16:00:00Z")),
    "2026-11-04",
  );
  let date = new Date(Date.now() + 7 * 86400000);
  while (date.getUTCDay() === 0) date = new Date(+date + 86400000);
  const id = randomUUID(),
    token = randomBytes(32).toString("hex"),
    payload = {
      requestId: id,
      trackingToken: token,
      name: "기능검증",
      phone: "000-0000-0000",
      preferredDate: date.toISOString().slice(0, 10),
      guests: 3,
      theme: "독일 식문화",
      time: "오후",
      message: "자동 검증용 가상 신청",
      privacyAgreed: true,
    };
  const post = (p) =>
    fetch(base + "/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: base },
      body: JSON.stringify(p),
    });
  assert.equal(
    (await post({ ...payload, preferredDate: "2028-02-30" })).status,
    400,
  );
  const created = await post(payload);
  assert.equal(created.status, 201, await created.clone().text());
  assert.equal((await created.json()).notified, true);
  assert.equal(rows.size, 1);
  assert.equal(mail, 1);
  assert.equal((await post(payload)).status, 200);
  assert.equal(rows.size, 1);
  assert.equal(mail, 1);
  assert.equal(
    (await post({ ...payload, trackingToken: randomBytes(32).toString("hex") }))
      .status,
    409,
  );
  const lookup = () =>
    fetch(base + "/api/reservations?id=" + id, {
      headers: { Authorization: "Bearer " + token },
    });
  assert.equal((await fetch(base + "/api/reservations?id=" + id)).status, 404);
  let state = await (await lookup()).json();
  assert.equal(state.status, "pending");
  assert.equal("phone" in state, false);
  const admin = createHmac("sha256", secret)
    .update("manna-reservation-admin-v1:" + id)
    .digest("hex");
  assert.equal(
    (await fetch(base + "/api/reservations/manage?id=" + id + "&token=invalid"))
      .status,
    404,
  );
  const page = await fetch(
    base + "/api/reservations/manage?id=" + id + "&token=" + admin,
  );
  assert.equal(page.status, 200);
  const form = {
    id,
    token: admin,
    action: "confirmed",
    location: "검증용 키친",
    finalTime: "14:00–17:00",
    price: "총 0원 · 기능검증",
    reply: "독일 가정식 · 3명",
    agreed: "on",
  };
  const manage = (f) =>
    fetch(base + "/api/reservations/manage", {
      method: "POST",
      headers: { Origin: base },
      body: new URLSearchParams(f),
    });
  assert.equal((await manage({ ...form, location: "" })).status, 400);
  assert.equal((await manage(form)).status, 200);
  state = await (await lookup()).json();
  assert.equal(state.status, "confirmed");
  assert.equal(state.location, "검증용 키친");
  assert.equal((await manage(form)).status, 409);
  assert.equal(
    (
      await fetch(base + "/api/reservations?id=" + id, {
        method: "PATCH",
        headers: { Origin: base, Authorization: "Bearer " + token },
      })
    ).status,
    200,
  );
  state = await (await lookup()).json();
  assert.equal(state.status, "cancelled");
  assert.equal(mail, 2);
  assert.equal(
    (await post({ ...payload, requestId: randomUUID(), privacyAgreed: false }))
      .status,
    400,
  );
  assert.equal(
    (
      await fetch(base + "/api/reservations", {
        method: "POST",
        headers: { Origin: "https://other.invalid" },
        body: "{}",
      })
    ).status,
    403,
  );
  console.log(
    "PASS: date/Seoul-time rules, storage, duplicate prevention, protected status, admin confirmation, required agreement, cancellation and mail flow",
  );
} finally {
  child.kill();
  await new Promise((r) => fixture.close(r));
}
