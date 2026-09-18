"use client";

import { useEffect, useRef, useState } from "react";
import type { PresentationFrame } from "@/lib/presentation";

export default function PresentationPlayer({ frames, title }: { frames: PresentationFrame[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const [clean, setClean] = useState(false);
  const frame = frames[index];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("select, input, textarea")) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault(); setIndex((value) => Math.min(value + 1, frames.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault(); setIndex((value) => Math.max(0, value - 1));
      }
      if (event.key === "Home") { event.preventDefault(); setIndex(0); }
      if (event.key === "End") { event.preventDefault(); setIndex(frames.length - 1); }
      if (event.key.toLowerCase() === "h") { event.preventDefault(); setClean((value) => !value); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, frames.length]);

  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }

  if (!frame) return null;
  return (
    <>
      <button ref={trigger} className="manna-button manna-button-primary" onClick={() => {
        setOpen(true); setClean(false); dialog.current?.showModal();
      }}>
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="m10 9 5 3-5 3Z" fill="currentColor"/></svg>
        촬영 보기
      </button>
      <dialog ref={dialog} className={`film-dialog${clean ? " is-clean" : ""}`} aria-label={`${title} 촬영 보기`} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => setOpen(false)}>
        <div className="film-workspace">
          <header className="film-toolbar">
            <div><strong>만나의 식탁</strong><span> 촬영 보기</span></div>
            <div className="film-toolbar-actions">
              <div className="film-format" aria-label="화면 비율">
                <button aria-pressed={!portrait} onClick={() => setPortrait(false)}>가로 16:9</button>
                <button aria-pressed={portrait} onClick={() => setPortrait(true)}>세로 9:16</button>
              </div>
              <button onClick={() => setClean(true)}>도구 숨기기 <kbd>H</kbd></button>
              <button aria-label="촬영 보기 닫기" onClick={close}>닫기 <span aria-hidden="true">×</span></button>
            </div>
          </header>
          <div className="film-canvas" onDoubleClick={() => { if (clean) setClean(false); }}>
            <section className={`film-stage${portrait ? " is-portrait" : ""} film-${frame.kind}`} aria-label="현재 촬영 화면">
              <div className="film-sheet">
                <div className="film-brand"><span>만나의 식탁<span className="film-brand-en">MANNA TABLE</span></span><span>{frame.section}</span></div>
                <div className={`film-content${frame.title.length > 35 ? " has-long-title" : ""}`}>
                  <p className="film-kicker">{frame.number ? `STEP ${frame.number}` : frame.kind === "cover" ? "FOOD, CULTURE & YOU" : "A STORY ON YOUR TABLE"}</p>
                  <h2>{frame.title}</h2>
                  {frame.body && <p className="film-body">{frame.body}</p>}
                  {frame.items && <ul className={frame.kind === "cover" ? "film-facts" : "film-ingredients"}>{frame.items.map((item, i) => <li key={`${i}-${item}`}>{item}</li>)}</ul>}
                  {frame.sources && <ol className="film-sources">{frame.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ol>}
                </div>
                <footer className="film-footer"><span>한 끼로 만나는 세계 문화</span><span>{String(index + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span></footer>
              </div>
            </section>
          </div>
          <footer className="film-controls">
            <p>← → 이동 <span>·</span> H 도구 숨기기·복원 <span>·</span> 화면 두 번 클릭으로 복원 <span>·</span> Esc 닫기</p>
            <div className="film-navigation">
              <button aria-label="이전 장면" disabled={index === 0} onClick={() => setIndex(index - 1)}>← 이전</button>
              <label className="sr-only" htmlFor={`film-scene-${frames.length}`}>장면 선택</label>
              <select id={`film-scene-${frames.length}`} value={index} onChange={(event) => setIndex(Number(event.target.value))}>
                {frames.map((item, i) => <option key={i} value={i}>{i + 1}. {item.section} · {item.title}</option>)}
              </select>
              <button aria-label="다음 장면" disabled={index === frames.length - 1} onClick={() => setIndex(index + 1)}>다음 →</button>
            </div>
          </footer>
          {clean && <button className="film-restore" onClick={() => setClean(false)}>도구 표시 · H</button>}
          <span className="sr-only" role="status">{index + 1} / {frames.length}, {frame.section}, {frame.title}</span>
        </div>
      </dialog>
    </>
  );
}
