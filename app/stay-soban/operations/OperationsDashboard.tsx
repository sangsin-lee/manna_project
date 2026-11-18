"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { SobanOperations, SobanCohort } from "@/lib/soban-operations";
import s from "./operations.module.css";

const products: Record<string,string> = { class: "쿠킹 클래스", local_trip: "미식 여행" };
const slots: Record<string,string> = { morning: "오전", afternoon: "오후", evening: "저녁" };
const languages: Record<string,string> = { ko: "한국어", en: "영어" };
const sources: Record<string,string> = { instagram: "인스타그램", youtube: "유튜브", referral: "공유·추천", direct: "직접 방문", other: "기타" };
const number = (v: number) => new Intl.NumberFormat("ko-KR").format(v);
const description = (g: SobanCohort) => `${g.region} ${products[g.product]} · ${g.date} ${slots[g.slot]} · ${languages[g.language]} · 1인 예산 상한 ${number(g.amount)}원`;

function Copy({ label, message }: { label: string; message: () => string }) {
  const [feedback,setFeedback] = useState("");
  const [fallback,setFallback] = useState("");
  async function copy() {
    const text = message();
    try { await navigator.clipboard.writeText(text); setFeedback("복사했습니다."); setFallback(""); }
    catch { setFeedback("문안을 선택해 복사해 주세요."); setFallback(text); }
  }
  return <div className={s.copy}><button type="button" onClick={copy}>{label}</button>
    {feedback && <span role="status">{feedback}</span>}
    {fallback && <textarea readOnly aria-label="복사할 문안" value={fallback} onFocus={e => e.currentTarget.select()} />}
  </div>;
}

const shareUrl = () => new URL("/stay-soban?for=request&utm_source=instagram",window.location.origin).href;
const recruitment = (g?: SobanCohort) => g
  ? `만나의 식탁에서 ${g.region}의 ${products[g.product]}에 관심 있는 분을 찾습니다. 지금 접수된 희망 조건은 ${description(g)}입니다. 원하는 날짜와 예산을 남겨 주세요. 메뉴·장소·판매가는 추후 안내하며 사전 등록에는 비용이 들지 않습니다.\n${shareUrl()}`
  : `스테이소반에서 여행자와 함께할 지역 식탁을 준비합니다. 원하는 요리 체험이나 미식 여행의 지역·날짜·예산을 알려 주세요. 일정과 최종 참가비는 파트너와 조건을 확인한 뒤 안내합니다. 사전 관심 등록은 무료입니다.\n${shareUrl()}`;

