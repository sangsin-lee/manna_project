import type { SpecialtyArt } from "@/lib/korea-table";

/** Original vector illustrations; decorative alongside a visible ingredient name. */
export default function SpecialtyIcon({ art, className = "" }: { art: SpecialtyArt; className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <ellipse cx="51" cy="85" rx="30" ry="5" fill="#45392c" opacity=".1" />
    {art === "oyster" && <g>
      <path d="M53 9c15-6 27 6 23 20 20 8 13 24 9 31 5 20-20 31-39 25-17 5-38-7-30-24-12-13-5-28 9-31C22 13 37 6 53 9Z" fill="#9daeb2" stroke="#687f88" strokeWidth="2"/>
      <path d="M53 18c18-8 19 11 15 19 22 10 14 32-8 37-24 8-40-4-36-24 4-18 11-23 29-32Z" fill="#f4ecd6"/>
      <path d="M53 32c-18-3-27 21-15 31 11 14 30 1 27-12-3-10-16-8-16-17" fill="#c1bba5" stroke="#929a8c" strokeWidth="3"/>
      <path d="m18 65 11-2m39 14 8-3M65 15l-4 7M23 32l8 6" stroke="#dce3df" strokeWidth="3" strokeLinecap="round"/>
    </g>}
    {art === "spinach" && <g>
      <path d="m45 81-7-28m9 27 11-29m-10 31 0-44" stroke="#af8176" strokeWidth="5" strokeLinecap="round"/>
      <path d="M39 62C6 56 8 21 25 9c29 9 31 37 14 53Z" fill="#829361" stroke="#5f754b" strokeWidth="2"/>
      <path d="M53 63c-10-30 4-47 26-45 14 21 6 47-26 45Z" fill="#70895a" stroke="#536d45" strokeWidth="2"/>
      <path d="M48 49C27 29 36 7 51 4c21 12 16 34-3 45Z" fill="#93a571" stroke="#627d4b" strokeWidth="2"/>
      <path d="M26 22 39 57m15-1 19-27M49 15v31m-17-4-10-4m39 8 14-1" stroke="#b3c192" strokeWidth="2" strokeLinecap="round"/>
    </g>}
    {art === "fig" && <g>
      <path d="M47 12C43 33 11 40 16 68c4 29 62 29 68 0 6-27-27-37-31-56Z" fill="#927080" stroke="#654c61" strokeWidth="2"/>
      <path d="M50 25C41 43 24 48 28 68c4 17 40 17 44 0 4-20-15-25-22-43Z" fill="#d297a5"/>
      {[[43,47],[56,48],[35,61],[49,59],[63,64],[44,72],[58,73]].map(([x,y])=><path key={x+y} d={`m${x} ${y} 1 4`} stroke="#f5d5ac" strokeWidth="2.5" strokeLinecap="round"/>)}
      <path d="M52 18q15-19 29-7-11 19-29 7Z" fill="#839166"/>
    </g>}
    {art === "octopus" && <g>
      <path d="M32 49C8 45 7 71 21 72c12 0 10-11 5-9m11-10C19 74 31 91 43 80m9-29c-5 17-1 38 13 32 10-5 2-13-3-9m-3-23c19 5 23 31 35 17 7-11-8-15-11-8" stroke="#aa8075" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="48" cy="33" rx="22" ry="28" fill="#b69283" stroke="#8f6a61" strokeWidth="2"/>
      <path d="M37 18q-9 10-4 22" stroke="#d8b9a4" strokeWidth="4" strokeLinecap="round"/>
      {[[21,72],[36,80],[65,81],[89,71]].map(([x,y])=><circle key={x} cx={x} cy={y} r="2.5" fill="#ead0bd"/>)}
    </g>}
    {art === "cockle" && <g>
      <path d="M49 82C-9 61 11 15 50 18c41-4 59 43-1 64Z" fill="#b99875" stroke="#806448" strokeWidth="2"/>
      <path d="M49 79 25 30m24 49L38 23m11 56 2-57m-2 57 17-54M49 79l29-40M49 79 18 45m31 34 34-24" stroke="#dfc5a1" strokeWidth="5" strokeLinecap="round"/>
      <path d="M39 80q11 9 22-1" stroke="#806448" strokeWidth="4" strokeLinecap="round"/>
    </g>}
    {art === "mushroom" && <g>
      <path d="M40 45 33 82q18 9 35 0L59 45Z" fill="#e7d7b7" stroke="#aa9070" strokeWidth="2"/>
      <path d="M12 49C13 5 86 5 88 49q-33 24-76 0Z" fill="#916d50" stroke="#654e3c" strokeWidth="2"/>
      <path d="m31 30 36 9m-12-20-12 28" stroke="#d9c4a4" strokeWidth="5" strokeLinecap="round"/>
      <path d="M23 51q26 14 54 0m-29 13-2 15" stroke="#c5ac88" strokeWidth="3" strokeLinecap="round"/>
    </g>}
    {art === "jujube" && <g>
      {[[35,54,-28],[67,54,20]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="21" ry="30" fill="#a15842" stroke="#723e32" strokeWidth="2"/><path d="M-9-18q-8 12-5 27" stroke="#d68b66" strokeWidth="4" strokeLinecap="round"/><path d="M0-28v-10" stroke="#72553a" strokeWidth="3"/></g>)}
      <path d="M49 23Q65 4 81 18 68 34 49 23Z" fill="#819165"/>
    </g>}
    {art === "garlic" && <g>
      <path d="M46 12h9l1 20c26 10 32 28 21 43-13 18-47 16-57 0-11-18 0-35 23-43Z" fill="#f2e7ce" stroke="#a7957a" strokeWidth="2"/>
      <path d="M48 32Q27 55 35 81m18-49q22 25 10 49M50 34v50" stroke="#c3b59a" strokeWidth="2"/>
      <path d="m39 84-5 8m15-7v9m10-10 6 7" stroke="#a7957a" strokeWidth="2" strokeLinecap="round"/>
    </g>}
    {art === "cabbage" && <g>
      <path d="M35 84C3 67 12 31 28 32 20 4 47 8 51 25 67 1 88 20 77 36 99 42 86 74 66 85Z" fill="#9da875" stroke="#738451" strokeWidth="2"/>
      <path d="M40 85C27 66 28 36 43 28c8-9 20-1 19 9 18 13 13 34-2 49Z" fill="#d9dcb1" stroke="#a7b17e" strokeWidth="2"/>
      <path d="m49 82 1-48m-1 34L34 50m17 8 13-14m-11 32 15-14" stroke="#f9f1d8" strokeWidth="5" strokeLinecap="round"/>
    </g>}
    {art === "shrimp" && <g transform="rotate(-15 50 50)">
      <path d="M66 26C35 9 9 34 19 62c8 23 39 30 56 10L59 59C48 72 31 60 35 47c4-12 17-11 23-5Z" fill="#e69b80" stroke="#af6753" strokeWidth="2"/>
      <path d="m65 26 17-7-8 24-16-1Z" fill="#dc896d" stroke="#af6753" strokeWidth="2"/>
      <path d="m61 58 21-3-8 18Z" fill="#c97861" stroke="#af6753" strokeWidth="2"/>
      <path d="m27 29 9 13m-18 2 15 5m-13 13 16-5m-6 20 10-13m5 18 4-15M76 24q15-16 19-7M77 27q20-4 18 8" stroke="#a56852" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="71" cy="29" r="2.5" fill="#493c33"/>
    </g>}
    {art === "ginger" && <g transform="rotate(-15 50 50)">
      <path d="M29 79q-13-4-6-17l15-16-5-18q-2-12 10-12 9 0 10 12l2 14 11-8q13-8 19 3 5 10-7 16L60 65l-3 16q-5 13-16 5l-2-10Z" fill="#d7b87c" stroke="#987548" strokeWidth="2"/>
      <path d="m38 32 13-2m-12 9 14-3m-18 23 11 8m19-21 6 10m-24 18 10 1" stroke="#b38d56" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="76" cy="77" rx="15" ry="11" fill="#f1dba1" stroke="#c5a16b" strokeWidth="3"/><ellipse cx="76" cy="77" rx="9" ry="6" stroke="#dcc58c"/>
    </g>}
    {art === "buckwheat" && <g>
      <path d="m43 85 8-65m-4 34L26 35m23 7 20-15m-25 43 25-13" stroke="#8c8c64" strokeWidth="3" strokeLinecap="round"/>
      {[[51,22],[26,35],[71,27]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}>{[0,72,144,216,288].map(r=><ellipse key={r} cy="-6" rx="5" ry="7" fill="#fff8e7" stroke="#c4b79a" transform={`rotate(${r})`}/>)}<circle r="3" fill="#c8a866"/></g>)}
      {[[67,57],[30,70],[58,77]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0-10 10 8H-10Z" fill="#8f7258" stroke="#654f40" strokeWidth="1.5"/><path d="M0-10V8" stroke="#ccb898" strokeWidth="2"/></g>)}
    </g>}
    {art === "deodeok" && <g transform="rotate(18 50 50)">
      <path d="M45 23q-17 14-13 39l9 17 2 10 7-13 11-6q10-30-1-47Z" fill="#c6aa81" stroke="#927551" strokeWidth="2"/>
      <path d="m45 29-3 24 6 19m7-43-4 24 4 11M37 43l20 2m-23 10 23 1m-18 8 16 1m-22-14-9 6m37-16 11 3m-13 20 9 8" stroke="#977b55" strokeWidth="2" strokeLinecap="round"/>
      <path d="M51 26V10m0 9q-21-15-24-1 11 11 24 1m0-3q14-16 23-5-7 12-23 5" stroke="#77825e" strokeWidth="3" strokeLinecap="round" fill="#97a078"/>
    </g>}
    {art === "corn" && <g transform="rotate(15 50 50)">
      <path d="M33 66V35c0-31 34-31 34 0v31Z" fill="#ead6a0" stroke="#af995f" strokeWidth="2"/>
      {Array.from({length:6},(_,row)=>[0,1,2].map(col=><rect key={`${row}-${col}`} x={37+col*9} y={21+row*7} width="7" height="6" rx="2.5" fill={(row+col)%3===0?"#dfc483":"#fff0c7"}/>))}
      <path d="M49 84C24 76 14 54 22 36q28 16 27 48Z" fill="#9ba47a" stroke="#6f7f55" strokeWidth="2"/><path d="M49 84c27-8 34-29 28-49Q55 49 49 84Z" fill="#798c63" stroke="#5b714d" strokeWidth="2"/><path d="m29 49 18 29m24-28L53 78" stroke="#bec79b" strokeWidth="2"/>
    </g>}
    {art === "sweet-potato" && <g transform="rotate(-28 50 50)"><path d="M12 52C17 24 70 19 88 48 74 77 22 85 12 52Z" fill="#985d75" stroke="#663d50" strokeWidth="2"/><path d="m25 45 7-4m21 18 7-4m7-20 5 2" stroke="#c38b9a" strokeWidth="3" strokeLinecap="round"/><ellipse cx="29" cy="60" rx="18" ry="24" fill="#d2a04e" stroke="#985d75" strokeWidth="5"/><ellipse cx="29" cy="60" rx="11" ry="18" fill="#f1d38b"/></g>}
    {art === "pear" && <g><path d="M48 28q-2-12 7-18" stroke="#705235" strokeWidth="4" strokeLinecap="round"/><path d="M52 22Q63 6 79 18 67 32 52 22Z" fill="#85916a"/><path d="M49 30C17 18 8 45 18 69c10 26 54 27 66-1C96 41 79 19 49 30Z" fill="#cfac61" stroke="#947845" strokeWidth="2"/><path d="M28 42q-7 12-2 23" stroke="#efdaa0" strokeWidth="5" strokeLinecap="round"/>{[[38,42],[62,39],[74,52],[38,71],[65,73],[51,57],[24,55]].map(([x,y])=><circle key={x+y} cx={x} cy={y} r="1.5" fill="#a38851"/>)}</g>}
    {art === "pine-nut" && <g><path d="M46 15C22 22 19 62 45 79c26-20 24-54 1-64Z" fill="#946c4c" stroke="#644c37" strokeWidth="2"/><path d="m34 32 12 7 12-7m-28 13 16 8 16-8m-29 13 13 8 14-8M46 22v52" stroke="#c3a178" strokeWidth="3" strokeLinecap="round"/>{[[71,55,-22],[68,76,28],[27,78,-52]].map(([x,y,r])=><path key={x} transform={`translate(${x} ${y}) rotate(${r})`} d="M0-14C-12-3-8 13 0 15 8 13 12-3 0-14Z" fill="#f2e1b4" stroke="#b99c6e" strokeWidth="1.5"/>)}</g>}
    {art === "soybean" && <g transform="rotate(22 50 50)"><path d="M47 15C16 27 23 81 55 87 79 67 74 27 47 15Z" fill="#b6aa71" stroke="#7f8153" strokeWidth="2"/><path d="M49 20q-15 30 5 61" stroke="#e4d8a0" strokeWidth="3"/>{[[43,34],[44,54],[54,73]].map(([x,y])=><ellipse key={y} cx={x} cy={y} rx="10" ry="9" fill="#e8d4a1" stroke="#b1a16d" strokeWidth="1.5"/>)}<ellipse cx="77" cy="68" rx="10" ry="9" fill="#ead9ac" stroke="#ae9666" strokeWidth="1.5"/><path d="m76 65 1 5" stroke="#bba374" strokeWidth="2" strokeLinecap="round"/></g>}
    {art === "citrus" && <g><path d="M49 31q-5-13 5-21" stroke="#594b31" strokeWidth="4" strokeLinecap="round"/><path d="M52 23Q62 3 84 17 70 33 52 23" fill="#668463"/><path d="M51 33C16 14 9 48 22 73c10 22 48 22 60-1 13-28-2-51-31-39Z" fill="#ef9e34" stroke="#a66026" strokeWidth="2"/><path d="M49 40q-15 20-6 40M60 41q11 16 6 34" stroke="#f8c36e" strokeWidth="3" strokeLinecap="round"/><path d="m31 51 1 1m-2 11 1 1m46-7 1 1m-5 16 1 1" stroke="#b77128" strokeWidth="2" strokeLinecap="round"/></g>}
    {art === "rice" && <g><path d="M48 82 55 16M35 77 26 31" stroke="#8c7947" strokeWidth="3" strokeLinecap="round"/>{[0,1,2,3].map(i=><g key={i}><ellipse cx={48+i*1.5} cy={30+i*12} rx="6" ry="10" transform={`rotate(-35 ${48+i*1.5} ${30+i*12})`} fill="#d9b965"/><ellipse cx={63-i*1.5} cy={27+i*12} rx="6" ry="10" transform={`rotate(40 ${63-i*1.5} ${27+i*12})`} fill="#e8d49a"/></g>)}<path d="M19 63h62q-3 23-31 24T19 63" fill="#fff8e6" stroke="#8c7947" strokeWidth="2"/><ellipse cx="50" cy="62" rx="31" ry="9" fill="#f4e4bc"/></g>}
    {art === "potato" && <g transform="rotate(-20 50 50)"><path d="M19 32q20-21 43-7 32 0 22 33-2 29-36 25C18 88 4 57 19 32Z" fill="#c9a172" stroke="#886a47" strokeWidth="2"/><path d="m31 40 3 2m29-7 3 1m-5 28 3-2m-34 6 4 1m11-18 3 2" stroke="#846445" strokeWidth="3" strokeLinecap="round"/><path d="M37 28q-8 1-14 10" stroke="#e1bd8d" strokeWidth="5" strokeLinecap="round"/></g>}
    {(art === "grape" || art === "berry") && <g><path d="M48 29q3-13 10-18" stroke="#5e5134" strokeWidth="4"/><path d="M50 28 22 16l5 16 18 5Z" fill="#728463"/>{[[35,39],[56,37],[70,50],[27,56],[47,56],[35,73],[59,74],[47,85]].map(([x,y],i)=><circle key={i} cx={x} cy={y-5} r={art === "berry" ? 13 : 12} fill={i%2 ? "#805071" : "#613e62"} stroke="#ead9e6" strokeWidth="1.5"/>)}<path d="m31 30 4-2m21-1 4 2m-18 19 4-1" stroke="#c3a0be" strokeWidth="3" strokeLinecap="round"/></g>}
    {art === "chestnut" && <g><path d="M50 16C38 33 11 45 17 66c8 33 66 25 68-1C87 42 65 35 50 16Z" fill="#905c3b" stroke="#5a3e2b" strokeWidth="2"/><path d="M17 64q34-18 67 0c-3 31-62 33-67 0Z" fill="#d6b788"/><path d="m32 70 5 1m15 3 5 0m12-4 3-1" stroke="#af8a5c" strokeWidth="2" strokeLinecap="round"/><path d="M30 44q6-9 13-12" stroke="#b68555" strokeWidth="4" strokeLinecap="round"/></g>}
    {art === "apple" && <g><path d="M50 33V14" stroke="#674c33" strokeWidth="4"/><path d="M54 24Q65 6 83 19 70 32 54 24" fill="#70825a"/><path d="M50 34C21 14 9 42 20 66s24 24 31 18c13 12 30-5 34-28 5-26-16-40-35-22Z" fill="#c66b56" stroke="#8f493d" strokeWidth="2"/><path d="M29 39q-9 9-5 23" stroke="#edaa83" strokeWidth="5" strokeLinecap="round"/></g>}
    {art === "persimmon" && <g><path d="M49 31C7 13 7 64 27 79c12 10 40 13 53-5 17-26 4-55-31-43Z" fill="#df8c43" stroke="#a76b34" strokeWidth="2"/><path d="m49 21 7 9 14-3-7 10 8 9-18-7-15 8 2-13-13-6 17 1Z" fill="#637d51"/><path d="M28 44q-5 12 1 20" stroke="#f5b96b" strokeWidth="4" strokeLinecap="round"/></g>}
    {art === "fish" && <g transform="rotate(-25 50 50)"><path d="M17 51Q49 12 78 49L94 32v35L79 54Q46 89 17 51Z" fill="#a9c4c7" stroke="#486b74" strokeWidth="2"/><path d="M39 31q18-14 24-5l4 8M40 69l16 9 7-11" fill="#789ea8"/><path d="M33 37q10 14 0 27m18-20 5 7-5 7m12-14 5 7-5 7" stroke="#62858c" strokeWidth="2"/><circle cx="27" cy="48" r="3" fill="#2d4a55"/></g>}
    {art === "fern" && <g stroke="#5a7854" strokeWidth="4" strokeLinecap="round"><path d="M45 86V31q0-22 17-17c14 4 10 22-1 19-5-2-5-7-2-10M41 65 25 51M42 53 29 41M50 61l19-17M50 73l18-11"/><path d="m31 75-13-7m41-26 8-6"/></g>}
    {art === "pork" && <g><ellipse cx="49" cy="56" rx="33" ry="24" fill="#575450"/><path d="m24 40 4-17 15 12m22 1 16-11-2 24" fill="#575450"/><ellipse cx="34" cy="59" rx="16" ry="11" fill="#bfa69a"/><circle cx="30" cy="59" r="2.5" fill="#575450"/><circle cx="39" cy="59" r="2.5" fill="#575450"/><circle cx="44" cy="45" r="2.5" fill="#fff8e6"/><path d="M28 72v10m40-11v11m14-26q15-2 9-10" stroke="#575450" strokeWidth="6" strokeLinecap="round"/></g>}
  </svg>;
}
