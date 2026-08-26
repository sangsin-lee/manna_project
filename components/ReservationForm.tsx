"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  preferredDate: string;
  guests: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  preferredDate: "",
  guests: "",
  message: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResultMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          preferredDate: form.preferredDate,
          guests: form.guests ? Number(form.guests) : undefined,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResultMessage(data.message || "문의 접수에 실패했습니다.");
        return;
      }

      setResultMessage("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setResultMessage("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <input
        type="text"
        placeholder="이름"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="rounded-2xl border border-neutral-300 px-4 py-4 outline-none transition focus:border-neutral-900"
      />
      <input
        type="text"
        placeholder="연락처"
        value={form.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        className="rounded-2xl border border-neutral-300 px-4 py-4 outline-none transition focus:border-neutral-900"
      />
      <input
        type="date"
        value={form.preferredDate}
        onChange={(e) => updateField("preferredDate", e.target.value)}
        className="rounded-2xl border border-neutral-300 px-4 py-4 outline-none transition focus:border-neutral-900"
      />
      <input
        type="number"
        placeholder="인원"
        min={1}
        value={form.guests}
        onChange={(e) => updateField("guests", e.target.value)}
        className="rounded-2xl border border-neutral-300 px-4 py-4 outline-none transition focus:border-neutral-900"
      />
      <textarea
        placeholder="문의 내용"
        value={form.message}
        onChange={(e) => updateField("message", e.target.value)}
        className="min-h-[160px] rounded-2xl border border-neutral-300 px-4 py-4 outline-none transition focus:border-neutral-900 md:col-span-2"
      />
      <div className="md:col-span-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-neutral-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 md:w-fit"
        >
          {loading ? "보내는 중..." : "문의 보내기"}
        </button>

        {resultMessage ? (
          <p className="text-sm text-neutral-700">{resultMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