export default function OperationsDashboard() {
  const token = useRef<HTMLInputElement>(null);
  const pending = useRef(false);
  const [data,setData] = useState<SobanOperations | null>(null);
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);

  async function retrieve(e: FormEvent) {
    e.preventDefault();
    const credential = token.current?.value.trim();
    if (!credential || pending.current) return;
    pending.current = true; setBusy(true); setError(""); setData(null);
    try {
      const response = await fetch("/api/stay-soban/operations", {
        method: "POST", cache: "no-store", referrerPolicy: "no-referrer",
        headers: { Authorization: "Bearer " + credential },
      });
      if (!response.ok) throw new Error(response.status === 401 ? "운영 키를 확인해 주세요." : "지금은 접수 내역을 조회할 수 없습니다. 잠시 후 다시 확인해 주세요.");
      const result: SobanOperations = await response.json();
      setData(result);
    } catch(e) { setError(e instanceof Error ? e.message : "조회에 실패했습니다."); }
    finally { if (token.current) token.current.value = ""; pending.current = false; setBusy(false); }
  }
  return <main className={s.page}><div className={s.wrap}>
    <nav className={s.nav} aria-label="스테이소반 운영 메뉴"><Link href="/stay-soban">스테이소반</Link><Link href="/stay-soban/business">협업 기회</Link></nav>
    <header className={s.hero}><div><p className={s.kicker}>스테이소반 운영</p><h1>수요와 파트너 연결</h1></div></header>
    <form className={s.access} onSubmit={retrieve}>
      <label htmlFor="soban-ops-token">운영 키</label><input id="soban-ops-token" ref={token} type="password" autoComplete="off" required maxLength={1024} disabled={busy}/>
      <button type="submit" disabled={busy}>{busy ? "조회 중…" : data ? "새로 조회" : "접수 현황 조회"}</button>
      {data && <button type="button" onClick={() => setData(null)}>화면 잠금</button>}
    </form>
    {error && <p role="alert" className={s.error}>{error}</p>}
    {!data && !busy && !error && <p className={s.help}>기존 예약 관리에 사용하는 운영 키로 조회합니다.</p>}
    {data && <>
      <p className={s.help}>한국시간 {new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",dateStyle:"medium",timeStyle:"short"}).format(new Date(data.checkedAt))} 기준 · 유효한 접수만 집계</p>
      <dl className={s.metrics}>{[
        ["여행자 연락처",data.applicants,"개"], ["이메일 확인·유료 의향",data.eligible,"명"], ["활성 파트너 제안",data.offers,"건"], ["상호 수락",data.connected,"건"],
      ].map(([title,count,unit]) => <div key={title}><dt>{title}</dt><dd>{number(Number(count))}<small>{unit}</small></dd></div>)}</dl>
      <section className={s.card}><div className={s.heading}><h2>회차별 예비 수요</h2><strong>검토 기준 {data.threshold}명</strong></div>
        <p>이메일을 확인하고 유료 참여 의사를 밝힌 연락처를 지역·체험·날짜·시간대·언어·예산 상한별로 묶습니다. 같은 묶음에서는 이메일당 한 명만 세며 동반자는 제외합니다. 첫 쿠킹 클래스의 예비 검토 기준은 6명입니다.</p>
        {data.groups.length ? <ul className={s.groups}>{data.groups.map(g => <li key={[g.product,g.region,g.date,g.slot,g.language,g.amount].join("|")}>
          <div className={s.heading}><h3>{g.region} · {products[g.product]}</h3><strong>{g.people}명{g.product === "class" && g.people >= data.threshold ? " · 검토 대상" : ""}</strong></div>
          <p>{g.date} {slots[g.slot]} · {languages[g.language]} · 1인 예산 상한 {number(g.amount)}원</p>
          <div className={s.actions}><Copy label="SNS 모집 문안 복사" message={() => recruitment(g)}/>
            {g.product === "class" && g.people >= data.threshold && <Copy label="파트너 내부 검토안 복사" message={() => `[스테이소반 내부 검토안]\n${description(g)} 조건으로 확인한 유료 참여 의향은 ${g.people}명입니다. 참가 희망자에게 같은 메뉴·장소와 최종 판매가를 재확인해 주세요. 현장 운영과 판매·결제·환불을 맡을 파트너, 최소 실결제 인원과 모든 운영비, 준비비 조달 방법을 검토합니다. 대표 선부담 한도는 0원입니다. 일정 확약과 모집 개시는 별도 승인 후 진행합니다.`}/>}</div>
        </li>)}</ul> : <div className={s.empty}><h3>검토할 유료 참여 의향이 아직 없습니다</h3><p>방문자가 참여 조건을 남기고 이메일을 확인하면 집계됩니다.</p><Copy label="SNS 관심 모집 문안 복사" message={() => recruitment()}/></div>}
        {data.additionalGroups > 0 && <p>인원순 상위 {data.groups.length}개 묶음을 표시했습니다. 나머지 묶음은 {data.additionalGroups}개입니다.</p>}
      </section>
      <div className={s.grid}><section className={s.card}><h2>여행자 유입 경로</h2>{data.sources.length ? <dl className={s.rows}>{data.sources.map(r => <div key={r.source}><dt>{sources[r.source] || "기타"}</dt><dd>{r.people}명</dd></div>)}</dl> : <p>접수된 유입 경로가 없습니다.</p>}<p>경로마다 중복 연락처를 한 번만 셉니다.</p></section>
      <section className={s.card}><h2>파트너 협의</h2><dl className={s.rows}><div><dt>등록 제안 중 이메일 확인</dt><dd>{data.verifiedOffers}건</dd></div><div><dt>양쪽 수락 대기</dt><dd>{data.suggested}건</dd></div><div><dt>한쪽만 수락</dt><dd>{data.waiting}건</dd></div><div><dt>상호 수락·연락처 연결</dt><dd>{data.connected}건</dd></div></dl><p>모집을 열려면 메뉴·장소·가격 재확인, 실제 판매자와 환불 책임, 준비비 조달 조건에 대한 승인이 필요합니다.</p></section></div>
    </>}
  </div></main>;
}
