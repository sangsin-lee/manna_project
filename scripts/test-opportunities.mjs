import assert from "node:assert/strict";
import { test } from "node:test";
import { enrichCandidate, parseListings, stillOpen, verifiedFallback } from "../lib/opportunities.ts";

// Small structural fixtures reproduce TourAZ's visible labels and abbreviated Seoul dates.
const title = "2027 VISITKOREA 얼라이언스 회원사 모집";
const href = "/announcementList/pssrpView?curPage=1&amp;pssrpSeqEnc=i3cP%5E0MiEThFPKnoPKxg%5Eg%3D%3D";
const date = "2026-11-19T02:00:00Z";
const now = Date.parse(date);
function card(state, titleText = title, link = href) {
  return `<li><span>${state}</span> <span>한국관광공사</span>
    <h3><a class="title" href="${link}">${titleText}</a></h3>
    <dl><dt>신청기간</dt><dd>2026-11-18 ~ 2026-12-09</dd></dl>
    <a href="${link}">더보기</a></li>`;
}
const detail = `<h3>${title}</h3><dl><dt>신청기간</dt>
  <dd>2026-11-18(수) 18시부터 ~ 12-09(수) 17시까지</dd></dl>
  <p>지원분야 관광지/체험, 식음료</p>문의처<br>신청하기`;

test("open calls use a canonical source URL and the precise KST cutoff", () => {
  const list = card("접수") + card("종료", "지역관광 프로그램 모집", href + "1") + card("접수");
  const items = parseListings(list, now);
  assert.equal(items.length, 1);
  const offer = enrichCandidate(items[0], detail, now);
  assert.equal(offer.deadlineAt, "2026-12-09T08:00:00.000Z");
  assert.equal(offer.kind, "collaboration");
  assert.equal(offer.organization, "한국관광공사");
  assert.match(offer.pitch, /VISITKOREA/);
  assert.equal(enrichCandidate(items[0], detail, Date.parse("2026-11-18T08:59:00Z")), null);
  assert.equal(enrichCandidate(items[0], detail, Date.parse(offer.deadlineAt)), null);
  assert.deepEqual(stillOpen({ opportunities: [offer] }, Date.parse(offer.deadlineAt)).opportunities, []);
});
test("bad source, changed markup, and malformed dates are distinct from confirmed empty", () => {
  assert.deepEqual(parseListings(card("종료"), now), []);
  assert.deepEqual(parseListings(card("접수", "근로자 휴가지원사업 참여기업 모집"), now), []);
  assert.deepEqual(parseListings(card("접수"), Date.parse("2026-12-10T00:00:00Z")), []);
  assert.throws(() => parseListings(card("알 수 없음"), now));
  assert.throws(() => parseListings(card("접수", title, "https://example.com/x"), now));
  assert.throws(() => parseListings(card("접수").replace("2026-12-09", "2026-02-31"), now));
  assert.throws(() => parseListings("<html>접속 점검</html>", now));
});
test("no attributed deadline time is invented; same-day uncertain closing times are excluded", () => {
  const entry = parseListings(card("접수"), now)[0];
  const noClock = detail.replace(" 17시까지", "");
  assert.equal(enrichCandidate(entry, noClock, now).deadlineAt, null);
  assert.equal(enrichCandidate(entry, noClock, Date.parse("2026-12-08T15:00:00Z")), null);
  assert.throws(() => enrichCandidate(entry, detail.replace("12-09(", "12-12("), now));
});
test("the manually verified source is always identified as prior information and expires after exactly 72 hours", () => {
  const checked = Date.parse("2026-11-19T04:54:54+09:00");
  const result = verifiedFallback(checked + 1);
  assert.equal(result.status, "stale");
  assert.equal(Date.parse(result.checkedAt), checked);
  assert.equal(result.opportunities[0].deadlineAt, "2026-12-09T08:00:00.000Z");
  assert.match(result.opportunities[0].matchReason, /외국인/);
  assert.equal(verifiedFallback(checked - 1).status, "unavailable");
  assert.equal(verifiedFallback(checked + 72 * 3_600_000 - 1).opportunities.length, 1);
  assert.deepEqual(verifiedFallback(checked + 72 * 3_600_000).opportunities, []);
  assert.deepEqual(verifiedFallback(Date.parse(result.opportunities[0].deadlineAt)).opportunities, []);
});
