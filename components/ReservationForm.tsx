"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { dateError, seoulDate, timeOptions } from "@/lib/reservation-policy";
const input =
  "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-neutral-950";
export default function ReservationForm() {
  const identity = useRef<{ id: string; token: string } | null>(null);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [receipt, setReceipt] = useState<{
      id: string;
      url: string;
      notified: boolean;
    } | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const f = new FormData(form),
      date = String(f.get("preferredDate"));
    const issue = dateError(date);
    if (issue) {
      setError(issue);
      return;
    }
    if (!identity.current)
      identity.current = {
        id: crypto.randomUUID(),
        token: Array.from(crypto.getRandomValues(new Uint8Array(32)), (n) =>
          n.toString(16).padStart(2, "0"),
        ).join(""),
      };
    const identityValue = identity.current;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: identityValue.id,
          trackingToken: identityValue.token,
          name: f.get("name"),
          phone: f.get("phone"),
          preferredDate: date,
          guests: Number(f.get("guests")),
          theme: f.get("theme"),
          time: f.get("time"),
          message: f.get("message"),
          website: f.get("website"),
          privacyAgreed: f.get("privacyAgreed") === "on",
        }),
      });
      const data = await r.json();
      if (!r.ok) throw Error(data.message || "접수하지 못했습니다.");
      setReceipt({
        id: data.reservationId,
        url:
          "/reservations#id=" +
          data.reservationId +
          "&token=" +
          identityValue.token,
        notified: data.notified !== false,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "잠시 후 다시 신청해 주세요.");
    } finally {
      setBusy(false);
    }
  }
  if (receipt)
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-300 bg-white p-8"
      >
        <p className="text-sm font-bold text-emerald-800">
          신청 저장 완료 · 확인 대기
        </p>
        <h3 className="mt-3 text-2xl font-black">신청이 접수되었습니다.</h3>
        <p className="mt-4 leading-8">
          장소·시간·메뉴·인원·총비용을 협의한 뒤 운영자가 확정합니다. 현재는
          확정된 예약이 아닙니다.
        </p>
        <p className="mt-4 break-all text-sm">접수번호: {receipt.id}</p>
        <Link
          className="mt-6 inline-block rounded-full bg-neutral-950 px-6 py-3 font-bold !text-white"
          href={receipt.url}
        >
          예약 상태 확인 및 링크 보관 →
        </Link>
        {!receipt.notified && (
          <p className="mt-4 text-sm text-amber-800">
            신청은 저장됐으나 운영자 이메일 알림을 보내지 못했습니다. 상태 확인
            링크를 보관해 주세요.
          </p>
        )}
        <p className="mt-4 text-xs text-neutral-500">
          확인 링크는 신청 정보를 열 수 있는 전용 링크입니다. 다른 사람에게
          공유하지 마세요.
        </p>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-stone-300 bg-white p-6 sm:p-8"
    >
      <div className="mb-7 rounded-2xl bg-[#f7f3ed] p-5 text-sm leading-7">
        <strong>서울의 대여 키친에서 함께하는 소규모 요리·문화 모임</strong>
        <p>일요일 제외 · 장소와 정원 미정 · 테마별 비용 협의</p>
        <p>
          아래는 희망 조건입니다. 신청 후 가능한 공간과 진행 범위를 확인해 개별
          연락드리며, 합의 전에는 예약이 확정되거나 결제되지 않습니다.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          이름 *
          <input
            className={input}
            name="name"
            required
            maxLength={50}
            autoComplete="name"
          />
        </label>
        <label>
          연락처 *
          <input
            className={input}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            minLength={8}
            maxLength={30}
            autoComplete="tel"
            placeholder="연락 가능한 전화번호"
          />
        </label>
        <label>
          희망 날짜 *
          <input
            className={input}
            name="preferredDate"
            type="date"
            min={seoulDate(new Date(Date.now() + 86400000))}
            required
            onChange={(e) => {
              e.target.setCustomValidity(dateError(e.target.value) || "");
            }}
          />
          <span className="text-xs text-neutral-500">
            내일 이후 · 일요일 제외
          </span>
        </label>
        <label>
          희망 시간대 *
          <select className={input} name="time" required>
            <option value="">선택해 주세요</option>
            {timeOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          희망 인원 *
          <input
            className={input}
            name="guests"
            type="number"
            required
            min={1}
            max={100}
            placeholder="실제 정원은 협의 후 결정"
          />
          <span className="text-xs text-neutral-500">
            운영자 1명이 진행할 수 있는 규모로 조율합니다.
          </span>
        </label>
        <label>
          함께 알아보고 싶은 나라·음식 *
          <input
            className={input}
            name="theme"
            required
            maxLength={80}
            placeholder="예: 독일의 식문화와 가정식"
          />
        </label>
      </div>
      <label className="mt-5 block">
        희망 메뉴·모임 목적·준비 시 참고할 점
        <textarea
          className={input}
          name="message"
          rows={4}
          maxLength={500}
          placeholder="희망 조건을 적어 주세요. 민감한 건강정보는 적지 마시고, 음식 관련 주의사항은 개별 협의 때 알려주세요."
        />
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-label="Website"
        />
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm leading-7">
        <input className="mt-2" type="checkbox" name="privacyAgreed" required />
        <span>
          예약 상담·진행을 위한 이름, 연락처, 희망 일정·인원·테마·요청사항
          수집에 동의합니다.{" "}
          <Link className="underline" href="/privacy">
            개인정보 처리 안내
          </Link>
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}
      <button
        disabled={busy}
        className="mt-7 min-h-12 rounded-full bg-neutral-950 px-7 py-3 font-bold text-white disabled:opacity-50"
      >
        {busy ? "저장 중…" : "예약 신청하기"}
      </button>
      <p className="mt-4 text-xs text-neutral-500">
        신청 접수 → 운영자 연락·조건 협의 → 예약 확정. 확정 전 결제는 받지
        않습니다.
      </p>
    </form>
  );
}
