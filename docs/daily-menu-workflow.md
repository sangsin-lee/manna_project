# Daily dinner publishing

The thread heartbeat runs daily at 16:00 Asia/Seoul. It researches and publishes one dinner here, then verifies the existing Vercel deployment. It does not generate paid narration or upload to YouTube.

At the start, check available Codex usage. If ordinary usage is unavailable or any reported window has 10% or less remaining, preserve work and defer new research to the next scheduled run. Missing usage information is not zero remaining; keep the scope to one menu. Never spend or redeem credits automatically.

## Resume before selecting

Read `data/daily-menu-history.json` and the current Git state first. If `daily` already contains today's Korean date, resume that recipe's checks, commit, push or deployment verification. Do not select another recipe on a retry. Check the live homepage and recipe before treating a day as complete.

The immutable `baseline` records the 26 original recipes plus the previous rice-cake pizza recommendation. The earlier beef-and-bean-sprout bowl is recorded as an alias of the existing stir-fry. Preserve baseline records and all prior `daily` entries. Only append new dates.

## Content and duplicate review

Compare every earlier title, alias, core ingredient and cooking method, including the full recipe library, food narratives and relevant Git history. The automated check catches repeated dates, URLs and normalized names; an editorial review is still needed for semantic duplicates, renamed dishes and changes of sauce.

The user-requested regional collection in `lib/jeju-recipes.ts` is also part of the existing recipe library, not a new daily recommendation. Preserve it and include it in duplicate review. The `/korea` map reads `lib/korea-table.ts`. For future domestic recipes, set `domesticRegion` to the matching map region id, update that region's sourced specialties and recipeSlugs, and keep the map, recipe article and video theme connected. The nine map areas are culinary browsing groups, not an exhaustive administrative map. Keep harvest seasons distinct from year-round stored, frozen or processed products.

For a new date, save the selected dish in `daily` before proceeding. Record the canonical dish, aliases, ingredients, method, research links, duplicate review and recipe-specific preparation labels. Add its complete recipe in `lib/daily-recipes.ts` and a sourced three-part opening in `lib/recipe-narratives.ts`. Add the slug to its country's recipe list. The homepage reads the newest history entry; recipe, filming and video pages use the shared content.

Include purchase units versus amounts used, servings, total time, substitutions, verified cooking temperatures where relevant, and a practical filming idea. Never claim store availability, current prices, virality or view counts without evidence.

Prioritize a specific country's regional specialties and seasonal ingredients; rotate countries and regions across recent entries. Verify region, local ingredient and season with primary agricultural, producer or tourism sources. Distinguish local harvest season from Korean retail availability and cultivated year-round produce. Fill `recipe.localTable` (region, ingredient, season, note), cite sources, and explain the extent of a household adaptation. Do not invent a specific region of origin.

Extend the ingredient-led palette and illustrated cover in `lib/recipe-design.ts` for each new recipe. Patterns are visual interpretations of tiles, linen, grain, waves or contours, not authenticated traditional designs. The theme travels from recipe frames through video drafts to canvas preview and native-resolution export. Custom scenes inherit the loaded recipe theme. Keep warm covers and region/ingredient variation instead of a universal green background. Check text contrast and both landscape/portrait framing. Preserve original recipes and the user's unrelated documents.

## Verify and publish

Run targeted ESLint, `npm run check:daily-menu`, `npm run check:presentations`, `npm run check:video` and `npm run build`. Check the homepage, full recipe, food story and selected recipe in the video studio. Keep the 4K and optional-caption features intact.

Commit only intended changes, confirm remote main has no unseen commits, then push without force. Confirm the public homepage's date and recipe slug, the recipe content, and its video link before reporting success. If deployment fails, retain today's selection and resume it next time.

The full September 17 dinner remains at `/dinners/2026-09-17`; later dinners remain under `/recipes/<slug>` and in the homepage's previous-dinner list.

September 23, 2026: resumed after the usage deferral and selected one Swabian-inspired onion tart for the current Korean date. September 22 was not backfilled. The history distinguishes this yeast-dough savory tart from the existing onion soup and sweet egg tart. Regional and seasonal sources are shared in `lib/daily-sources.ts`; domestic retail availability is separate from Germany's supply calendar. A dedicated golden onion-tart cover and linen theme flow through the shared recipe and video design.
