"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import s from "./soban.module.css";

const regions = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"] as const;
const products = { class: "함께 만드는 요리 수업", local_trip: "동네 미식 여행" };
const slots = { morning: "오전", afternoon: "오후", evening: "저녁" };
const languages = { ko: "한국어", en: "영어" };
const tabNames = { request: "여행자 관심등록", offer: "파트너 제안", inbox: "내 연결함" };
const storageName = "manna.soban.receipts.v1";
const keyPattern = /^[a-f0-9]{64}$/;
type Kind = "request" | "offer";
type Tab = keyof typeof tabNames;
type Conditions = {
  product: keyof typeof products;
  region: string;
  date: string;
  slot: keyof typeof slots;
  language: keyof typeof languages;
  amount: number;
  people: number;
};
type Receipt = Conditions & { kind: Kind; paidIntent: boolean; matching: boolean; verified: boolean };
type Match = Conditions & {
  id: string;
  status: "pending" | "waiting" | "accepted" | "declined";
  contact?: string;
};
type Mailbox = { record: Receipt; matches: Match[] };
type LocalReceipt = { key: string; label: string };

class RequestError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

function localReceipts(): LocalReceipt[] {
  try {
    const records: unknown = JSON.parse(localStorage.getItem(storageName) || "[]");
    return Array.isArray(records) ? records.filter((v) => v && keyPattern.test(v.key) && typeof v.label === "string") : [];
  } catch {
    return [];
  }
}

function newKey() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function manageLink(key: string) {
  return window.location.origin + "/stay-soban#key=" + key;
}

function kstDate(days = 0) {
  return new Date(Date.now() + 9 * 3600000 + days * 86400000).toISOString().slice(0, 10);
}

async function api<T>(payload: Record<string, unknown>): Promise<T> {
  const r = await fetch("/api/stay-soban", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(payload),
  });
  const result = await r.json().catch(() => null);
  if (!r.ok || result === null) throw new RequestError(result?.error || "요청을 완료하지 못했어요. 잠시 후 다시 시도해 주세요.", r.status);
  return result as T;
}

