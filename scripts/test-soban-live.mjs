import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Run the same TypeScript modules as Next, with the project's alias and no network.
const project = new URL("../", import.meta.url);
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith("@/")) return next(new URL(specifier.slice(2) + ".ts", project).href, context);
    if (/^\.{1,2}\//.test(specifier) && !/\.[cm]?[jt]sx?$/.test(specifier) && context.parentURL?.startsWith(project.href) && !context.parentURL.includes("node_modules")) {
      return next(specifier + ".ts", context);
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.startsWith(project.href) && url.endsWith(".ts") && !url.includes("node_modules")) {
      const source = readFileSync(fileURLToPath(url), "utf8");
      const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
      return { format: "module", source: output.outputText, shortCircuit: true };
    }
    return next(url, context);
  },
});

process.env.RESERVATION_ADMIN_TOKEN = "fixture-reservation-admin-key";
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://fixture.invalid";
process.env.SUPABASE_SECRET_KEY = "fixture-supabase-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "fixture-supabase-key";
process.env.RESEND_API_KEY = "re_fixture";
process.env.RESEND_BASE_URL = "https://mail.invalid";
process.env.NEXT_PUBLIC_SITE_URL = "https://example.invalid";
const sent = [];
const rows = new Map();
let failRead = false;
globalThis.fetch = async (input, options) => {
  const request = new Request(input, options);
  const url = new URL(request.url);
  if (url.origin === "https://mail.invalid" && url.pathname === "/emails") {
    const mail = await request.json();
    assert.ok(JSON.stringify(mail.to).includes("@example.invalid"));
    sent.push(mail);
    return Response.json({ id: randomUUID() });
  }
  assert.equal(url.origin, "https://fixture.invalid", "External requests are not permitted in this test");
  assert.equal(url.pathname, "/rest/v1/inquiries");
  if (failRead && request.method === "GET") return Response.json({ code: "08006" }, { status: 400 });
  if (request.method === "POST") {
    const row = await request.json();
    if (rows.has(row.id)) return Response.json({ code: "23505" }, { status: 409 });
    assert.ok(row.name.length > 0 && row.name.length <= 50);
    assert.ok(row.phone.length >= 8 && row.phone.length <= 30);
    assert.ok(!row.message || row.message.length <= 2000, "inquiries.message exceeds the production limit");
    rows.set(row.id, row);
    return new Response(null, { status: 201 });
  }
  let selected = [...rows.values()];
  for (const [field, raw] of url.searchParams) {
    if (["select", "order", "limit"].includes(field)) continue;
    const dot = raw.indexOf(".");
    const operator = raw.slice(0, dot), value = raw.slice(dot + 1);
    assert.ok(["eq", "gt", "lt", "in", "like"].includes(operator), "Unsupported test filter " + operator);
    const allowed = operator === "in" ? value.slice(1, -1).split(",").map((s) => s.replaceAll('"', "")) : [];
    selected = selected.filter((row) => operator === "eq" ? row[field] === value : operator === "gt" ? row[field] > value : operator === "lt" ? row[field] < value : operator === "like" ? row[field].startsWith(value.replace(/[%*]$/, "")) : allowed.includes(row[field]));
  }
  if (url.searchParams.get("order") === "id.asc") selected.sort((a, b) => a.id.localeCompare(b.id));
  if (url.searchParams.has("limit")) selected = selected.slice(0, Number(url.searchParams.get("limit")));
  if (request.method === "PATCH") {
    const values = await request.json();
    assert.ok(values.message.length <= 2000);
    selected.forEach((row) => Object.assign(row, values));
  } else if (request.method === "DELETE") {
    selected.forEach((row) => rows.delete(row.id));
  } else {
    assert.equal(request.method, "GET");
  }
  if (!url.searchParams.has("select")) return new Response(null, { status: 204 });
  if (url.searchParams.get("select") === "id") selected = selected.map(({ id }) => ({ id }));
  if (request.headers.get("accept")?.includes("vnd.pgrst.object")) {
    if (!selected.length) return Response.json({ code: "PGRST116", details: "The result contains 0 rows" }, { status: 406 });
    assert.equal(selected.length, 1);
    return Response.json(selected[0]);
  }
  return Response.json(selected);
};

