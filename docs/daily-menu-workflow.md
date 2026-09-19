# Daily dinner publishing

The thread heartbeat runs daily at 16:00 Asia/Seoul. It researches and publishes one dinner here, then verifies the existing Vercel deployment. It does not generate paid narration or upload to YouTube.

## Resume before selecting

Read `data/daily-menu-history.json` and the current Git state first. If `daily` already contains today's Korean date, resume that recipe's checks, commit, push or deployment verification. Do not select another recipe on a retry. Check the live homepage and recipe before treating a day as complete.

The immutable `baseline` records the 26 original recipes plus the previous rice-cake pizza recommendation. The earlier beef-and-bean-sprout bowl is recorded as an alias of the existing stir-fry. Preserve baseline records and all prior `daily` entries. Only append new dates.

## Content and duplicate review

Compare every earlier title, alias, core ingredient and cooking method, including the full recipe library, food narratives and relevant Git history. The automated check catches repeated dates, URLs and normalized names; an editorial review is still needed for semantic duplicates, renamed dishes and changes of sauce.

For a new date, save the selected dish in `daily` before proceeding. Record the canonical dish, aliases, ingredients, method, research links, duplicate review and recipe-specific preparation labels. Add its complete recipe in `lib/daily-recipes.ts` and a sourced three-part opening in `lib/recipe-narratives.ts`. Add the slug to its country's recipe list. The homepage reads the newest history entry; recipe, filming and video pages use the shared content.

Include purchase units versus amounts used, servings, total time, substitutions, verified cooking temperatures where relevant, and a practical filming idea. Never claim store availability, current prices, virality or view counts without evidence.

## Verify and publish

Run targeted ESLint, `npm run check:daily-menu`, `npm run check:presentations`, `npm run check:video` and `npm run build`. Check the homepage, full recipe, food story and selected recipe in the video studio. Keep the 4K and optional-caption features intact.

Commit only intended changes, confirm remote main has no unseen commits, then push without force. Confirm the public homepage's date and recipe slug, the recipe content, and its video link before reporting success. If deployment fails, retain today's selection and resume it next time.

The full September 17 dinner remains at `/dinners/2026-09-17`; later dinners remain under `/recipes/<slug>` and in the homepage's previous-dinner list.
