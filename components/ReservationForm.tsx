"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Feedback =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

function getLocalDateString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000)
    .toISOString()
    .slice(0, 10);
}

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const minDate = useMemo(getLocalDateString, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const preferredDate = String(
      formData.get("preferredDate") ?? "",
    ).trim();
    const guestsValue = String(formData.get("guests") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();
    const privacyAgreed = formData.get("privacyAgreed") === "on";

    if (!name || !phone) {
      setFeedback({
        type: "error",
        message: "이름과 연락처를 확인해 주세요.",
      });
      return;
    }

    if (!privacyAgreed) {
      setFeedback({
        type: "error",
        message: "문의 접수를 위해 개인정보 수집 안내에 동의해 주세요.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          preferredDate: preferredDate || undefined,
          guests: guestsValue ? Number(guestsValue) : undefined,
          message: message || undefined,
          privacyAgreed,
          website,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.message || "문의 접수 중 오류가 발생했습니다.",
        );
      }

      form.reset();
      setFeedback({
        type: "success",
        message:
          result?.message ||
          "문의가 접수되었습니다. 확인 후 연락드리겠습니다.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "문의 접수 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#e0d5c8] bg-white p-6 shadow-[0_20px_60px_rgba(70,50,25,0.06)] sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-neutral-800">
            이름 <span className="text-[#b9480c]">*</span>
          </span>
          <input
            type="text"
            name="name"
            required
            maxLength={50}
            autoComplete="name"
            placeholder="이름을 입력해 주세요"
            className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#b9480c] focus:ring-2 focus:ring-[#b9480c]/15"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-neutral-800">
            연락처 <span className="text-[#b9480c]">*</span>
          </span>
          <input
            type="tel"
            name="phone"
            required
            maxLength={30}
            autoComplete="tel"
            inputMode="tel"
            placeholder="010-0000-0000"
            className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#b9480c] focus:ring-2 focus:ring-[#b9480c]/15"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-neutral-800">
            희망 날짜
          </span>
          <input
            type="date"
            name="preferredDate"
            min={minDate}
            className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 text-base text-neutral-950 outline-none transition focus:border-[#b9480c] focus:ring-2 focus:ring-[#b9480c]/15"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-neutral-800">
            예상 인원
          </span>
          <input
            type="number"
            name="guests"
            min={1}
            max={100}
            inputMode="numeric"
            placeholder="예: 6"
            className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3.5 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#b9480c] focus:ring-2 focus:ring-[#b9480c]/15"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-bold text-neutral-800">문의 내용</span>
        <textarea
          name="message"
          rows={6}
          maxLength={2000}
          placeholder="관심 있는 나라와 음식, 모임 목적, 가능한 시간대를 적어 주세요."
          className="mt-2 w-full resize-y rounded-2xl border border-stone-300 bg-white px-4 py-3.5 text-base leading-7 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#b9480c] focus:ring-2 focus:ring-[#b9480c]/15"
        />
      </label>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#f7f3ed] p-4">
        <input
          type="checkbox"
          name="privacyAgreed"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#b9480c]"
        />
        <span className="break-keep text-sm leading-6 text-neutral-600">
          문의 처리를 위한 이름, 연락처 및 문의 내용 수집에 동의합니다.{" "}
          <Link
            href="/privacy"
            className="font-bold !text-[#943706] underline underline-offset-4"
          >
            개인정보 처리 안내
          </Link>
        </span>
      </label>

      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="break-keep text-xs leading-5 text-neutral-500">
          구체적인 일정과 비용은 문의 내용을 확인한 뒤 개별 안내합니다.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-neutral-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-[#943706] disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {isSubmitting ? "접수 중..." : "문의 보내기"}
        </button>
      </div>
    </form>
  );
}