const { runSoban, demandSummary } = await import("../lib/soban-live.ts");
const { createSobanStore } = await import("../lib/soban-store.ts");
const { createEmailProof, readProofId, verifyEmailProof } = await import("../lib/soban-verification.ts");
const now = Date.now();
const nextWeek = new Date(now + 7 * 86400000).toISOString().slice(0, 10);
const store = createSobanStore();
const run = (payload) => runSoban(store, payload, now, "fixture-" + String(payload.key || "proof").slice(0, 12));
const newKey = () => randomBytes(32).toString("hex");
let person = 0;
function form(kind, extra = {}) {
  person++;
  return { action: "register", key: newKey(), kind, product: "class", region: "서울", date: nextWeek, slot: "afternoon", language: "ko",
    amount: kind === "request" ? 50000 : 35000, people: kind === "request" ? 2 : 6, paidIntent: true, consent: true,
    email: "participant-" + person + "@example.invalid", matching: true, source: "direct", ...extra };
}
const inbox = (profile) => run({ action: "status", key: profile.key });
async function register(profile) {
  const before = new Set(rows.keys());
  await run(profile);
  return [...rows.values()].find((r) => !before.has(r.id) && r.name === "soban:" + profile.kind)?.id;
}
async function expectFailure(work, label) {
  const err = await work.then(() => null, (e) => e);
  assert.ok(err instanceof Error, label);
}
function noContact(value, ...profiles) {
  const serialized = JSON.stringify(value);
  for (const profile of profiles) assert.ok(!serialized.includes(profile.email), "A private email leaked in an unconsented response.");
}
function response(kind, profile, matchId, shareEmail) {
  return run({ action: kind, key: profile.key, matchId, shareEmail });
}

// Known positive controls for certificate integrity, wrong address and modified envelope.
const proofId = randomUUID();
const proof = createEmailProof(proofId, "proof@example.invalid");
assert.equal(readProofId(proof), proofId);
assert.equal(verifyEmailProof(proof, " PROOF@example.invalid "), proofId);
assert.equal(verifyEmailProof(proof, "other@example.invalid"), null);
assert.equal(readProofId(proof.slice(0, -4) + "XXXX"), null);
assert.equal((await demandSummary(store, now)).reviewReady, false);
failRead = true;
await expectFailure(demandSummary(store, now), "Storage failure must not appear as a zero-demand reading.");
failRead = false;

const request = form("request");
await expectFailure(run({ ...request, consent: false }), "Contact-data processing requires affirmative consent.");
await register(request);
assert.equal((await inbox(request)).matches.length, 0);
await expectFailure(inbox({ key: newKey() }), "An unrelated tracking key must not open a record.");
const offer = form("offer");
await register(offer);
assert.equal((await inbox(request)).matches.length, 0, "Unverified contact addresses must not enter matching.");
await expectFailure(response("accept", request, "unknown", true), "An unverified address must not be able to accept.");