function inputKey(value: string) {
  const text = value.trim();
  if (keyPattern.test(text)) return text;
  try {
    const url = new URL(text);
    const key = new URLSearchParams(url.hash.slice(1)).get("key") || "";
    return url.origin === window.location.origin && url.pathname.replace(/\/$/, "") === "/stay-soban" && keyPattern.test(key) ? key : "";
  } catch {
    return "";
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className={s.field}><span>{label}</span>{children}</label>;
}

function ConditionsSummary({ data }: { data: Conditions }) {
  return <p className={s.summary}>{data.region} · {data.date} {slots[data.slot]} · {languages[data.language]}<br />{data.people}명 · 1인 {Number(data.amount).toLocaleString("ko-KR")}원</p>;
}

export default function StaySoban() {
  const [tab, setTab] = useState<Tab>("request");
  const [saved, setSaved] = useState<LocalReceipt[]>([]);
  const [active, setActive] = useState("");
  const [mailbox, setMailbox] = useState<Mailbox | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [syncIssue, setSyncIssue] = useState("");
  const [copyValue, setCopyValue] = useState("");
  const [accepting, setAccepting] = useState("");
  const [withdraw, setWithdraw] = useState(false);
  const [today, setToday] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [verification, setVerification] = useState("");
  const [retryKey, setRetryKey] = useState("");
  const [source, setSource] = useState("direct");
  const [revision, setRevision] = useState(0);
  const formSection = useRef<HTMLDivElement>(null);
  const lock = useRef(false);
  const confirming = useRef(false);

  useEffect(() => { confirming.current = Boolean(accepting || withdraw || verification); }, [accepting, withdraw, verification]);

  const updateSaved = useCallback((items: LocalReceipt[]) => {
    setSaved(items);
    try { localStorage.setItem(storageName, JSON.stringify(items)); } catch { /* The private link also works without browser storage. */ }
  }, []);

  useEffect(() => {
    setToday(kstDate());
    setLastDay(kstDate(365));
    function locationChanged() {
      const url = new URL(window.location.href);
      const rows = localReceipts();
      setSaved(rows);
      const query = url.searchParams;
      setSource((query.get("utm_source") || query.get("ref") || "direct").trim().slice(0, 60));
      const fragment = new URLSearchParams(url.hash.slice(1));
      const key = fragment.get("key") || "";
      const verify = fragment.get("verify") || "";
      setVerification(verify.slice(0, 2048));
      const channel = query.get("for");
      setTab(verify || keyPattern.test(key) || channel === "inbox" ? "inbox" : channel === "offer" ? "offer" : "request");
      setActive(keyPattern.test(key) ? key : rows[0]?.key || "");
      setRetryKey("");
      setAccepting(""); setWithdraw(false); setCopyValue(""); setError(""); setNotice("");
      if (verify || keyPattern.test(key) || channel === "inbox" || channel === "offer") {
        requestAnimationFrame(() => formSection.current?.scrollIntoView({ block: "start" }));
      }
    }
    locationChanged();
    window.addEventListener("popstate", locationChanged);
    window.addEventListener("hashchange", locationChanged);
    return () => { window.removeEventListener("popstate", locationChanged); window.removeEventListener("hashchange", locationChanged); };
  }, []);

  useEffect(() => {
    setSyncIssue("");
    if (tab !== "inbox" || !active) { setMailbox(null); setLoading(false); return; }
    let ignore = false;
    let inFlight = false;
    let lastCheck = 0;
    let first = true;
    setMailbox(null); setLoading(true); setError("");
    async function refresh() {
      if (document.visibilityState !== "visible" || inFlight || lock.current || (!first && confirming.current) || Date.now() - lastCheck < 3000) return;
      inFlight = true; lastCheck = Date.now();
      try {
        const result = await api<Mailbox>({ action: "status", key: active });
        if (ignore || lock.current) return;
        if (!result.record || !Array.isArray(result.matches)) throw new Error("연결함 정보를 읽지 못했어요.");
        setMailbox(result); setSyncIssue("");
        if (first) {
          setError("");
          const rows = localReceipts();
          const label = result.record.region + " · " + result.record.date + " · " + (result.record.kind === "request" ? "여행자" : "파트너");
          updateSaved([{ key: active, label }, ...rows.filter((item) => item.key !== active)]);
        }
        first = false;
      } catch (e) {
        if (ignore) return;
        if (first || (e instanceof RequestError && [401, 403, 404, 410].includes(e.status))) {
          setMailbox(null); setError(e instanceof Error ? e.message : "연결함을 불러오지 못했어요.");
        } else {
          setSyncIssue("최근 변경 사항을 확인하지 못했어요. 새로고침하면 다시 확인할 수 있어요.");
        }
      } finally {
        inFlight = false;
        if (!ignore) setLoading(false);
      }
    }
    void refresh();
    const timer = window.setInterval(refresh, 75_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      ignore = true;
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [active, tab, revision, updateSaved]);

  function showTab(next: Tab, selectedKey?: string, scroll = true) {
    const key = selectedKey ?? (active || saved[0]?.key || "");
    const url = new URL(window.location.href);
    url.searchParams.delete("for");
    if (next !== "request") url.searchParams.set("for", next);
    url.hash = next === "inbox" && key ? "key=" + key : "";
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    setTab(next); setActive(key); setError(""); setNotice(""); setCopyValue(""); setAccepting(""); setWithdraw(false); setRetryKey(""); setVerification("");
    if (scroll) formSection.current?.scrollIntoView({ block: "start" });
  }

  async function copy(text: string, message: string) {
    setNotice(""); setCopyValue("");
    try { await navigator.clipboard.writeText(text); setNotice(message); }
    catch { setCopyValue(text); setNotice("아래 링크를 선택해 복사해 주세요."); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || tab === "inbox") return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const key = retryKey || newKey();
    setRetryKey(key);
    lock.current = true; setBusy(true); setError(""); setNotice(""); setCopyValue("");
    const label = String(fields.region) + " · " + String(fields.date) + " · " + (tab === "request" ? "여행자" : "파트너");
    const rows = [{ key, label }, ...localReceipts().filter((row) => row.key !== key)];
    try {
      await api({ action: "register", key, kind: tab, ...fields, amount: Number(fields.amount), people: Number(fields.people),
        consent: fields.consent === "on", matching: fields.matching === "on", paidIntent: tab === "request" && fields.paidIntent === "on", source });
      updateSaved(rows);
      showTab("inbox", key);
      setNotice("접수했어요. 다른 기기에서도 열 수 있도록 개인 관리 링크를 보관해 주세요.");
    } catch (e) {
      if (e instanceof TypeError) updateSaved(rows);
      setError(e instanceof TypeError ? "연결이 끊겼어요. 같은 화면에서 다시 접수하거나 내 연결함에서 결과를 확인해 주세요." : e instanceof Error ? e.message : "접수를 완료하지 못했어요.");
    } finally { lock.current = false; setBusy(false); }
  }

  async function action(type: "accept" | "decline" | "withdraw", matchId?: string) {
    if (lock.current || !active) return;
    lock.current = true; setBusy(true); setError(""); setNotice(""); setCopyValue("");
    try {
      await api({ action: type, key: active, matchId, shareEmail: type === "accept" });
      setAccepting(""); setWithdraw(false);
      if (type === "withdraw") {
        const rest = localReceipts().filter((row) => row.key !== active);
        updateSaved(rest); setMailbox(null);
        showTab("inbox", rest[0]?.key || "");
        setNotice("접수를 철회했어요.");
      } else {
        setRevision((n) => n + 1);
        setNotice(type === "accept" ? "수락을 저장했어요. 두 분 모두 수락하면 서로의 이메일이 열립니다." : "이 제안을 거절했어요.");
      }
    } catch (e) { setError(e instanceof Error ? e.message : "변경을 저장하지 못했어요."); }
    finally { lock.current = false; setBusy(false); }
  }

  function shareAudience(kind: Kind) {
    const url = new URL("/stay-soban", window.location.origin);
    url.searchParams.set("utm_source", "referral");
    url.searchParams.set("for", kind);
    void copy(url.toString(), (kind === "request" ? "여행자 관심등록" : "파트너 제안") + " 공개 링크를 복사했어요.");
  }

  async function verifyEmail(send: boolean) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError(""); setNotice("");
    try {
      await api(send ? { action: "sendVerification", key: active } : { action: "verify", token: verification });
      if (send) {
        setNotice("입력한 주소로 확인 메일을 요청했어요. 받은편지함에서 링크를 열어 주세요.");
      } else {
        showTab("inbox", active, false); setRevision((n) => n + 1);
        setNotice("이메일 확인을 마쳤어요. 등록할 때 보관한 개인 관리 링크에서 제안을 확인해 주세요.");
      }
    } catch (e) { setError(e instanceof Error ? e.message : "이메일 확인 요청을 완료하지 못했어요."); }
    finally { lock.current = false; setBusy(false); }
  }

  const partner = tab === "offer";
  return <main className={s.page}>
    <header className={s.hero}>
      <div className={s.heroCopy}>
        <p className={s.brand}>스테이소반 <span>×</span> 만나의 식탁</p>
        <h1>여행지에서<br />함께 짓는 <em>한 끼.</em></h1>
        <p className={s.lead}>동네 부엌에서 배우는 요리와 시장을 걷는 미식 여행.<br className={s.wideOnly} /> 원하는 하루를 남기면 조건이 맞는 지역 파트너를 연결해요.</p>
        <div className={s.actions}><button type="button" disabled={busy} onClick={() => showTab("request")} className={s.heroButton}>내 여행 조건 남기기</button><button type="button" disabled={busy} onClick={() => showTab("offer")} className={s.heroText}>파트너로 참여하기</button></div>
      </div>
      <div className={s.heroImage}><Image priority fill sizes="(min-width: 850px) 50vw, 100vw" src="/atlas/pasta-workshop.webp" alt="밀가루를 뿌린 나무 도마에서 손으로 생면을 빚는 모습" /></div>
    </header>
    <section className={s.station} aria-label="스테이소반 접수와 연결">
      <aside className={s.aside}>
        <p className={s.eyebrow}>만나 로컬 테이블</p>
        <h2>어떤 식탁을<br className={s.wideOnly}/> 만나고 싶나요?</h2>
        <p>관심등록과 파트너 제안은 무료예요. 일정·인원·언어·예산이 맞으면 연결함에서 서로의 조건을 확인할 수 있어요.</p>
        <div className={s.note}><strong>첫 회차 준비 중</strong><p>같은 회차에 유료 참여 의사가 있는 분이 6명 모이면 개설을 검토해요. 일정과 실제 금액은 판매 파트너가 다시 안내합니다.</p></div>
        <a className={s.social} href="https://www.instagram.com/manna._.table/" target="_blank" rel="noreferrer">만나 테이블 인스타그램</a>
        <a className={s.social} href="/stay-soban/business">사업 제휴·공개 모집</a>
      </aside>
      <div ref={formSection} className={s.workspace}>
        <nav className={s.tabs} aria-label="접수 메뉴">{(Object.entries(tabNames) as [Tab,string][]).map(([key,label]) => <button type="button" disabled={busy} aria-current={tab === key ? "page" : undefined} key={key} onClick={() => showTab(key, undefined, false)} className={tab === key ? s.selected : ""}>{label}</button>)}</nav>
        {notice && <p role="status" className={s.feedback}>{notice}</p>}
        {copyValue && <Field label="복사할 링크"><input readOnly onFocus={(e) => e.currentTarget.select()} value={copyValue}/></Field>}
        {error && <p role="alert" className={s.error}>{error}</p>}
        {tab !== "inbox" ? <div key={tab} className={s.panel}>
          <h2>{partner ? "어떤 체험을 열 수 있나요?" : "어떤 여행을 계획하시나요?"}</h2>
          <p className={s.caption}>{partner ? "지역 호스트·숙소·여행 운영사가 직접 제안할 수 있어요. 실제 판매자가 현장 운영·결제·환불을 맡습니다." : "동행 인원과 가능한 날짜를 남겨 주세요. 관심등록에는 결제나 예약 의무가 없습니다."}</p>
          <form onSubmit={submit} className={s.form}>
            <fieldset disabled={busy}>
              <legend>체험 조건</legend>
              <div className={s.grid}>
                <Field label="체험 종류"><select name="product" defaultValue="class">{Object.entries(products).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></Field>
                <Field label={partner ? "진행 지역" : "희망 지역"}><select required defaultValue="" name="region"><option disabled value="">지역 선택</option>{regions.map((x) => <option key={x}>{x}</option>)}</select></Field>
                <Field label={partner ? "진행 가능일 · 한국시간" : "희망 날짜 · 한국시간"}><input type="date" min={today || undefined} max={lastDay || undefined} name="date" required/></Field>
                <Field label="시간대"><select name="slot" defaultValue="afternoon">{Object.entries(slots).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></Field>
                <Field label={partner ? "최대 수용 인원 · 명" : "함께할 인원 · 명"}><input name="people" type="number" inputMode="numeric" required min={1} max={30} defaultValue={partner ? undefined : 1} placeholder={partner ? "최대 30명" : undefined}/></Field>
                <Field label="진행 언어"><select name="language" defaultValue="ko">{Object.entries(languages).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></Field>
                <Field label={partner ? "1인 최소 진행 금액 · 원" : "1인 최대 예산 · 원"}><input name="amount" type="number" min={0} max={10000000} step={1} inputMode="numeric" required placeholder="예: 45000"/></Field>
              </div>
              {!partner && <label className={s.check}><input type="checkbox" name="paidIntent"/><span>희망 조건에 맞으면 유료 참여를 검토할게요.</span></label>}
            </fieldset>
            <fieldset disabled={busy}>
              <legend>접수자 정보</legend>
              <div className={s.grid}>
                <Field label="이메일"><input name="email" required type="email" autoComplete="email" maxLength={254} placeholder="you@example.com"/></Field>
              </div>
              <label className={s.check}><input type="checkbox" name="consent" required/><span><b>필수</b> 이메일과 입력한 조건을 스테이소반 접수 관리에 사용하는 데 동의해요. 즉시 철회할 수 있으며, 90일이 지난 접수는 조회·매칭에서 제외하고 접속 시 정리해요.</span></label>
              <label className={s.check}><input type="checkbox" name="matching"/><span><b>선택</b> 조건이 맞는 상대에게 지역·일정·인원 등 체험 조건을 보여주고 연결 제안을 받을게요. 이메일 공유는 제안마다 따로 선택해요.</span></label>
            </fieldset>
            <div className={s.actions}><button className={s.primary} disabled={busy}>{busy ? "저장 중…" : partner ? "파트너 제안 등록" : "무료 관심등록"}</button><button className={s.inline} type="button" onClick={() => shareAudience(partner ? "offer" : "request")}>이 접수 링크 복사</button></div>
          </form>
        </div> : <section className={s.panel}>
          <h2>내 연결함</h2>
          <p className={s.caption}>개인 관리 링크를 가진 사람은 접수·제안을 관리할 수 있어요. 공용 기기에서는 개인 브라우징 창을 이용해 주세요.</p>
          {syncIssue && <p className={s.feedback} role="status">{syncIssue}</p>}
          {verification && <div className={s.confirm}><strong>내 이메일 확인</strong><p>이 주소가 접수자의 이메일임을 확인하면 서로 수락한 제안에서 연락처를 교환할 수 있어요.</p><button type="button" disabled={busy} className={s.primary} onClick={() => void verifyEmail(false)}>이메일 확인 완료하기</button></div>}
          {saved.length > 0 && <Field label="이 기기에 저장된 접수"><select value={active} disabled={busy} onChange={(e) => showTab("inbox", e.target.value, false)}>
            {!saved.some((row) => row.key === active) && <option value={active}>개인 관리 링크로 연 접수</option>}
            {saved.map((row) => <option key={row.key} value={row.key}>{row.label}</option>)}</select></Field>}
          {loading && <p className={s.blank} role="status">최신 제안을 확인하고 있어요.</p>}
          {!active && !verification && <div className={s.blank}><strong>이 기기에 저장된 접수가 없어요.</strong><p>처음이라면 여행 조건을 남겨 주세요. 이미 접수했다면 아래에서 개인 관리 링크를 열 수 있어요.</p><button type="button" className={s.inline} onClick={() => showTab("request", undefined, false)}>여행자 관심등록 열기</button></div>}
          {mailbox && <div className={s.inbox}>
            <div className={s.ticket}><p className={s.eyebrow}>{mailbox.record.kind === "offer" ? "내 파트너 제안" : "내 관심등록"}</p><h3>{products[mailbox.record.product]}</h3><ConditionsSummary data={mailbox.record}/><span>{mailbox.record.matching ? "자동 연결에 동의한 접수" : "조건만 등록한 접수"}</span></div>
            <div className={s.actions}><button type="button" className={s.outline} onClick={() => void copy(manageLink(active), "개인 관리 링크를 복사했어요. 본인만 볼 수 있는 곳에 보관해 주세요.")}>개인 관리 링크 복사</button><button type="button" disabled={busy} className={s.inline} onClick={() => setRevision((v) => v+1)}>새로고침</button></div>
            {!mailbox.record.verified && <div className={s.confirm}><strong>이메일 소유 확인</strong><p>제안을 수락하고 연락처를 교환하려면 접수 이메일을 먼저 확인해 주세요.</p><button type="button" disabled={busy} className={s.outline} onClick={() => void verifyEmail(true)}>내 이메일 확인 메일 받기</button><p>메일이 오지 않으면 스팸함을 확인해 주세요. 전송이 어렵거나 계속 누락되면 <a className={s.email} href="mailto:manna.sangsin@gmail.com?subject=스테이소반%20이메일%20확인%20문의">운영자에게 문의</a>할 수 있어요.</p></div>}
            <div><h3 className={s.matchTitle}>받은 제안</h3><p className={s.summary}>연결함을 보고 있는 동안 새 제안을 자동으로 확인해요.</p></div>
            {mailbox.matches.length === 0 && <div className={s.blank}><strong>{mailbox.record.matching ? "아직 조건이 맞는 제안이 없어요." : "자동 연결이 꺼져 있어요."}</strong><p>{mailbox.record.matching ? "맞는 상대가 등록되면 이곳에 표시돼요. 나중에 개인 관리 링크로 다시 확인해 주세요." : "새로운 조건으로 연결을 원할 때는 기존 접수를 철회한 뒤 자동 연결에 동의해 다시 등록해 주세요."}</p></div>}
            {mailbox.matches.map((match) => <article className={s.match} key={match.id}><div className={s.matchHead}><h4>{products[match.product]}</h4><span>{{pending:"검토 대기",waiting:"상대 수락 대기",accepted:"서로 수락",declined:"거절됨"}[match.status]}</span></div><ConditionsSummary data={match}/>
              {match.status === "accepted" && match.contact && <p>상대 이메일 <a className={s.email} href={"mailto:" + match.contact}>{match.contact}</a></p>}
              {match.status === "pending" && (accepting === match.id ? <div className={s.confirm}><p>서로 수락하면 이 상대와 접수 이메일을 공유합니다. 두 분이 직접 일정과 조건을 협의해 주세요.</p><div className={s.actions}><button type="button" className={s.primary} disabled={busy || !mailbox.record.verified} onClick={() => void action("accept", match.id)}>이메일 공유에 동의하고 수락</button><button type="button" className={s.inline} onClick={() => setAccepting("")}>돌아가기</button></div></div> : <div className={s.actions}><button type="button" className={s.outline} disabled={busy || !mailbox.record.verified} onClick={() => setAccepting(match.id)}>{mailbox.record.verified ? "제안 수락" : "이메일 확인 후 수락"}</button><button type="button" disabled={busy} className={s.inline} onClick={() => void action("decline", match.id)}>거절</button></div>)}
            </article>)}
            {withdraw ? <div className={s.confirm}><p>접수를 철회하면 이 접수의 제안을 더 이상 확인할 수 없어요.</p><div className={s.actions}><button type="button" disabled={busy} className={s.outline} onClick={() => void action("withdraw")}>철회 확정</button><button type="button" className={s.inline} onClick={() => setWithdraw(false)}>유지하기</button></div></div> : <button type="button" className={s.inline} disabled={busy} onClick={() => setWithdraw(true)}>내 접수 철회</button>}
          </div>}
          {active && !mailbox && !loading && <button type="button" className={s.outline} onClick={() => setRevision((v) => v+1)}>연결함 다시 확인</button>}
          <details className={s.restore}><summary>다른 접수의 개인 관리 링크 열기</summary><form onSubmit={(e) => { e.preventDefault(); const key=inputKey(String(new FormData(e.currentTarget).get("link") || "")); if (!key) {setError("스테이소반에서 복사한 개인 관리 링크를 입력해 주세요."); return;} showTab("inbox",key,false); }}><Field label="개인 관리 링크"><input name="link" autoComplete="off" required placeholder="접수 후 복사한 링크"/></Field><button type="submit" className={s.outline}>연결함 열기</button></form></details>
        </section>}
      </div>
    </section>
  </main>;
}

