import Link from "next/link";
import type { Recipe } from "@/lib/content";
import { getCountry, getStoriesBySlugs } from "@/lib/content";
import { recipeFrames } from "@/lib/presentation";
import { getRecipeNarrative, getRecipeSources } from "@/lib/recipe-narratives";
import PresentationPlayer from "./PresentationPlayer";
import RecipeCard from "./RecipeCard";

export default function RecipeArticle({ recipe, relatedRecipes }: { recipe: Recipe; relatedRecipes: Recipe[] }) {
  const country = getCountry(recipe.country);
  const stories = getStoriesBySlugs(recipe.relatedStorySlugs);
  const narrative = getRecipeNarrative(recipe);
  const sources = getRecipeSources(recipe);
  return (
    <div className="recipe-editorial">
      <article>
        <header className="recipe-cover">
          <div className="editorial-wrap">
            <nav className="recipe-breadcrumb" aria-label="현재 위치"><Link href="/">만나의 식탁</Link><span>/</span><Link href="/recipes">레시피</Link><span>/</span><span>{country?.nameKo}</span></nav>
            <div className="recipe-cover-grid">
              <div className="recipe-cover-copy">
                <p className="editorial-eyebrow"><span className="editorial-dot" /> THE RECIPE JOURNAL <span>— {country?.nameEn}</span></p>
                <h1>{recipe.title}</h1>
                <p className="recipe-cover-summary">{recipe.summary}</p>
                <div className="recipe-cover-actions"><PresentationPlayer key={recipe.slug} frames={recipeFrames(recipe)} title={recipe.title} /><Link className="manna-button manna-button-outline" href={`/videos/studio?recipe=${recipe.slug}`}>영상 만들기 <span>↗</span></Link><a className="manna-button manna-button-outline" href="#ingredients">재료부터 보기 <span>↗</span></a></div>
                <p className="recipe-screen-hint">유래 → 시대와 문화 → 맛과 식감 → 조리법, 한 장씩 크게 만나보세요.</p>
              </div>
              <aside className="recipe-note" aria-label="레시피 한눈에 보기">
                <div className="recipe-note-top"><span>MANNA TABLE</span><span>RECIPE NOTES</span></div>
                <div className="recipe-note-art" aria-hidden="true"><div className="plate-ring"><span>한 끼의<br /><em>이야기</em></span></div><span className="plate-sprig">✳</span></div>
                <dl className="recipe-facts"><div><dt>조리 시간</dt><dd>{recipe.cookingTime}<small>분</small></dd></div><div><dt>함께 먹을 인원</dt><dd>{recipe.servings}<small>인분</small></dd></div><div><dt>난이도</dt><dd className="fact-word">{recipe.difficulty}</dd></div></dl>
                <p className="recipe-note-bottom">{recipe.steps.length}개의 단계로 완성하는 한 접시</p>
              </aside>
            </div>
          </div>
        </header>
        <nav className="recipe-chapters" aria-label="레시피 페이지 목차"><div className="editorial-wrap">{[["culture", "01", "음식과 문화"], ["ingredients", "02", "준비할 재료"], ["method", "03", "만드는 순서"], ["notes", "04", "조리 메모"], ["sources", "05", "출처"]].map(([id, n, label]) => <a key={id} href={`#${id}`}><span>{n}</span>{label}</a>)}</div></nav>
        <section id="culture" className="recipe-culture editorial-section">
          <div className="editorial-wrap editorial-section-grid">
            <div><p className="editorial-eyebrow">01 / FOOD & CULTURE</p><h2>맛을 알면,<br />이야기가 보입니다.</h2><p className="section-caption">어디에서 시작해, 어떤 식탁을 거쳐,<br />오늘 어떤 맛으로 만나는지.</p></div>
            <div>
              {narrative && <div className="recipe-narrative">{narrative.chapters.map((chapter) => <section key={chapter.section} className="narrative-chapter"><p className="narrative-label">{chapter.section}</p><h3>{chapter.title}</h3><p className="narrative-body">{chapter.body}</p></section>)}</div>}
              <div className={narrative ? "narrative-adaptation" : undefined}>{narrative && <p className="narrative-label">이번 레시피</p>}<p className={narrative ? "narrative-body" : "culture-prose"}>{recipe.culturalNote}</p></div>
              <div className="culture-links">{country && <Link href={`/countries/${country.slug}`}>{country.nameKo}의 식탁 ↗</Link>}{stories[0] && <Link href={`/stories/${stories[0].slug}`}>문화 이야기 읽기 ↗</Link>}<a href="#sources">이야기의 출처 ↗</a></div>
            </div>
          </div>
        </section>
        <section id="ingredients" className="editorial-section recipe-ingredients"><div className="editorial-wrap editorial-section-grid"><div><p className="editorial-eyebrow">02 / ON THE COUNTER</p><h2>오늘의 준비물</h2><p className="section-caption">{recipe.servings}인분 기준<br />조리 전에 재료와 도구를 준비해 주세요.</p></div><div className="ingredient-columns">{recipe.ingredientGroups.map((group) => <section key={group.title} className="ingredient-group"><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}><span aria-hidden="true" className="ingredient-bullet" />{item}</li>)}</ul></section>)}</div></div></section>
        <section id="method" className="editorial-section recipe-method"><div className="editorial-wrap"><div className="method-heading"><div><p className="editorial-eyebrow">03 / LET’S COOK</p><h2>한 단계씩, 맛있게.</h2></div><span>{String(recipe.steps.length).padStart(2, "0")} STEPS</span></div><ol className="editorial-steps">{recipe.steps.map((step, index) => <li key={step.title}><span className="step-numeral">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p>{step.tip && <aside className="step-tip"><span>기억해 주세요</span><p>{step.tip}</p></aside>}</div></li>)}</ol></div></section>
        <section id="notes" className="editorial-section recipe-notes"><div className="editorial-wrap"><p className="editorial-eyebrow">04 / THE LITTLE DETAILS</p><h2>맛을 완성하는 작은 차이</h2><div className="recipe-notes-grid"><section><h3>우리 집 재료로</h3><ul>{recipe.substitutions.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h3>조리 메모</h3><ul>{recipe.tips.map((item) => <li key={item}>{item}</li>)}</ul></section></div><p className="food-care">알레르기 유발 성분과 제품별 보관·가열 지침을 확인하고, 생고기를 다룬 도구는 완성 음식과 구분해 사용하세요.</p></div></section>
        <section id="sources" className="editorial-section recipe-sources"><div className="editorial-wrap editorial-section-grid"><div><p className="editorial-eyebrow">05 / FURTHER READING</p><h2>이야기의 출처</h2><p className="section-caption">유래·문화와 조리 정보를 확인한 자료입니다.<br />맛과 식감은 이 레시피의 재료를 바탕으로 설명합니다.<br />등록일 {recipe.publishedAt}</p></div><ol>{sources.map((source, index) => <li key={source.url}><span>{String(index + 1).padStart(2, "0")}</span><a href={source.url} target="_blank" rel="noreferrer">{source.label}<span aria-hidden="true">↗</span></a></li>)}</ol></div></section>
      </article>
      <section className="editorial-section recipe-more"><div className="editorial-wrap"><div className="method-heading"><div><p className="editorial-eyebrow">NEXT ON YOUR TABLE</p><h2>다음 한 끼의 이야기</h2></div><Link href="/recipes#recipe-archive">전체 레시피 ↗</Link></div><div className="grid gap-6 md:grid-cols-3">{relatedRecipes.map((item) => <RecipeCard key={item.slug} recipe={item} />)}</div></div></section>
    </div>
  );
}