// Use the actual verification-link transport, intercepted in memory for example.invalid only.
async function verify(profile) {
  const count = sent.length;
  await run({ action: "sendVerification", key: profile.key });
  assert.equal(sent.length, count + 1, "Expected exactly one fixture email.");
  const email = sent.at(-1);
  assert.ok(JSON.stringify(email.to).includes(profile.email));
  const tokenMatch = email.text.match(/#verify=([^\s]+)/);
  assert.ok(tokenMatch, "Verification email must include a working link.");
  const token = decodeURIComponent(tokenMatch[1]);
  assert.ok(verifyEmailProof(token, profile.email));
  await run({ action: "verify", token });
  assert.equal((await inbox(profile)).record.verified, true);
}
await verify(request);
assert.equal((await inbox(request)).matches.length, 0, "Both sides must have verified addresses.");
await verify(offer);
const customer = await inbox(request);
let provider = await inbox(offer);
assert.equal(customer.matches.length, 1, "A later verified offer must match an existing verified request.");
assert.equal(provider.matches[0].id, customer.matches[0].id);
const matchId = customer.matches[0].id;
noContact(customer, offer, request);
noContact(provider, offer, request);
await expectFailure(response("accept", request, matchId, false), "Consent must be independent on each introduction.");
await response("accept", request, matchId, true);
noContact((await inbox(offer)).matches, request);
await response("accept", offer, matchId, true);
assert.equal((await inbox(request)).matches[0].contact, offer.email);
assert.equal((await inbox(offer)).matches[0].contact, request.email);
const secondOffer = form("offer", { amount: 37000 });
async function registerConfirmed(profile) {
  const id = await register(profile);
  assert.ok(id);
  await run({ action: "verify", token: createEmailProof(id, profile.email) });
}
await registerConfirmed(secondOffer);
await registerConfirmed(form("offer", { amount: 39000 }));
assert.equal((await inbox(request)).matches.length, 2, "At most two partners may receive one request.");
assert.equal((await inbox(secondOffer)).matches.length, 1);
const beforeRetry = rows.size;
await run(request);
assert.equal(rows.size, beforeRetry, "A retried registration must not duplicate storage.");
await run({ action: "withdraw", key: request.key });
assert.ok(!(await inbox(offer)).matches.some((x) => x.contact), "Withdrawal must revoke contact visibility.");
assert.ok(!(await inbox(secondOffer)).matches.some((x) => x.contact));

const earlierOffer = form("offer", { region: "부산" });
await registerConfirmed(earlierOffer);
for (const negative of [
  { language: "en" }, { slot: "evening" }, { people: 8 }, { amount: 10000 }, { paidIntent: false }, { matching: false },
  { product: "local_trip" }, { date: new Date(now + 8 * 86400000).toISOString().slice(0, 10) },
]) {
  const candidate = form("request", { region: "부산", ...negative });
  await registerConfirmed(candidate);
  assert.equal((await inbox(candidate)).matches.length, 0, "Mismatch: " + JSON.stringify(negative));
}
const laterRequest = form("request", { region: "부산" });
await registerConfirmed(laterRequest);
provider = await inbox(earlierOffer);
assert.equal(provider.matches.length, 1, "An earlier offer must match a later customer.");
const outsider = form("request", { region: "제주" });
await registerConfirmed(outsider);
await expectFailure(response("decline", outsider, provider.matches[0].id, false), "Only an introduction participant may respond.");
await response("decline", laterRequest, provider.matches[0].id, false);
assert.ok(!(await inbox(earlierOffer)).matches.some((x) => x.contact));
assert.equal((await demandSummary(store, now)).reviewReady, false, "Incompatible registrations must not pass the review threshold.");
const cohortOpts = { region: "대전", amount: 49000, matching: false };
const alreadyCounted = form("request", cohortOpts);
await registerConfirmed(alreadyCounted);
await registerConfirmed(form("request", { ...cohortOpts, email: alreadyCounted.email }));
for (let i = 0; i < 4; i++) await registerConfirmed(form("request", cohortOpts));
assert.equal((await demandSummary(store, now)).reviewReady, false, "Two registrations from one verified address count once.");
const sixth = form("request", cohortOpts);
await registerConfirmed(sixth);
assert.deepEqual(await demandSummary(store, now), { reviewReady: true });
await run({ action: "withdraw", key: sixth.key });
await expectFailure(run(sixth), "A stale retry must not revive a withdrawn registration.");
assert.deepEqual(await demandSummary(store, now), { reviewReady: false });
const duplicate = form("offer", { ...earlierOffer, key: newKey() });
const duplicateId = await register(duplicate);
await expectFailure(run({ action: "verify", token: createEmailProof(duplicateId, duplicate.email) }), "A second management link for the same matching identity must not take over its existing inbox.");
const pastId = randomUUID();
rows.set(pastId, { id: pastId, name: "soban:request", phone: "example-user", preferred_date: null, guests: null,
  message: "SB1." + "A".repeat(43) + ".{}", created_at: new Date(now - 180 * 86400000).toISOString() });
await store.cleanup(new Date(now - 90 * 86400000).toISOString());
assert.ok(rows.has(pastId), "Intake cleanup must preserve unrelated historical inquiries.");
assert.equal(await store.get(pastId), null, "A similarly named historical inquiry must not masquerade as a registration.");

const api = await import("../app/api/stay-soban/route.ts");
const ops = await import("../app/api/stay-soban/operations/route.ts");
const base = "https://example.invalid/api/stay-soban";
const post = (payload, origin = "https://example.invalid") => api.POST(new Request(base, {
  method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(payload),
}));
assert.equal((await post({ action: "status", key: outsider.key }, "https://another.invalid")).status, 403);
assert.equal((await post({ action: "status", key: newKey() })).status, 404);
assert.equal((await post({ action: "status", key: outsider.key })).status, 200);
const publicOnly = await api.GET();
assert.equal(publicOnly.status, 200);
assert.match(publicOnly.headers.get("Cache-Control"), /no-store/);
assert.deepEqual(await publicOnly.json(), { reviewReady: false });
assert.equal((await ops.POST(new Request(base + "/operations", { method: "POST" }))).status, 401);
const operator = await ops.POST(new Request(base + "/operations", { method: "POST", headers: { Authorization: "Bearer fixture-reservation-admin-key" } }));
assert.equal(operator.status, 200);
const metrics = await operator.json();
assert.ok(metrics.applicants > 0);
assert.ok(!JSON.stringify(metrics).includes("@example.invalid"));
failRead = true;
const unavailable = await api.GET();
assert.equal(unavailable.status, 503);
assert.ok(!("reviewReady" in await unavailable.json()), "An unavailable database must not report a negative threshold result.");
console.log("Passed offline Stay Soban routes, Supabase storage, matching, verified contact, withdrawal and demand checks.");
