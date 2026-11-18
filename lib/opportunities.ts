export const sourceUrl = "https://touraz.kr/announcementList";
export const sourceName = "한국관광공사 투어라즈";

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  url: string;
  startDate: string;
  endDate: string;
  deadlineAt: string | null;
  kind: "collaboration" | "support";
  matchReason: string;
  pitch: string;
  nextStep: string;
};
export type Discovery = {
  status: "ready" | "stale" | "unavailable";
  checkedAt: string | null;
  sourceUrl: string;
  sourceName: string;
  opportunities: Opportunity[];
};
type Candidate = Pick<Opportunity, "id" | "title" | "organization" | "url" | "startDate" | "endDate">;

const dateRange = /(\d{4}-\d{2}-\d{2})\s*[~～]\s*(\d{4}-\d{2}-\d{2})/;
const ignoreTitle = /휴가지원|채용|인턴|수상작|선정결과|선정 결과|지자체 모집|참여 지자체|박람회|주민사업체 선정 결과/;
const potentialTitle = /얼라이언스|체험|미식|음식|관광두레|로컬|지역관광|관광상품|여행상품|숙박|게스트하우스|식문화|식음료|시장투어|워케이션/;
const invitation = /모집|공모|공고|제안|신청|협력사|참여사/;
const themes = [
  { pattern: /미식|식음료|F\s*&\s*B|음식|식문화|전통시장|로컬푸드|한식/, label: "음식·식문화", idea: "지역 식재료로 차리는 한 끼와 시장 방문을 엮은 체험" },
  { pattern: /숙박|게스트하우스|체류형|워케이션/, label: "숙박·체류", idea: "숙소 인근 호스트와 여행자가 함께하는 저녁 식탁" },
  { pattern: /관광두레|지역관광|로컬|관광지\s*\/\s*체험|관광체험|체험관광|생활관광/, label: "지역 체험", idea: "지역 공간과 요리 호스트가 함께 운영하는 소규모 식문화 프로그램" },
];

function plain(html: string) {
  return html.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/g, "&")
    .replace(/&quot;|&#34;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();
}

