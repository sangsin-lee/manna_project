import Link from "next/link";
import history from "@/data/daily-menu-history.json";
import { getRecipe } from "@/lib/content";

export default function TonightPick() {
  const entries = [...history.daily].sort((a, b) => b.date.localeCompare(a.date));
  const pick = entries[0];
  const recipe = pick && getRecipe(pick.recipeSlug);
  if (!recipe) return null;
  const [year, month, day] = pick.date.split("-").map(Number);

  return (
    <section id="tonight-pick" aria-labelledby="tonight-pick-title" className="scroll-mt-32 border-b border-[#e5d5c3] bg-[#f6f2ec]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:py-14">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-black">
            <p className="tracking-[0.2em] text-[#943706]">DINNER PICK</p>
            <time dateTime={pick.date} className="text-neutral-600">{year}년 {month}월 {day}일의 저녁 식사 추천</time>
          </div>
          <h2 id="tonight-pick-title" className="mt-4 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl">오늘 저녁은<br />{recipe.title}</h2>
          <p className="mt-4 max-w-xl break-keep leading-7 text-neutral-600">{recipe.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-[#71350f]">
            {[`${recipe.servings}인분`, `총 ${recipe.cookingTime}분`, ...pick.preparationLabels].map((label) => (
              <li key={label} className="rounded-full bg-[#eddfcc] px-3 py-1.5">{label}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/recipes/${recipe.slug}`} className="inline-flex rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#943706]">레시피와 음식 이야기 →</Link>
            <a href="#dinner-recipe" className="inline-flex items-center rounded-full border border-[#d6c3ae] px-5 py-3.5 text-sm font-bold no-underline">장보기 목록 ↓</a>
          </div>
          <div className="mt-8 rounded-2xl bg-[#243e2e] p-6 text-[#fffdf1]">
            <p className="text-xs font-bold tracking-[0.18em] text-[#d8c29a]">오늘 이 한 끼를 고른 이유</p>
            <p className="mt-3 break-keep leading-7">{pick.selectionReason}</p>
            <p className="mt-4 border-t border-white/20 pt-4 text-sm leading-7 text-[#e4e7d9]">{recipe.culturalNote}</p>
          </div>
          <div className="mt-6 rounded-2xl border border-[#e5d5c3] p-5">
            <h3 className="text-sm font-black">영상으로 남긴다면</h3>
            <p className="mt-2 break-keep text-sm leading-7 text-neutral-600">{pick.videoIdea}</p>
            <Link href={`/videos/studio?recipe=${recipe.slug}`} className="mt-3 inline-block text-sm font-bold !text-[#943706] underline underline-offset-4">이 레시피로 영상 만들기 →</Link>
          </div>
          <details className="mt-6 rounded-2xl border border-[#e5d5c3] p-5 text-sm">
            <summary className="cursor-pointer font-bold">지난 저녁 추천 다시 보기</summary>
            <ul className="mt-3 space-y-3 text-neutral-600">
              {entries.slice(1).map((entry) => (
                <li key={entry.date}><Link href={`/recipes/${entry.recipeSlug}`} className="underline underline-offset-4">{entry.date} · {entry.title}</Link></li>
              ))}
              <li><Link href="/dinners/2026-09-17" className="underline underline-offset-4">2026-09-17 · 불고기 치즈 떡피자</Link></li>
              <li><Link href="/recipes" className="underline underline-offset-4">모든 레시피 둘러보기 →</Link></li>
            </ul>
          </details>
        </div>
        <div id="dinner-recipe" className="scroll-mt-32 rounded-[1.5rem] border border-[#e5d5c3] bg-[#fffdf9] p-6 sm:p-8">
          <h3 className="text-lg font-black">이마트 장보기 목록 · {recipe.servings}인분</h3>
          {recipe.ingredientGroups.map((group, index) => (
            <div key={group.title} className="mt-4">
              {index > 0 && <h4 className="text-sm font-bold">{group.title}</h4>}
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-neutral-600">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
          <p className="mt-3 text-xs leading-6 text-neutral-500">구매는 포장 단위로, 조리는 표시된 사용량만큼 해주세요. 포장 크기와 재고는 매장마다 다릅니다.</p>
          <h4 className="mt-6 border-t border-stone-200 pt-5 font-black">오늘의 조리 순서</h4>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-7 text-neutral-700 marker:font-black marker:text-[#943706]">
            {recipe.steps.map((step) => <li key={step.title}><strong className="block">{step.title}</strong>{step.description}</li>)}
          </ol>
          <Link href={`/recipes/${recipe.slug}`} className="mt-5 inline-block text-sm font-bold !text-[#943706] underline underline-offset-4">대체 재료·조리 팁·출처까지 보기 →</Link>
        </div>
      </div>
    </section>
  );
}