function validDate(day: string) {
  const date = new Date(day + "T00:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === day;
}
function seoulDay(now: number) { return new Date(now + 9 * 3_600_000).toISOString().slice(0, 10); }

function detailUrl(href: string) {
  const url = URL.parse(href.replace(/&amp;/g, "&"), sourceUrl);
  if (!url || url.origin !== "https://touraz.kr" || url.pathname !== "/announcementList/pssrpView" || url.username || url.password) return null;
  const id = url.searchParams.get("pssrpSeqEnc");
  if (!id || id.length > 150 || /[\s<>]/.test(id)) return null;
  const canonical = new URL(url.pathname, sourceUrl);
  canonical.searchParams.set("curPage", "1");
  canonical.searchParams.set("pssrpSeqEnc", id);
  return { id, url: canonical.href };
}

// TourAZ pages render one title link and an additional detail link per listing.
// The surrounding status, issuer and application dates belong to that listing.
export function parseListings(html: string, now: number): Candidate[] {
  const links = [...html.matchAll(/<a\b[^>]*?\bhref\s*=\s*(["'])([^"']+)\1[^>]*>([\s\S]*?)<\/a\s*>/gi)]
    .map(m => ({ start: m.index!, end: m.index! + m[0].length, target: detailUrl(m[2]), title: plain(m[3]) }))
    .filter(m => m.target !== null);
  if (!links.length) {
    if (/전체\s*0\s*건/.test(plain(html)) && /공고·공모/.test(plain(html))) return [];
    throw new Error("공모 목록을 확인할 수 없습니다.");
  }
  const today = seoulDay(now);
  const result = new Map<string, Candidate>();
  let recognized = 0;
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (/^(?:더보기|자세히\s*보기|신청하기)$/.test(link.title) || link.title.length < 5 || link.title.length > 220) continue;
    const before = plain(html.slice(i ? links[i - 1].end : Math.max(0, link.start - 4500), link.start));
    const after = plain(html.slice(link.end, links[i + 1]?.start ?? link.end + 5000));
    const state = before.match(/(?:^|\s)(접수(?:\s*중)?|종료|마감|접수예정|예정)\s+([^<>]{1,75})$/);
    if (state && !/^접수(?:\s*중)?$/.test(state[1])) {
      recognized++;
      continue;
    }
    const dates = after.match(dateRange);
    if (!state || !dates || !validDate(dates[1]) || !validDate(dates[2])) {
      // Never interpret changed card markup as a confirmed empty search.
      if (potentialTitle.test(link.title) && !ignoreTitle.test(link.title)) throw new Error("공모의 접수 정보를 확인할 수 없습니다.");
      continue;
    }
    recognized++;
    if (dates[1] > today || dates[2] < today ||
        !invitation.test(link.title) || !potentialTitle.test(link.title) || ignoreTitle.test(link.title)) continue;
    const { id, url } = link.target!;
    result.set(id, { id, url, title: link.title, organization: state[2], startDate: dates[1], endDate: dates[2] });
  }
  if (!recognized) throw new Error("공모의 접수 상태를 읽을 수 없습니다.");
  return [...result.values()].slice(0, 4);
}

// Official detail pages may abbreviate the ending year and use Korean clock text.
// If an exact cutoff is absent, omit the call on its closing day.
export function enrichCandidate(candidate: Candidate, html: string, now: number): Opportunity | null {
  const text = plain(html);
  const start = text.indexOf(candidate.title);
  if (start < 0) throw new Error("공모 상세를 대조할 수 없습니다.");
  const section = text.slice(start);
  const period = section.match(/신청기간\s*(\d{4}-\d{2}-\d{2})(?:\s*\([^)]{1,7}\))?\s*(?:(\d{1,2})(?:시|:)\s*(\d{1,2})?\s*분?)?\s*(?:부터)?\s*[~～]\s*(?:(\d{4})-)?(\d{2}-\d{2})(?:\s*\([^)]{1,7}\))?\s*(?:(\d{1,2})(?:시|:)\s*(\d{1,2})?\s*분?)?/);
  if (!period || period[1] !== candidate.startDate || period[5] !== candidate.endDate.slice(5) ||
      (period[4] && period[4] !== candidate.endDate.slice(0, 4))) throw new Error("공모 접수기간이 일치하지 않습니다.");
  const at = (day: string, hour: string, minute = "0") => {
    if (Number(hour) > 24 || Number(minute) > 59 || (Number(hour) === 24 && Number(minute) !== 0)) throw new Error("공모 시각을 읽을 수 없습니다.");
    return Date.parse(day + "T00:00:00+09:00") + (Number(hour) * 60 + Number(minute)) * 60_000;
  };
  const starts = at(candidate.startDate, period[2] || "0", period[3]);
  const closes = at(candidate.endDate, period[6] || "0", period[7]);
  if (now < starts || now >= closes || (!period[2] && seoulDay(now) === candidate.startDate && !section.includes("신청하기"))) return null;
  const description = section.slice(period.index! + period[0].length).split(/(?:문의처|문\s*의\s*처|첨부파일)/)[0].slice(0, 6000);
  const theme = themes.find(t => t.pattern.test(candidate.title + " " + description));
  if (!theme) return null;
  const kind = /회원사|얼라이언스|협력|파트너|참여사|운영사/.test(candidate.title) ? "collaboration" : "support";
  return {
    ...candidate, deadlineAt: period[6] ? new Date(closes).toISOString() : null, kind,
    matchReason: "모집 분야에 " + theme.label + " 관련 내용이 있습니다.",
    pitch: candidate.organization + " 담당자님, 「" + candidate.title + "」의 " + theme.label + " 분야를 보고 연락드립니다. 스테이소반은 " + theme.idea + "을 기획하고 있습니다. 참여 수요가 확인된 뒤 소규모로 시작하는 구성이 이번 모집 취지에 맞을지 여쭙고 싶습니다.",
    nextStep: "원문의 신청 자격·신청 방식·비용 분담을 확인하세요. 참여 수요와 비용 조건이 맞으면 공고에서 지정한 경로로 제안을 검토하세요.",
  };
}

async function getHtml(url: string) {
  if (url !== sourceUrl && !detailUrl(url)) throw new Error("지원하지 않는 출처입니다.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);
  try {
    const response = await fetch(url, { redirect: "error", signal: controller.signal, headers: { Accept: "text/html" } });
    const maxBytes = 850_000;
    if (!response.ok || !response.body || !/text\/html/i.test(response.headers.get("content-type") ?? "") ||
        Number(response.headers.get("content-length")) > maxBytes) throw new Error("공식 원문을 열 수 없습니다.");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let size = 0, html = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new Error("공식 원문의 크기 제한을 초과했습니다.");
      }
      html += decoder.decode(value, { stream: true });
    }
    return html + decoder.decode();
  } finally {
    clearTimeout(timer);
  }
}

export async function discover(): Promise<Discovery> {
  const now = Date.now();
  const candidates = parseListings(await getHtml(sourceUrl), now);
  const items = await Promise.all(candidates.map(async candidate => enrichCandidate(candidate, await getHtml(candidate.url), now)));
  return { status: "ready", checkedAt: new Date(now).toISOString(), sourceUrl, sourceName,
    opportunities: items.filter((item): item is Opportunity => item !== null).sort((a, b) => a.endDate.localeCompare(b.endDate)) };
}

export function stillOpen(result: Discovery, now: number): Discovery {
  return { ...result, opportunities: result.opportunities.filter(item =>
    now < Date.parse(item.deadlineAt ?? item.endDate + "T00:00:00+09:00")) };
}

// A timestamped human-readable source check, used only when a live read fails.
// Never renew its clock at build, deploy or request time.
export function verifiedFallback(now: number): Discovery {
  const checkedAt = "2026-11-19T04:54:54+09:00";
  const deadlineAt = "2026-12-09T17:00:00+09:00";
  const verified = Date.parse(checkedAt);
  if (now < verified || now >= Math.min(verified + 72 * 3_600_000, Date.parse(deadlineAt))) {
    return { status: "unavailable", checkedAt: null, sourceName, sourceUrl, opportunities: [] };
  }
  return {
    status: "stale", checkedAt, sourceName, sourceUrl,
    opportunities: [{
      id: "i3cP^0MiEThFPKnoPKxg^g==",
      title: "2027 VISITKOREA 얼라이언스 회원사 모집", organization: "한국관광공사",
      url: "https://touraz.kr/announcementList/pssrpView?curPage=1&pssrpSeqEnc=i3cP%5E0MiEThFPKnoPKxg%5Eg%3D%3D",
      startDate: "2026-11-18", endDate: "2026-12-09", deadlineAt: new Date(deadlineAt).toISOString(),
      kind: "collaboration",
      matchReason: "관광지·체험과 식음료 분야의 공동 마케팅 모집입니다. 공고상 대상은 외국인에게 상품·서비스·콘텐츠를 제공하는 기업과 기관입니다.",
      pitch: "VISITKOREA 얼라이언스 담당자님, 스테이소반은 지역 재료를 소개하고 여행자와 호스트가 한 끼를 함께 만드는 식문화 체험을 기획하고 있습니다. 외국인 대상 콘텐츠와 체험 운영 실적으로 인정되는 자료의 범위를 확인하고 싶습니다.",
      nextStep: "11월 19일 원문 확인 기록입니다. 최신 접수 상태와 신청 자격을 확인한 뒤, 외국인 대상 제공 내역과 사업자등록증·납세증명서 등 필수 서류를 갖춘 경우 투어라즈에서 온라인 신청을 검토하세요.",
    }],
  };
}
