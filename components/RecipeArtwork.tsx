import type { RecipeDesign } from "@/lib/recipe-design";

export default function RecipeArtwork({ design, label, compact = false }: { design: RecipeDesign; label: string; compact?: boolean }) {
  const { art, ink, accent, to } = design;
  return (
    <div className={`recipe-artwork${compact ? " is-compact" : ""}`} data-pattern={design.pattern}>
      <div className="artwork-heading"><span>{design.place}</span><span>MANNA / TABLE</span></div>
      <svg viewBox="0 0 600 380" fill="none" aria-hidden="true" className="dish-illustration">
        <ellipse cx="305" cy="320" rx="185" ry="22" fill={ink} opacity=".09" />
        <circle cx="300" cy="186" r="151" fill="#fffaf0" fillOpacity=".75" stroke={ink} strokeOpacity=".3" />
        <circle cx="300" cy="186" r="132" stroke={ink} strokeOpacity=".18" />
        <circle cx="300" cy="186" r="117" fill={to} fillOpacity=".18" />


        {art === "pumpkin-risotto" && <g>
          <path d="M191 184q-4-72 73-96 70-20 125 47 48 63-13 126-66 57-137 14-48-29-48-91Z" fill="#dca248" stroke="#f0c870" strokeWidth="6"/>
          <path d="M211 173q-4-41 42-62m111 19q26 27 28 55m-33 76q-36 22-69 14m-54-23-17-28" stroke="#efc56c" strokeWidth="8" strokeLinecap="round"/>
          {Array.from({ length: 68 }, (_, i) => {
            const angle = i * 2.39996;
            const radius = 102 * Math.sqrt((i + 1) / 69);
            const x = 300 + Math.cos(angle) * radius;
            const y = 185 + Math.sin(angle) * radius * .88;
            return <ellipse key={i} cx={x} cy={y} rx="6.5" ry="2.8" transform={`rotate(${i * 37} ${x} ${y})`} fill={i % 3 ? "#f7d992" : "#bb7e35"} opacity={i % 3 ? ".92" : ".55"}/>;
          })}
          {[[241,139,-18],[335,117,20],[368,217,-12],[282,251,12],[218,211,-25]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="m-15-13 23-4 12 20-26 10-15-14Z" fill="#de8536" stroke="#b9742f" strokeWidth="2"/>
            <path d="m-15-13 21-2 8 10-25 5Z" fill="#f2b856"/>
            <path d="m-11 0 4 13 27-10-6-8Z" fill="#e99c40"/>
          </g>)}
          {[[286,120],[228,178],[313,209],[351,170],[334,262],[266,217]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}>
            <path d="M-10-7q5-8 13-3l9 6-3 10-13 4-9-9Z" fill="#8d593a" stroke="#724b33" strokeWidth="2"/>
            <path d="m-6-4 6-1m3 5 3 2m-9 2 1 2" stroke="#bd8a55" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          <path d="m274 162 18-8 11 9-20 8Zm51 72 17-4 9 7-19 5Zm-64-34 12-9 9 4-12 9Z" fill="#fff0ca"/>
          <path d="m282 149 8-5m-25 92 8-4m85-88 7 4m-45 122 7 3m-53-86 7 2m59 15 8-3" stroke="#788052" strokeWidth="4" strokeLinecap="round"/>
          <path d="M444 249q13 10 0 24L402 321" stroke="#6e6660" strokeWidth="9" strokeLinecap="round"/>
          <ellipse cx="452" cy="240" rx="15" ry="24" transform="rotate(38 452 240)" fill="#b7aea0" stroke="#7e756b" strokeWidth="3"/>
          <path d="m445 228 8-7" stroke="#e6dfd0" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {art === "crab-curry" && <g>
          <ellipse cx="300" cy="189" rx="118" ry="108" fill="#d3a243" stroke="#e8c875" strokeWidth="5"/>
          <path d="M219 204q-28-26-5-49t58-18 46-25 58 38-8 47 11 45-61 31-54-10-45-59Z" fill="#e7bd60"/>
          <path d="M235 210q-22-21-14-41m56-35q23-13 40-9m47 96q-8 26-32 28m-61 0-19-8" stroke="#f6d990" strokeWidth="7" strokeLinecap="round"/>
          {[[258,157,-25],[330,224,30]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="m-31-4-27-17-14 8m38 23-30-3-14 21m48-2-27 9-2 22m83-43 26-17 15 8m-39 21 30-3 14 21m-48-2 27 9 2 22" stroke="#b75a3b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M-41 12q-3-40 14-49 31-14 52 0 22 16 16 49Z" fill="#d87a48" stroke="#a74c31" strokeWidth="3"/>
            <path d="M-30 2q0-25 22-31m16-3q12 2 19 15" stroke="#efaa6e" strokeWidth="5" strokeLinecap="round"/>
            <path d="M-40 12h81l-7 16-60 3Z" fill="#f2dcc1" stroke="#b6754f" strokeWidth="3"/>
            <path d="m-21 18 1 10m12-12 2 14m12-14 2 12m11-13 3 11" stroke="#d2b393" strokeWidth="3"/>
          </g>)}
          {[[376,140,30],[216,255,-28]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-9 32-15 9q-18-17-8-34l13 14 3-25q22 10 25 29L8 18 9 33Z" fill="#da8051" stroke="#a95136" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M-10 2q8 8 15 3m-2 16 1 8" stroke="#f1b079" strokeWidth="4" strokeLinecap="round"/>
          </g>)}
          {[[288,103,-18],[201,184,30],[389,226,25],[273,274,-20]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M0 16V-17m0 10q-22-21-22-3 1 15 22 13m0-4q22-20 22-3-1 16-22 13" stroke="#6d8549" strokeWidth="3" fill="#819b56" strokeLinecap="round"/>
          </g>)}
          <path d="M319 114q15 3 24 15m-103 85q12 13 28 12m84 48q16-4 22-15" stroke="#bd4d32" strokeWidth="7" strokeLinecap="round"/>
          <path d="m287 189 10 5m-7 35 10-4m19-48 8 2m-94 54 9 1" stroke="#f7e1a1" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "imoni" && <g>
          <path d="M177 174h-35q-17 0-17 16t17 16h35m246-32h35q17 0 17 16t-17 16h-35" stroke="#586d78" strokeWidth="12"/>
          <circle cx="300" cy="186" r="128" fill="#718c9a" stroke="#495f6c" strokeWidth="6"/>
          <circle cx="300" cy="186" r="113" fill="#ab7954" stroke="#d4b083" strokeWidth="5"/>
          <path d="M203 168q5-37 34-51m108 151q26-13 38-43" stroke="#e6c393" strokeWidth="5" strokeLinecap="round"/>
          {[[253,115,-15],[355,174,25],[262,245,-25],[357,245,20]].map(([x,y,r])=><g key={x+":"+y} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-25-13q4-14 18-12l29 10q13 9 7 20l-22 10q-13 3-22-7Z" fill="#8a6253" stroke="#62483c" strokeWidth="2"/>
            <path d="M-18-8q10 4 22 1t18 9m-27 9 9-5" stroke="#c59a7e" strokeWidth="4" strokeLinecap="round"/>
          </g>)}
          {[[211,191,-15],[322,111,18],[331,256,-20]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-17-13 12-17 24-2 14 20-14 14-23 0Z" fill="#b4aaa1" stroke="#8c8078" strokeWidth="3"/>
            <path d="m-9-5 1 1m12-4 1 1m6 10 1 1m-14 3 1 1m-9-2 1 1" stroke="#72675f" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          {[[263,159,-18],[345,209,22],[264,265,-12],[372,137,15]].map(([x,y,r])=><g key={x+":"+y} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-25-8q0-23 22-24 27-2 30 21l-3 24q-8 18-27 17-24-2-24-24Z" fill="#e9d9bc" stroke="#c3a77f" strokeWidth="3"/>
            <path d="M-17-6q-1-17 17-19" stroke="#fff1d7" strokeWidth="6" strokeLinecap="round"/>
            <path d="m-12 11 3 5m19-2 3-5" stroke="#cbb08b" strokeWidth="2" strokeLinecap="round"/>
          </g>)}
          {[[224,138,-35],[312,181,30],[312,281,-30],[384,221,35]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-8-18h16v34q-8 7-16 0Z" fill="#d5d8b0" stroke="#8b9d74" strokeWidth="2"/>
            <ellipse cy="-18" rx="8" ry="5" fill="#f1eaca" stroke="#8b9d74" strokeWidth="2"/>
            <path d="M-3-9v22m6-24v20" stroke="#b0bc8f" strokeWidth="2"/>
          </g>)}
          <path d="M265 42q-10-12 0-26m35 27q-10-12 0-26m35 32q-10-12 0-26" stroke="#f9edda" strokeWidth="4" strokeLinecap="round" opacity=".9"/>
        </g>}
        {art === "sundae-bokkeum" && <g>
          <path d="M168 172h-28q-15 0-15 15t15 15h28m264-30h28q15 0 15 15t-15 15h-28" stroke="#51433e" strokeWidth="12"/>
          <circle cx="300" cy="186" r="128" fill="#55423a" stroke="#352f2d" strokeWidth="7"/>
          <circle cx="300" cy="186" r="115" fill="#b66549" stroke="#d19770" strokeWidth="3"/>
          <path d="M214 197q-14-55 48-61t85 56-79 15 20 56 89-51m-156-52q36-44 82-17t10 67-65 13 24-29 60 20" stroke="#e6b47c" strokeWidth="6" strokeLinecap="round"/>
          {[[221,147,-25],[356,135,30],[340,245,-15],[244,247,25]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-23-14 14-18 26 13-15 22Z" fill="#d9c78f" stroke="#f0dfaf" strokeWidth="3"/>
            <path d="m-16-8 31 17m-30-2 14 8m-2-26 7 8" stroke="#b9af73" strokeWidth="2"/>
          </g>)}
          {[[254,119,-24],[327,145,18],[220,202,-20],[300,214,26],[375,198,-18],[297,275,-25]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse cy="7" rx="26" ry="22" fill="#463332"/>
            <ellipse rx="26" ry="22" fill="#67504b" stroke="#392d2c" strokeWidth="4"/>
            <path d="m-15-7 9-5m8-1 10 5m-24 7 8 6m7-2 9-5m-12 10 5 3" stroke="#bb9681" strokeWidth="3" strokeLinecap="round"/>
            <path d="m-10-15 7-2m18 8 4 6" stroke="#a97c65" strokeWidth="2" strokeLinecap="round"/>
          </g>)}
          {[[287,103,-25],[248,220,30],[357,260,-18]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M0-29Q-30-12-21 8L0 27 21 8Q30-12 0-29Z" fill="#6e8151" stroke="#4b623c" strokeWidth="2"/>
            <path d="M0-20v42m0-11-12-10M0-1l13-11m-13 4-10-8" stroke="#a6b17b" strokeWidth="2"/>
          </g>)}
          <path d="m273 166 6 2m64 35 5-3m-112 30 6 2m46 3 5-2m-17-87 6 3m57 92 6 2" stroke="#efcba1" strokeWidth="3" strokeLinecap="round"/>
          <path d="M264 47q-9-11 1-23m31 20q-8-12 2-24m33 30q-8-11 1-22" stroke="#fff4dc" strokeWidth="4" strokeLinecap="round" opacity=".85"/>
        </g>}
        {art === "bread-dumplings" && <g>
          <ellipse cx="300" cy="195" rx="116" ry="99" fill="#ccb28e" stroke="#b49a78" strokeWidth="2"/>
          <path d="M208 198q-5-40 32-60m98 128q32-9 47-44" stroke="#f0ddba" strokeWidth="6" strokeLinecap="round"/>
          {[[248,144,41],[338,163,40],[290,234,43]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y})`}>
            <ellipse cy="6" rx={r+2} ry={r-1} fill="#a8885f" opacity=".25"/>
            <circle r={r} fill="#dfc795" stroke="#b89662" strokeWidth="3"/>
            <path d={`M${-r+11} 1q-1-${r-13} ${r-3}-${r-13}`} stroke="#f4e3b8" strokeWidth="6" strokeLinecap="round"/>
            <path d="m-16-8 8-4m16-7 7 4m-27 30 8 4m18-12 7-4" stroke="#b39763" strokeWidth="4" strokeLinecap="round"/>
            <path d="m-4-21 5 4m-17 22 5-2m21 15 5-3" stroke="#7c8860" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          {[[212,208,-22],[305,105,24],[377,214,28],[237,264,-32],[359,265,22]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-6-1h12l5 24h-22Z" fill="#e0c9a2" stroke="#a88a67" strokeWidth="2"/>
            <path d="M-23 1q-3-27 23-27t23 27Z" fill="#a98766" stroke="#87694f" strokeWidth="2"/>
            <path d="M-15-8q5-12 18-10" stroke="#cfb28b" strokeWidth="4" strokeLinecap="round"/>
            <path d="m-15 1 9 8m5-8 1 11m7-11 9 5" stroke="#b79a78" strokeWidth="2"/>
          </g>)}
          <g transform="translate(406 290) rotate(18)">
            <path d="M-28-12q-8-37 27-40 32 3 28 36l-8 29-43-1Z" fill="#d4b77f" stroke="#ad8c57" strokeWidth="3"/>
            <ellipse rx="28" ry="25" fill="#f0dfb3" stroke="#b79b69" strokeWidth="3"/>
            <path d="m-14-9 7-5m12-1 9 5m-20 18 8 4m11-5 5-6" stroke="#c3a472" strokeWidth="5" strokeLinecap="round"/>
            <path d="m-5-3 4 2m-15 13 5-3m17-18 3 4" stroke="#829066" strokeWidth="3" strokeLinecap="round"/>
          </g>
          <path d="m314 198 8-3m-92-26 6 3m88 73 7 3m43-65 6-4" stroke="#78865b" strokeWidth="3" strokeLinecap="round"/>
        </g>}
        {art === "lotus-rib-soup" && <g>
          <circle cx="300" cy="186" r="119" fill="#8399a6" stroke="#596f7e" strokeWidth="3"/>
          <circle cx="300" cy="186" r="106" fill="#d4b7a8" stroke="#ebd6c2" strokeWidth="5"/>
          <path d="M209 172q-1-37 37-56m101 143q28-11 39-42" stroke="#f4e1c9" strokeWidth="5" strokeLinecap="round"/>
          {[[285,130,-18],[352,191,25],[259,235,-22]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-30-16q2-15 24-16l27 4q15 9 13 25l-5 22q-10 13-32 9l-25-10Z" fill="#ab8070" stroke="#835f52" strokeWidth="3"/>
            <path d="M-23-9q20-11 44 1m-43 16q15 10 35 5" stroke="#c9a28d" strokeWidth="5" strokeLinecap="round"/>
            <path d="m-5-20 12 2 1 37-12 2Z" fill="#f0dec9" stroke="#d1b69e" strokeWidth="2"/>
            <ellipse cx="2" cy="19" rx="8" ry="5" fill="#f4e5ce" stroke="#d1b69e" strokeWidth="2"/>
          </g>)}
          {[[235,165,-22],[337,119,28],[304,205,15],[349,259,-30]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse cy="6" rx="31" ry="26" fill="#caa99e" stroke="#aa8a83" strokeWidth="2"/>
            <ellipse rx="31" ry="26" fill="#f0dccb" stroke="#bc9990" strokeWidth="2"/>
            {[[0,-14],[15,-9],[17,7],[0,15],[-16,8],[-15,-9]].map(([hx,hy])=><ellipse key={`${hx}-${hy}`} cx={hx} cy={hy} rx="5" ry="7" transform={`rotate(${hx*2} ${hx} ${hy})`} fill="#bf9a8d"/>)}
            <ellipse rx="4" ry="5" fill="#caa596"/>
            <path d="M-21-15q5-6 11-7" stroke="#fff1df" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          <path d="m270 178 10-5m51-17 9 3m-24 80 10-3m-97-31 8 3" stroke="#778d75" strokeWidth="4" strokeLinecap="round"/>
          <g transform="translate(431 274)">
            <path d="M-47-5q3 46 47 48T47-5Z" fill="#a1b4bd" stroke="#657f8e" strokeWidth="3"/>
            <ellipse cy="-5" rx="47" ry="22" fill="#e3d4bc" stroke="#657f8e" strokeWidth="3"/>
            <path d="M-40-7q3-17 20-16 7-16 24-12 15-7 25 9 14 3 12 19-33 22-81 0Z" fill="#fff3dd"/>
            <path d="m-22-12 7-3m17-9 7 2m13 9 6 3m-37 7 8 2m20-1 6-2" stroke="#d8c7aa" strokeWidth="3" strokeLinecap="round"/>
          </g>
          <path d="M268 69q-10-12 0-26m42 22q-8-12 2-27m34 37q-8-12 2-25" stroke="#fdf6e9" strokeWidth="4" strokeLinecap="round" opacity=".8"/>
        </g>}
        {art === "apple-cream-chicken" && <g>
          <ellipse cx="300" cy="191" rx="112" ry="97" fill="#ecd5ae" stroke="#d4b78c" strokeWidth="3"/>
          <path d="M211 182q14-53 63-59m-42 129q58 45 118 2" stroke="#fff0d1" strokeWidth="8" strokeLinecap="round"/>
          {[[264,144,-18],[335,164,21],[273,226,15],[352,230,-24]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-32-17q5-20 29-16 23-6 34 12 10 16-3 31-9 18-36 13-26 2-28-16-8-14 4-24Z" fill="#c49361" stroke="#9c6b43" strokeWidth="3"/>
            <path d="M-23-12q22-15 45 1m-47 12q23 13 44 2" stroke="#e4bd83" strokeWidth="5" strokeLinecap="round"/>
            <path d="m-19-3 12-6m16 11 13-5m-24 19 9-3" stroke="#ab7444" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          {[[216,204,-25],[300,103,70],[386,186,160],[309,278,90]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-13-32Q-43 6-8 35 15 38 23 27 1 7-13-32Z" fill="#b76251" stroke="#934738" strokeWidth="2"/>
            <path d="M-11-24Q-31 6-5 29 6 29 14 25-1 6-11-24Z" fill="#f0cd8d"/>
            <path d="M-14-8q-7 18 9 26" stroke="#d6a265" strokeWidth="4" strokeLinecap="round"/>
          </g>)}
          {[[232,114,-30],[308,195,30],[236,268,20],[372,132,30]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-6-1h12l5 21h-22Z" fill="#d6bd93" stroke="#aa8b68" strokeWidth="2"/>
            <path d="M-20 1q-3-24 20-24t20 24Z" fill="#c3a17b" stroke="#997553" strokeWidth="2"/>
            <path d="M-13-7q4-11 17-10" stroke="#edcfaa" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          <g transform="translate(409 285) rotate(28)"><path d="M-29-35q28-23 52 0l5 61q-23 20-59 0Z" fill="#b58451" stroke="#8f633a" strokeWidth="3"/><path d="M-21-29q20-17 37 0l4 50q-17 14-44 0Z" fill="#edcf98"/>{[[-11,-17],[5,-5],[-8,12]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="4" ry="3" fill="#c3a06a"/>)}</g>
          <path d="m253 191 6-4m73-67 6 4m-34 129 6-4m63-50 5 3" stroke="#8b9663" strokeWidth="3" strokeLinecap="round"/>
        </g>}
        {art === "ribollita" && <g>
          <path d="M190 160h-25q-17 0-17 21t17 21h25m220-42h25q17 0 17 21t-17 21h-25" stroke="#aa7050" strokeWidth="11" />
          <circle cx="300" cy="186" r="116" fill="#b77d5b" stroke="#8e5e42" strokeWidth="3"/><circle cx="300" cy="186" r="101" fill="#d6b989" stroke="#e9cda7" strokeWidth="5"/>
          {[[246,139,-20],[303,113,30],[370,170,-30],[337,256,15],[243,238,-15],[294,204,35]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-18-7q-12-14 1-20 8-10 16 1 16-3 20 10l-6 25-19 14-10-16q-16-1-8-14Z" fill="#788257" stroke="#596545" strokeWidth="2"/><path d="m-2-18 5 33m-4-19 11-6m-9 17-11-8" stroke="#a5ad79" strokeWidth="3" strokeLinecap="round"/></g>)}
          {[[273,134,25],[332,140,-30],[231,190,40],[329,192,15],[275,238,-25],[351,223,45],[298,270,-15],[291,168,35]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-10-4C-12-19 11-18 13-3S-8 20-10 5Q-4 0-10-4Z" fill="#f2e1b8" stroke="#b69c6c" strokeWidth="2"/><path d="m2-9 4 6" stroke="#fff1d1" strokeWidth="3" strokeLinecap="round"/></g>)}
          {[[258,174,-12],[318,228,20],[361,142,-25]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-16-12 12-17 19 8 2 18-17 10Z" fill="#dac394" stroke="#ad8d5a" strokeWidth="3"/><path d="m-7-4 6-3m3 13 5-2" stroke="#f0dbaf" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[250,211],[318,164],[333,276],[219,162],[302,143]].map(([x,y])=><rect key={x} x={x-6} y={y-5} width="12" height="11" rx="3" transform={`rotate(20 ${x} ${y})`} fill="#d3915c"/>)}
          <path d="M229 162q-6-28 27-43M339 247q28-11 35-37" stroke="#b69642" strokeWidth="4" strokeLinecap="round"/>
          <g transform="translate(166 283) rotate(-22)"><path d="M-39-8q3-34 41-34t40 34v27h-81Z" fill="#b78652" stroke="#90653d" strokeWidth="3"/><path d="M-31-6q3-25 33-25t31 25v18h-64Z" fill="#e9d2a4"/>{[[-19,-5],[1,-19],[19,-4],[0,5]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="4" ry="3" fill="#c7aa75"/>)}</g>
          <path d="M266 63q-12-17 0-31m35 27q-12-17 0-31m35 38q-12-17 0-31" stroke="#fff7e9" strokeWidth="4" strokeLinecap="round" opacity=".8"/>
        </g>}
        {art === "fried-chicken" && <g>
          {[[250,136,-20],[324,172,24],[257,233,-35],[354,244,15]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-45-18q-8-19 14-23 8-17 26-7 20-9 31 8 22 1 22 24 12 17-4 33-2 20-24 22-16 13-34 1-24 3-31-17-16-14 0-41Z" fill="#c18a43" stroke="#95632c" strokeWidth="3"/>
            <path d="m-28-25 12-9 9 7 18-6 5 13 18 5-9 12 9 15-14 8-12-5-10 15-12-8-16 1 5-17-15-7 12-9Z" fill="#dca653"/>
            {[[0,-20],[-23,-3],[22,3],[-7,17],[21,-23],[-28,19],[17,25]].map(([cx,cy])=><path key={`${cx}-${cy}`} d="m-4-1 5-4 5 6-7 4Z" transform={`translate(${cx} ${cy})`} fill="#edc578"/>)}
            <path d="m-34-14 6 3m24-28 3 7m24 23 5-4m-28 29 6-1m-24-5 4-6" stroke="#a56d30" strokeWidth="3" strokeLinecap="round"/>
          </g>)}
          <g transform="translate(397 112)"><circle r="40" fill="#d6c1a0" stroke="#aa8c63" strokeWidth="3"/><circle r="33" fill="#f0e3c8"/><path d="m-20-9 30 5m-29 12 28-7m-20 17 26-7m-13-26 13 13m-34-3 15 21" stroke="#b2ba86" strokeWidth="5" strokeLinecap="round"/><path d="m-17 2 26 6m-13-24 12 10m-4 22 8-12" stroke="#d59662" strokeWidth="3" strokeLinecap="round"/></g>
          <path d="m182 284 10 3m213-51 6 4m-202-52 7-4m119 111 9-2" stroke="#c69247" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "buffalo-wings" && <g>
          {[[246,125,-25],[290,163,25],[238,215,-35]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-38-13Q-36-29-8-25L29-19Q47-16 41 4L29 19Q7 27-19 19L-36 11Q-44 1-38-13Z" fill="#c3653f" stroke="#974931" strokeWidth="3"/><path d="M-26-9Q0-16 29-8M-23 9Q2 16 23 7" stroke="#e49b65" strokeWidth="5" strokeLinecap="round"/><path d="M-22 0 23 1" stroke="#ac4e32" strokeWidth="3" strokeLinecap="round"/></g>)}
          {[[318,119,-25],[332,229,40],[280,277,90]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-10 9Q-38 6-35-19-31-43-7-39 18-42 24-19 27 1 9 11L8 36Q-2 48-13 37Z" fill="#bb5738" stroke="#8f402d" strokeWidth="3"/><path d="M-24-19q5-17 20-11M-4 5l1 27" stroke="#e19661" strokeWidth="6" strokeLinecap="round"/><path d="m9-21 3 13" stroke="#d37b4d" strokeWidth="4" strokeLinecap="round"/></g>)}
          <g transform="translate(376 179) rotate(16)">{[-16,0,16].map((x)=><g key={x}><rect x={x-6} y="-43" width="12" height="86" rx="5" fill="#acbf7c" stroke="#809957" strokeWidth="2"/><path d={`M${x-1}-36v71`} stroke="#dce1aa" strokeWidth="3"/></g>)}</g>
          <g transform="translate(401 267)"><circle r="40" fill="#d8c1a7" stroke="#a9896e" strokeWidth="3"/><circle r="33" fill="#f2e9d7"/><path d="m-15-13 6 4m15-11 4 6m8 10-6 3m-20 15 7-2m-21-9 4 6m20 7 5-3" stroke="#879a91" strokeWidth="4" strokeLinecap="round"/><path d="M-22 0q5-22 29-21" stroke="#fff8e9" strokeWidth="4" strokeLinecap="round"/></g>
        </g>}
        {art === "quesadilla" && <g>
          {[[275,165,-15],[316,213,18],[252,239,-40]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-68 24Q-62-38 5-67L64 34Q-1 53-68 24Z" fill="#c29054" stroke="#976a3b" strokeWidth="3"/><path d="M-66 19Q-59-42 6-72L67 28Q-2 47-66 19Z" fill="#e8c88b" stroke="#bd955b" strokeWidth="2"/><path d="M-59 25q63 26 117 6" stroke="#f5e1a2" strokeWidth="6"/><path d="m-34-8 11-5m15-28 7 3m17 33 12-3m-51 28 8 2m31 5 6-2" stroke="#b1854b" strokeWidth="5" strokeLinecap="round"/><path d="m-28 33 8 2m24 2 10-1m21-1 6-1" stroke="#897449" strokeWidth="3" strokeLinecap="round"/></g>)}
          <g transform="translate(383 116)"><circle r="39" fill="#edddbb" stroke="#ba996c" strokeWidth="3"/><circle r="31" fill="#bd624c"/>{[[-14,-9],[4,-17],[16,3],[-4,12],[-17,10]].map(([x,y])=><rect key={x} x={x-5} y={y-4} width="10" height="8" rx="2" fill="#e29870"/>)}<path d="m-6-4 10 6m-18 11 6-4m21-16-5 5" stroke="#718953" strokeWidth="3" strokeLinecap="round"/></g>
          <path d="M198 118q-24-14-33 6 16 15 33-6Zm13 163q-28-6-29 16 21 8 29-16Z" fill="#85915b"/>
        </g>}
        {art === "chipotle-bowl" && <g>
          <circle cx="300" cy="186" r="114" fill="#a45f4b" stroke="#7e4235" strokeWidth="3"/><circle cx="300" cy="186" r="102" fill="#f1e7ce"/>
          {Array.from({length:21},(_,i)=><ellipse key={i} cx={233+(i*19)%73} cy={122+(i*23)%105} rx="5" ry="2" transform={`rotate(${i*29} ${233+(i*19)%73} ${122+(i*23)%105})`} fill="#d4c39f"/>)}
          {[[244,233,-15],[266,245,30],[286,259,-20],[230,252,15],[256,266,-20],[289,232,10]].map(([x,y,r])=><path key={`${x}-${y}`} d="M-9-4C-12-16 10-14 11-3S-7 15-9 4Q-3 0-9-4Z" transform={`translate(${x} ${y}) rotate(${r})`} fill="#67473f" stroke="#9e7360" strokeWidth="2"/>)}
          {[[324,124,-20],[355,145,15],[310,154,30],[340,182,-15],[370,180,10],[318,203,-25]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-16" y="-13" width="32" height="26" rx="7" fill="#b87748" stroke="#8a5032" strokeWidth="2"/><path d="m-9-7 4 15m7-17 4 16" stroke="#d8a46b" strokeWidth="3"/><path d="m-11 5 21-3" stroke="#a35438" strokeWidth="3"/></g>)}
          {[[325,240],[350,260],[375,225]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0-20q-23 1-21 17-8 18 12 24 19 8 29-12 5-18-20-29Z" fill="#9aaa6b" stroke="#788b50" strokeWidth="2"/><path d="M-10 12 8-12m-5 10 11 4" stroke="#d3d8a0" strokeWidth="3"/></g>)}
          {[[251,105],[274,115],[231,125],[273,140]].map(([x,y])=><rect key={`${x}-${y}`} x={x-8} y={y-7} width="16" height="14" rx="3" fill="#c16b54" stroke="#a64f3a" strokeWidth="2"/>)}
          <g transform="translate(398 273) rotate(-35)"><path d="M-29 0H29a29 29 0 0 1-58 0Z" fill="#d8dca0" stroke="#879b55" strokeWidth="5"/><path d="M0 2v22M-2 2-19 16M2 2 19 16" stroke="#f3edc8" strokeWidth="3"/></g>
        </g>}
        {art === "calabacitas" && <g>
          <path d="M191 151h-23q-16 0-16 18v25q0 18 16 18h23m218-61h23q16 0 16 18v25q0 18-16 18h-23" stroke="#835d43" strokeWidth="10" />
          <circle cx="300" cy="181" r="117" fill="#936747" stroke="#b78b63" strokeWidth="5" />
          <circle cx="300" cy="181" r="105" fill="#cf9e60" />
          {[[250,122,-30],[316,112,25],[369,159,80],[337,229,-20],[251,219,35],[221,165,-75],[291,173,140]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-25-4H25a25 25 0 0 1-50 0Z" fill="#cbd18b" stroke="#71824d" strokeWidth="5"/><path d="m-12 3 5 5m12-5 5 5" stroke="#f1e7af" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[275,135],[351,130],[317,151],[244,182],[360,201],[278,229],[300,258],[229,149],[332,187],[268,196],[303,213],[326,265]].map(([x,y])=><g key={`${x}-${y}`} transform={`translate(${x} ${y})`}><ellipse rx="7" ry="5" fill="#f2ce62" stroke="#bb8d36" strokeWidth="1.5"/><ellipse cx="9" cy="10" rx="6" ry="4" fill="#f7d777"/></g>)}
          {[[288,113,20],[361,231,-15],[222,207,25],[321,204,-20],[267,269,30]].map(([x,y,r])=><rect key={x} x={x-9} y={y-8} width="18" height="16" rx="4" fill="#bf654b" stroke="#a6533d" strokeWidth="2" transform={`rotate(${r} ${x} ${y})`}/>)}
          <path d="m254 156 20 7m60 6 18-7m-62 28 19 5m-67 40 17 7m66 9 15-5" stroke="#f7e3a9" strokeWidth="6" strokeLinecap="round"/>
          <path d="m233 127 5 14m112 15 13 5m-87 55 6 13m51 18 9-5" stroke="#617647" strokeWidth="5" strokeLinecap="round"/>
          <g transform="translate(418 282) rotate(-18)"><ellipse rx="63" ry="34" fill="#d7b478" stroke="#aa8051" strokeWidth="2"/><path d="M-58-2Q0-53 58-2L43 21Q0 38-43 21Z" fill="#f0d6a0" stroke="#bb955d" strokeWidth="2"/><path d="m-30-7 7-3m22 19 9 1m15-13 7 3m-44 14 5 2" stroke="#c49858" strokeWidth="4" strokeLinecap="round"/></g>
          <g transform="translate(167 277)"><ellipse rx="48" ry="34" fill="#f1ddba" stroke="#b89264" strokeWidth="3"/><ellipse rx="39" ry="25" fill="#a97050"/>{[[-23,-6,-30],[-6,-14,20],[14,-9,-15],[25,5,30],[5,11,-20],[-18,11,20]].map(([x,y,r])=><path key={x} d="M-7-3C-9-13 8-12 9-2S-5 12-7 3Q-3 0-7-3Z" transform={`translate(${x} ${y}) rotate(${r})`} fill="#7c4338" stroke="#bd7c5c" strokeWidth="2"/>)}</g>
        </g>}
        {art === "salmon-chanchan" && <g>
          <path d="M190 153h-26q-17 0-17 18v28q0 18 17 18h26m220-64h26q17 0 17 18v28q0 18-17 18h-26" stroke="#58696d" strokeWidth="11" />
          <circle cx="300" cy="186" r="118" fill="#485c60" stroke="#71858a" strokeWidth="5" />
          <circle cx="300" cy="186" r="106" fill="#a88058" />
          {[[247,118,-15],[320,111,30],[374,160,-30],[360,242,20],[288,270,-10],[220,220,30],[224,163,-35]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-27-12q18-26 51-3l-5 35q-32 7-48-8Z" fill="#c6cd94" stroke="#899567" strokeWidth="2"/><path d="m-18-10 31 25m-14-12 15-8m-17 8-4 11" stroke="#e7e5b9" strokeWidth="3" strokeLinecap="round"/></g>)}
          {[[253,255,-22],[374,211,32],[347,127,5]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-7-3-11 22q10 8 17-1L4-3" fill="#e1cfb0"/><path d="M-21-3q3-27 24-21 15 3 18 23-21 9-42-2Z" fill="#a78a6c" stroke="#79654f" strokeWidth="2"/></g>)}
          {[[271,154,-20],[316,219,18]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-54-29q47-17 107-1l-5 55q-47 18-102-2Z" fill="#d58b73" stroke="#a96955" strokeWidth="3"/><path d="m-40-27 17 54m7-60 17 62m9-59 14 54m10-48 9 41" stroke="#f4c4a5" strokeWidth="4"/><path d="m-34-10 18-4m14 10 21-7m-18 22 16-3" stroke="#bb925a" strokeWidth="7" strokeLinecap="round"/><path d="M-54 23q50 18 102 2" stroke="#6b7877" strokeWidth="4"/></g>)}
          <rect x="266" y="137" width="23" height="16" rx="3" transform="rotate(-15 276 145)" fill="#f1d388" stroke="#d7b26b" strokeWidth="2" />
          <path d="m208 181 21 11m59-88 18 7m55 169 14-17m-143-31 13 6" stroke="#df985e" strokeWidth="6" strokeLinecap="round" />
          <path d="M266 76q-12-17 0-31m34 26q-12-17 0-31m34 37q-12-17 0-31" stroke="#fff7e5" strokeWidth="4" strokeLinecap="round" opacity=".85" />
        </g>}
        {art === "barley-soup" && <g>
          <circle cx="300" cy="186" r="113" fill="#708b93" stroke="#42606b" strokeWidth="3"/>
          <circle cx="300" cy="186" r="101" fill="#e4d6b8" stroke="#fff4d8" strokeWidth="5"/>
          <path d="M234 148q69-54 130 1M223 210q56 70 131 28" stroke="#f8edd5" strokeWidth="6" strokeLinecap="round" opacity=".7"/>
          {[[245,153,25],[288,127,-20],[336,139,35],[368,176,-35],[325,174,10],[275,174,-15],[229,199,40],[266,218,-30],[310,231,20],[350,218,-15],[298,270,-40],[261,253,15],[321,202,35]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="10" ry="5" fill="#f3e4c1" stroke="#baa176" strokeWidth="1.5"/><path d="M-5 0H5" stroke="#d2bb8c" strokeWidth="1.4"/></g>)}
          {[[252,182],[303,153],[341,250],[226,231],[361,200]].map(([x,y])=><rect key={x} x={x} y={y} width="17" height="16" rx="4" transform={`rotate(15 ${x} ${y})`} fill="#d69255" stroke="#bf7844" strokeWidth="2"/>)}
          {[[276,145],[333,222],[281,238],[350,164]].map(([x,y])=><circle key={x} cx={x} cy={y} r="9" stroke="#829579" strokeWidth="5"/>)}
          <path d="m248 211 12 4m47-29 10-4m-7 65 11 3" stroke="#a97560" strokeWidth="7" strokeLinecap="round"/>
          <g transform="translate(137 230) rotate(-25)"><rect x="-30" y="-52" width="61" height="108" rx="26" fill="#b78b58" stroke="#916b43" strokeWidth="3"/><rect x="-23" y="-45" width="47" height="94" rx="21" fill="#e7cca0"/><path d="M-17-18 17-28M-17 8 17-2M-16 34 17 24" stroke="#fff0d2" strokeWidth="7" strokeLinecap="round"/></g>
          <ellipse cx="475" cy="149" rx="18" ry="29" fill="#b8c8cb" stroke="#647e87" strokeWidth="3"/><path d="M475 178v104" stroke="#647e87" strokeWidth="10" strokeLinecap="round"/>
        </g>}
        {art === "onion-tart" && <g>
          <path d="M300 188 407 214A111 111 0 1 0 330 295Z" fill="#ba874a" stroke="#8f6439" strokeWidth="3"/>
          <path d="M300 188 396 210A99 99 0 1 0 327 283Z" fill="#dfbd7b" stroke="#efd59c" strokeWidth="6"/>
          {[[239,135,-22],[302,113,20],[354,139,-14],[231,196,30],[277,161,-20],[290,250,8],[235,243,-25]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="22" ry="12" stroke="#b79257" strokeWidth="4"/><ellipse rx="12" ry="6" stroke="#f3dca5" strokeWidth="3"/></g>)}
          {[[263,121],[337,170],[219,165],[264,219],[303,280],[372,178]].map(([x,y])=><rect key={x} x={x} y={y} width="14" height="10" rx="3" transform={`rotate(20 ${x} ${y})`} fill="#a96f51" stroke="#c4936c" strokeWidth="2"/>)}
          <g transform="translate(28 23)"><path d="M306 198 408 224q-14 60-67 77l-35-91Z" fill="#bb8b52" stroke="#8f6439" strokeWidth="3"/><path d="M306 189 408 216q-14 58-67 76Z" fill="#dfbd7b" stroke="#eed49c" strokeWidth="5"/><path d="M341 222q36-12 37 13-9 26-27 9" stroke="#b79257" strokeWidth="4"/><path d="M339 241q14-9 22 4" stroke="#f3dca5" strokeWidth="3"/><rect x="360" y="256" width="13" height="9" rx="3" fill="#a96f51"/></g>
          <path d="m254 181 8-3m79-61 8 4m-82 153 9-3m108-28 8 4" stroke="#7e835b" strokeWidth="3" strokeLinecap="round"/>
        </g>}
        {art === "apple-pancakes" && <g>
          {[231,207,183].map((y,i)=><g key={y}><path d={`M217 ${y-4}v14c0 48 166 48 166 0v-14Z`} fill={i%2?"#c99560":"#ba804e"} stroke="#95643e" strokeWidth="2"/><ellipse cx="300" cy={y-4} rx="83" ry="35" fill="#e0b477" stroke="#a67446" strokeWidth="2"/><ellipse cx="300" cy={y-7} rx="66" ry="25" fill="#edcc92"/></g>)}
          {[[264,169,-28],[292,154,-7],[323,157,18],[347,176,38]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-16-27Q-38 12-2 36 27 13 16-27Z" fill="#b55d4a" stroke="#914536" strokeWidth="2"/><path d="M-11-23Q-28 10-2 29 20 10 11-23Z" fill="#f5deae"/><path d="M-2-16V21" stroke="#deb98b" strokeWidth="2"/></g>)}
          <path d="M354 134q23-25 39-2-23 18-39 2Z" fill="#899369"/>
          {[[244,187],[281,193],[340,201],[325,133],[302,216]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="4" ry="2" fill="#a87b4c"/>)}
          <g transform="translate(206 262) rotate(-25)"><path d="M-24-19Q-39 15 1 33 34 8 24-19Z" fill="#bd6752"/><path d="M-17-15Q-29 12 1 26 26 7 17-15Z" fill="#f4dfb4"/></g>
        </g>}
        {art === "ginseng-soup" && <g>
          <circle cx="300" cy="189" r="113" fill="#c0b28c"/><circle cx="300" cy="189" r="101" fill="#e9ddbe"/>
          {[[253,150,-24],[341,219,12],[274,253,-16]].map(([x,y,r])=><rect key={x} x={x-20} y={y-14} width="40" height="28" rx="4" fill="#f6ecd3" stroke="#c8bc9a" strokeWidth="2" transform={`rotate(${r} ${x} ${y})`}/>)}
          {[[258,195,-18],[277,171,-28],[301,217,22],[265,231,18],[324,178,-5]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-27-10q25-9 54 3l-3 16q-24 8-51-4Z" fill="#d4ba93" stroke="#b39670" strokeWidth="2"/><path d="m-22-3 41 6m-34 2 27 3" stroke="#eee0bf" strokeWidth="3" strokeLinecap="round"/></g>)}
          <g transform="translate(342 140) rotate(24)"><path d="M-6-22v17c-19 5-13 30 1 42L-9 65m8-30 18 24m-8-57 16 12m-38 0-17 12" stroke="#b9a16e" strokeWidth="8" strokeLinecap="round"/><path d="m-10 4 19 0m-19 11 20 0m-18 10 13 1M-9 60l-12 10m35-15 13 7" stroke="#ead5a4" strokeWidth="2" strokeLinecap="round"/></g>
          {[[230,175],[281,118],[366,190],[319,264],[223,222]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="7" ry="4" fill="#8c9c6c" stroke="#c6d09b" strokeWidth="2"/>)}
        </g>}
        {art === "chili-tteok" && <g>
          <ellipse cx="300" cy="192" rx="109" ry="89" fill="#dcab83" opacity=".5"/>
          {[[249,133,-35],[299,126,8],[344,143,34],[372,191,68],[325,195,-25],[274,179,-52],[229,208,32],[277,233,4],[335,256,68],[303,277,-10]].map(([x,y,r],i)=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-14" y="-34" width="28" height="68" rx="13" fill={i%2?"#c86643":"#b55539"} stroke="#97482f" strokeWidth="2"/><path d="M-6-21V18" stroke="#e69462" strokeWidth="5" strokeLinecap="round"/><ellipse cy="-26" rx="8" ry="4" fill="#edb57c"/></g>)}
          {[[266,134],[347,179],[308,225],[246,228],[330,253],[289,172],[372,214],[274,265]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="3.5" ry="1.8" transform={`rotate(-25 ${x} ${y})`} fill="#f2d7a0"/>)}
          <path d="m227 167 14 5m89-52 11 8m-51 137 10-5m42-38 12 5" stroke="#8c9b67" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "crab-custard" && <g>
          <circle cx="300" cy="189" r="112" fill="#86a5b1" stroke="#5e8493" strokeWidth="2"/><circle cx="300" cy="189" r="99" fill="#edd497"/><circle cx="300" cy="189" r="90" stroke="#f8e5b5" strokeWidth="3"/>
          {[[255,151,-32],[303,139,8],[350,174,30],[322,218,-22],[269,237,16]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-25-7q24-12 50 3l-3 15q-23 8-46-6Z" fill="#d38974" stroke="#b47160" strokeWidth="2"/><path d="m-19-1 36 5m-28 2 23 3" stroke="#fae6c9" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[236,192],[285,182],[349,230],[307,263],[333,121]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="6" ry="3" fill="#819466" stroke="#acba83" strokeWidth="2"/>)}
          <path d="M269 81q-11-18 0-33m31 29q-11-18 0-33m31 37q-11-18 0-33" stroke="#f5eddc" strokeWidth="4" strokeLinecap="round" opacity=".8"/>
        </g>}
        {art === "persimmon-curry" && <g>
          <circle cx="300" cy="189" r="112" fill="#ddcba9"/><circle cx="300" cy="189" r="101" fill="#f4ebd5"/>
          <path d="M315 92c103 16 118 145 19 192-29 13-61 4-57-17 5-29 36-35 20-68-19-38-15-79 18-107Z" fill="#ad7946"/>
          {Array.from({length:18},(_,i)=><ellipse key={i} cx={218+(i*19)%68} cy={137+(i*29)%106} rx="5" ry="2" transform={`rotate(${i*19} ${218+(i*19)%68} ${137+(i*29)%106})`} fill="#dacaab"/>)}
          {[[324,128,18],[371,178,-16],[318,239,30]].map(([x,y,r])=><rect key={x} x={x-16} y={y-14} width="32" height="28" rx="6" transform={`rotate(${r} ${x} ${y})`} fill="#dc954e" stroke="#f4bd76" strokeWidth="3"/>)}
          {[[341,178],[351,227],[313,190]].map(([x,y])=><path key={x} d={`M${x-12} ${y-12}q13-8 26 6l-5 23-25-8Z`} fill="#dcc49c" stroke="#ba986f" strokeWidth="2"/>)}
          <path d="m278 111 15-5m77 107 10 11m-72 52 13-4" stroke="#7d8256" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {art === "chestnut-yullan" && <g>
          {[[260,132],[337,132],[228,210],[302,220],[376,210]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0-37C-8-22-36-12-32 17q3 27 33 28c27 0 37-17 32-35C27-8 9-22 0-37Z" fill="#d3b58b" stroke="#a48763" strokeWidth="2"/><path d="M-31 20q30-12 62 0-1 26-31 25-27 0-31-25Z" fill="#eee0bb"/>{[[-20,27],[-6,23],[9,29],[21,24],[-11,35],[6,38]].map(([a,b])=><path key={`${a}-${b}`} d={`m${a} ${b} 3-2`} stroke="#c6ad79" strokeWidth="2" strokeLinecap="round"/>)}<path d="M-10-18q-10 9-10 20" stroke="#e4cea9" strokeWidth="4" strokeLinecap="round"/></g>)}
        </g>}
        {art === "oyster-jeon" && <g>
          {[[251,129,-25],[324,128,18],[370,185,-16],[294,192,24],[224,205,-12],[265,262,10],[339,258,-25]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-32 0c-4-29 26-39 48-28 31 8 27 42 5 54-27 15-55 3-53-26Z" fill="#e2bf6f" stroke="#b48a42" strokeWidth="3"/><path d="M-19-5c0-17 20-20 32-9 17 11 8 34-10 34-14 0-22-10-22-25Z" fill="#d6d1b9" stroke="#9b9d8d" strokeWidth="2"/><path d="m-20-15 11 3m14 17 12-7m-25 19 8 2" stroke="#7d8a5a" strokeWidth="3" strokeLinecap="round"/></g>)}
        </g>}
        {art === "spinach-soup" && <g>
          <circle cx="300" cy="189" r="112" fill="#a0a881"/><circle cx="300" cy="189" r="101" fill="#b99b6c"/>
          {[[249,153,-20],[331,130,15],[351,231,-12],[272,253,24]].map(([x,y,r])=><rect key={x} x={x-19} y={y-16} width="38" height="32" rx="5" fill="#f3e9cf" stroke="#d7c7a6" strokeWidth="2" transform={`rotate(${r} ${x} ${y})`}/>)}
          {[[292,145,-25],[255,208,40],[335,193,-40],[300,252,65]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0-36C-40-15-19 21 0 34 24 13 34-13 0-36Z" fill="#75855a" stroke="#566644" strokeWidth="2"/><path d="M0-24v53m0-24L-12-7M0 15 13 2" stroke="#a0ad76" strokeWidth="2"/></g>)}
          <path d="m225 175 10-5m134 2 11 5m-43 87 10-4" stroke="#b6c18b" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "yuja-salmon" && <g>
          {[[269,145,-22],[326,218,18]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-58-31q51-20 114 0l-6 60q-49 17-103-2Z" fill="#d78f72" stroke="#a76550" strokeWidth="3"/><path d="m-41-31 19 61m4-68 18 72m7-71 16 66m8-60 12 51" stroke="#f2c9ab" strokeWidth="4"/><path d="m-31-11 15-6m18 21 15-6m6-17 13 7" stroke="#d8b954" strokeWidth="5" strokeLinecap="round"/></g>)}
          <g transform="translate(215 229) rotate(-25)"><path d="M-29-6H29a29 29 0 0 1-58 0Z" fill="#ebd47a" stroke="#bfa44f" strokeWidth="3"/><path d="m0-4-19 15M0-4v24M0-4l20 15" stroke="#fff2ba" strokeWidth="3"/></g>
          {[[360,116],[383,147],[256,272]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0 2v23" stroke="#9aac74" strokeWidth="7"/><circle cx="-10" r="12" fill="#839361"/><circle cx="10" r="12" fill="#839361"/><circle cy="-10" r="14" fill="#758858"/></g>)}
        </g>}
        {art === "fig-toast" && <g>
          {[[253,175,-18],[344,209,18]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-47" y="-70" width="94" height="140" rx="22" fill="#bf8c55" stroke="#956d45" strokeWidth="3"/><rect x="-37" y="-58" width="74" height="117" rx="16" fill="#f4e7cc"/>{[-28,27].map(y=><g key={y} transform={`translate(0 ${y})`}><path d="M0-28C-13-5-28 0-25 18q25 25 50 0C28 0 13-5 0-28Z" fill="#967080" stroke="#6d4f65" strokeWidth="2"/><path d="M0-20C-9-2-21 3-18 16q18 17 36 0C21 3 9-2 0-20Z" fill="#d494a0"/>{[[-9,4],[8,7],[-6,16],[5,-4],[6,18]].map(([a,b])=><path key={`${a}-${b}`} d={`m${a} ${b} 1 3`} stroke="#f8d9b0" strokeWidth="2" strokeLinecap="round"/>)}</g>)}</g>)}
          <path d="m220 263 10-7 8 8-10 7Zm158-139 10-7 8 8-10 7Z" fill="#987052"/><path d="M300 100q13-22 32-7-13 21-32 7Z" fill="#88966c"/>
        </g>}
        {art === "octopus-soup" && <g>
          <circle cx="300" cy="189" r="112" fill="#99b4b1"/><circle cx="300" cy="189" r="101" fill="#e1dfc8"/>
          {[[250,149,25],[345,216,-15],[276,250,-30]].map(([x,y,r])=><rect key={x} x={x-18} y={y-13} width="36" height="26" rx="4" fill="#f7eed5" stroke="#c6c4a6" strokeWidth="2" transform={`rotate(${r} ${x} ${y})`}/>)}
          <path d="M292 136c-20-15-44 8-23 30 22 21 60-4 76 24s-14 54-32 36c-14-15 9-31 15-13M285 177c-49-25-84 1-60 28 20 22 52-14 62 20s-22 54-36 32M305 170c20-43 64-35 65-10s-31 32-37 15" stroke="#99736a" strokeWidth="13" strokeLinecap="round"/>
          {[[269,163],[340,182],[327,227],[231,204],[284,229],[361,171]].map(([x,y])=><circle key={x} cx={x} cy={y} r="3.5" fill="#e4c7b7"/>)}
          <path d="m306 111 25 52m-16-48-12 41m-67 81 35-47m-43 41 29-51m79 59-36 26" stroke="#7f936b" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "cockle-rice" && <g>
          <circle cx="300" cy="189" r="111" fill="#a78b6a"/><circle cx="300" cy="189" r="100" fill="#f3e7cc"/>
          {Array.from({length:20},(_,i)=><ellipse key={i} cx={233+(i*31)%128} cy={133+(i*23)%118} rx="5" ry="2" fill="#dacaab" transform={`rotate(${i*29} ${233+(i*31)%128} ${133+(i*23)%118})`}/>)}
          {[[251,146,-30],[285,128,12],[321,148,37],[247,185,12],[287,174,-20],[276,211,35],[232,215,-12]].map(([x,y,r])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-15 2c-6-19 21-25 30-7s-15 32-26 18Z" fill="#b27b56" stroke="#855638" strokeWidth="2"/><path d="M-7-5q17-12 15 7-4 14-14 7" stroke="#dfaa75" strokeWidth="5" strokeLinecap="round"/></g>)}
          <path d="m341 167 20 37m-8-42 20 34m-32-24 20 37m-26-7 30 22m-30-14 29 23" stroke="#7d905e" strokeWidth="6" strokeLinecap="round"/>
          <path d="m310 237 25 15m-32-5 23 15m3-32 27 15m-33-2 27 15" stroke="#4e5040" strokeWidth="5" strokeLinecap="round"/>
          {[[294,149],[267,179],[316,201],[242,224],[320,256]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="3" ry="1.5" fill="#e8cd91"/>)}
        </g>}
        {art === "berry-duck" && <g>
          <path d="M214 189c-36 44 25 94 107 77s106-60 72-81c-43-27-84 42-130 16-28-16-37-27-49-12Z" fill="#8a415d" opacity=".9"/>
          {[[238,155,-24],[270,167,-18],[303,179,-12],[336,191,-6],[367,203,0]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="23" ry="47" fill="#b17b59" stroke="#85573e" strokeWidth="3"/><ellipse cy="-2" rx="16" ry="36" fill="#d7a48b"/><path d="M-12-27q15-10 25 0" stroke="#efd2aa" strokeWidth="5" strokeLinecap="round"/></g>)}
          {[[224,242],[244,258],[260,238]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}>{[[-5,-5],[5,-5],[0,5],[-7,4],[7,4],[0,-11]].map(([a,b])=><circle key={`${a}-${b}`} cx={a} cy={b} r="5" fill="#61354b" stroke="#a96b88"/>)}</g>)}
          <path d="M337 112q18-38 46-11-15 30-46 11Zm26 17q34-15 40 16-34 12-40-16Z" fill="#81966a"/>
        </g>}
        {art === "cheese-jeon" && <g>
          {[[252,143,-15],[341,142,12],[238,220,-22],[326,226,18]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="43" ry="36" fill="#d8aa58" stroke="#ae7b40" strokeWidth="3"/><ellipse cy="-3" rx="34" ry="25" fill="#ecc97b"/><path d="m-22-11 12-5m18 5 14 7m-30 12 13 6" stroke="#ba884b" strokeWidth="5" strokeLinecap="round"/></g>)}
          <path d="m314 208 30-10 12 54-33 5Z" fill="#f5de9d"/><path d="m319 213 24-8m-22 18 26-9m-23 22 25-10m-22 19 23-9" stroke="#fff3c8" strokeWidth="4" strokeLinecap="round"/>
          <g transform="translate(388 247) rotate(-25)"><ellipse rx="22" ry="34" fill="#9e607b"/><ellipse rx="17" ry="28" fill="#edc97d"/></g>
          <path d="m220 119 10-5m75 151 12-6m57-83 9-5" stroke="#87945b" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {art === "shiitake-japchae" && <g>
          <ellipse cx="300" cy="192" rx="105" ry="86" fill="#b9976c"/>
          {Array.from({length:17},(_,i)=><path key={i} d={`M${220+i*8} ${143+(i%4)*13}C${379-i*5} ${102+i*8} ${208+i*7} ${265-i*3} ${380-i*8} ${217+(i%3)*11}`} stroke={i%2?"#ddc49c":"#96734f"} strokeWidth="4" strokeLinecap="round"/>)}
          {[[246,146,-30],[348,147,25],[299,213,-12],[361,227,30]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-5 0v25h10V0" fill="#e6d9bb" stroke="#a28b6d" strokeWidth="2"/><path d="M-26 3Q0-38 26 3q-23 12-52 0Z" fill="#82624b" stroke="#644e3d" strokeWidth="2"/><path d="m-11-6 22-2M0-19l1 19" stroke="#d1b99b" strokeWidth="3" strokeLinecap="round"/></g>)}
          <path d="m234 189 23 18m56-78 20 22m-18 103 21-11m-107-20 14 11" stroke="#d39b63" strokeWidth="6" strokeLinecap="round"/>
          <path d="m262 252 25-13m-55-75 26 8m72 16 25-17m-68-24 12 23" stroke="#77835b" strokeWidth="7" strokeLinecap="round"/>
        </g>}
        {art === "apple-pork-rolls" && <g>
          {[[247,150,-28],[319,139,14],[275,226,-15],[348,210,22]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-25" y="-25" width="50" height="67" rx="20" fill="#b47b59" stroke="#86593e" strokeWidth="3"/><ellipse cy="-21" rx="25" ry="21" fill="#d6aa86" stroke="#86593e" strokeWidth="3"/><ellipse cy="-21" rx="17" ry="14" fill="#efd9a7"/><path d="m-9-26 17 3m-16 7 17-2" stroke="#bd735b" strokeWidth="4" strokeLinecap="round"/><path d="M-17 4q17 9 34 0m-31 14q14 7 28 0" stroke="#9c674a" strokeWidth="3"/></g>)}
          <path d="M370 105q-3-15 8-22" stroke="#765941" strokeWidth="4" strokeLinecap="round"/><path d="M376 96q18-18 32-4-18 20-32 4Z" fill="#8c9c73"/>
          <path d="M370 109c-38-20-43 42-11 56 17 4 40-32 32-47-6-12-13-15-21-9Z" fill="#b96859" stroke="#915247" strokeWidth="2"/><path d="M370 111q-27 6-10 47 24-20 10-47Z" fill="#f1dda7"/>
          <path d="m229 248-13 18m85 10 17-8m73-70 13 5" stroke="#81926b" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "jujube-porridge" && <g>
          <circle cx="300" cy="188" r="109" fill="#ad7865"/><circle cx="300" cy="188" r="98" fill="#c9966e"/>
          <path d="M245 175c-5-33 97-44 105-7s-72 58-88 27 47-43 62-19-18 37-32 24" stroke="#dfb58d" strokeWidth="8" strokeLinecap="round"/>
          {[[214,284,-30],[247,291,23],[380,98,18]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="14" ry="21" fill="#934d3b" stroke="#673b30" strokeWidth="2"/><path d="M-5-12q-5 8-4 18" stroke="#be7955" strokeWidth="3" strokeLinecap="round"/></g>)}
          <path d="M156 152v140" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".6"/><ellipse cx="156" cy="132" rx="14" ry="23" stroke={ink} strokeWidth="3" opacity=".6"/>
        </g>}
        {art === "garlic-chicken" && <g>
          {[[266,157,-22],[332,216,22]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-51-28Q-26-53 22-42c44 2 51 51 20 71-27 20-88 16-94-10Z" fill="#c99a57" stroke="#8b6039" strokeWidth="3"/><path d="m-31-21 54 6m-58 14 59 5m-46 12 37 5" stroke="#956139" strokeWidth="5" strokeLinecap="round"/><path d="M-37-27q26-16 44-8" stroke="#e8c688" strokeWidth="5" strokeLinecap="round"/></g>)}
          {[[225,236,-45],[239,259,10],[370,123,25],[386,151,65],[281,104,-10],[362,265,30]].map(([x,y,r])=><path key={x} transform={`translate(${x} ${y}) rotate(${r})`} d="M0-17C-21-9-17 18-2 17 15 16 17 0 0-17Z" fill="#ecd7a6" stroke="#b8955c" strokeWidth="2"/>)}
          <path d="m208 166 20 24m127-12 22-6m-89 87 15-9" stroke="#839065" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "perilla-kalguksu" && <g>
          <circle cx="300" cy="188" r="111" fill="#a0aa80"/><circle cx="300" cy="188" r="101" fill="#e4d9ba"/>
          {Array.from({length:10},(_,i)=><path key={i} d={`M${234+i*10} 141C${355-i*5} ${113+i*12} ${211+i*11} ${253-i*5} ${362-i*6} 239`} stroke={i%2?"#f9edce":"#e8d3a6"} strokeWidth="5" strokeLinecap="round"/>)}
          {[[251,148,-27],[347,217,25],[267,247,-8]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 26C-36 0-26-26-10-19 0-34 28-24 23-7 40 4 13 22 0 26Z" fill="#b7c08d" stroke="#96a270" strokeWidth="2"/><path d="M0 23 0-15m0 19-15-13M0 12 15-9" stroke="#f8eed0" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[312,132,25],[359,175,-20]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-4 0v25h9V0" fill="#e5d7b8"/><path d="M-20 1Q0-28 20 1Z" fill="#a59072"/></g>)}
          {Array.from({length:22},(_,i)=><circle key={i} cx={234+(i*37)%130} cy={137+(i*23)%113} r="1.5" fill="#9c9074"/>)}
        </g>}
        {art === "grape-salad" && <g>
          {[[230,165,-35],[328,136,40],[359,213,65],[277,243,-20]].map(([x,y,r])=><path key={x} transform={`translate(${x} ${y}) rotate(${r})`} d="M0-36C-42-24-30 19 0 37 34 13 39-25 0-36Z" fill="#8c9c70" stroke="#718455" strokeWidth="2"/>)}
          {[[251,142],[296,128],[346,164],[236,209],[316,241],[366,219],[286,186],[272,258]].map(([x,y],i)=><g key={x} transform={`translate(${x} ${y}) rotate(${i*27})`}><ellipse rx="17" ry="22" fill="#805881" stroke="#66446e" strokeWidth="2"/>{i%2===0?<ellipse rx="12" ry="16" fill="#d7b4c6"/>:<path d="M-7-12q-7 8-5 15" stroke="#bb91b6" strokeWidth="4" strokeLinecap="round"/>}</g>)}
          {[[279,145],[337,202],[274,224]].map(([x,y])=><path key={x} transform={`translate(${x} ${y})`} d="M-22 1Q-31-17-11-18 3-31 17-14 35-7 23 10 11 25-9 16-24 19-22 1Z" fill="#fff4dd" stroke="#d4cab1" strokeWidth="2"/>)}
          {[[218,179],[330,267],[362,141],[286,111]].map(([x,y])=><path key={x} transform={`translate(${x} ${y})`} d="M-8-5 0-11 9-4 7 8-4 10-9 2Z" fill="#b78c5f" stroke="#896647" strokeWidth="2"/>)}
          <path d="M396 269q11-27 35-14l11 29q-21 24-43 10Z" fill="#cba06a" stroke="#9f784b" strokeWidth="3"/>
        </g>}
        {art === "lentil-stew" && <g>
          <circle cx="300" cy="188" r="115" fill="#8b6860" stroke="#634c45" strokeWidth="3"/><circle cx="300" cy="188" r="101" fill="#c1a077"/>
          <path d="M188 157h-17v62h17m224-62h17v62h-17" stroke="#8b6860" strokeWidth="13" strokeLinejoin="round"/>
          {Array.from({length:66},(_,i)=>{const a=i*2.4,r=18+Math.sqrt(i/66)*74;return <ellipse key={i} cx={300+Math.cos(a)*r} cy={188+Math.sin(a)*r} rx="7" ry="4" transform={`rotate(${i*29} ${300+Math.cos(a)*r} ${188+Math.sin(a)*r})`} fill={i%3===0?"#a7956d":i%3===1?"#8c8260":"#b6a17b"} stroke="#766b52" strokeWidth="1"/>;})}
          {[[267,141,-24],[327,175,25],[274,219,-14],[343,237,34]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="29" ry="21" fill="#9c5e43" stroke="#74442e" strokeWidth="3"/><ellipse rx="22" ry="15" fill="#cf9e78"/><path d="m-12-5 5 3m9-6 4 2m-9 10 5 3m9-1 3-2" stroke="#e9c5a3" strokeWidth="3" strokeLinecap="round"/></g>)}
          {[[233,183],[330,132],[315,247],[368,194]].map(([x,y])=><rect key={x} x={x} y={y} width="12" height="12" rx="3" fill="#d69b5d" transform={`rotate(20 ${x} ${y})`}/>)}
          <path d="m298 133 8 4m-70 85 10-5m81-5 9-3" stroke="#718064" strokeWidth="5" strokeLinecap="round"/>
          <path d="M396 84q30-13 43 12l8 34q-23 20-41 1Z" fill="#c79b62" stroke="#9c794d" strokeWidth="3"/><path d="m406 93 22 16m-19-5 23 16" stroke="#f2ddb2" strokeWidth="6" strokeLinecap="round"/>
        </g>}
        {art === "chestnut-pasta" && <g>
          <ellipse cx="300" cy="192" rx="107" ry="88" fill="#eee1ba"/>
          {Array.from({length:12},(_,i)=><path key={i} d={`M${218+i*5} ${142+i*8}C${385-i*4} ${95+i*10} ${226+i*4} ${259-i*5} ${374-i*3} ${211+i*3}`} stroke={i%2?"#d4b779":"#f7edca"} strokeWidth="5" strokeLinecap="round"/>)}
          {[[243,151,-25],[339,138,20],[330,234,-15],[263,229,28]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0-20Q-33 1-23 18q22 17 46-1Q31 0 0-20Z" fill="#b58b55" stroke="#8e693e" strokeWidth="2"/><path d="M-20 11q21-10 41 0-5 19-23 15T-20 11Z" fill="#efcf8b"/><path d="m-5-8-8 9" stroke="#e3c086" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[228,190,-20],[366,189,32]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-17 1q0-26 17-26T17 1Z" fill="#b59a7c"/><path d="M-4 0h8v19h-8Z" fill="#d8c9a9"/></g>)}
          <path d="m293 143 9 4m-7 87 9-4m-63-26 8-4m100-41 7 3" stroke="#7e8d65" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {art === "salt-shrimp" && <g>
          <ellipse cx="300" cy="188" rx="112" ry="101" fill="#fbf5e6" stroke="#a6bec2" strokeWidth="4"/>
          {Array.from({length:28},(_,i)=><circle key={i} cx={213+(i*37)%176} cy={112+(i*29)%148} r={i%3+1} fill="#d9d4c5"/>)}
          {[[259,143,-28],[330,162,15],[270,222,-10],[343,231,26]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M18-23C-7-37-32-17-27 8c5 24 34 30 48 12L7 9C-4 21-17 7-11-6c4-8 13-8 22-2Z" fill="#e99d7e" stroke="#bc735b" strokeWidth="2"/>
            <path d="m18-23 17-9-9 25-15-1M9 9l21-1-9 15Z" fill="#d48064" stroke="#bc735b" strokeWidth="2"/>
            <path d="m-16-20 8 10m-18 4 14 2m-11 17 13-5m-1 17 5-11m37-41 16-9m-15 13 21-3" stroke="#ac6653" strokeWidth="2" strokeLinecap="round"/><circle cx="25" cy="-21" r="2" fill="#553e33"/>
          </g>)}
          <path d="M351 95l43 42q-40 22-43-42Z" fill="#e9c96d" stroke="#bf9d46" strokeWidth="2"/><path d="m359 106 25 26m-25-26 7 34" stroke="#fff0b5" strokeWidth="2"/>
        </g>}
        {art === "ginger-pork" && <g>
          <circle cx="300" cy="188" r="108" fill="#7f9695"/><circle cx="300" cy="188" r="98" fill="#f4e9ce"/>
          {Array.from({length:26},(_,i)=><ellipse key={i} cx={223+(i*29)%153} cy={118+(i*31)%144} rx="5" ry="2" transform={`rotate(${i*17} ${223+(i*29)%153} ${118+(i*31)%144})`} fill="#d4c6a3"/>)}
          {[[263,155,-22],[322,143,14],[278,199,26],[345,185,-30],[321,230,10]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-33-14Q-9-26 29-17l7 25Q9 27-31 17Z" fill="#b8875b" stroke="#8e623e" strokeWidth="2"/><path d="M-25-6Q-3-14 27-7m-51 17Q0 3 26 11" stroke="#dab381" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[256,186,-20],[335,209,35],[302,159,8]].map(([x,y,r])=><path key={x} transform={`translate(${x} ${y}) rotate(${r})`} d="M-18-7Q-2 19 22-4" stroke="#edd2a0" strokeWidth="6" strokeLinecap="round"/>)}
          <path d="m269 148 9 5m35 60 11-3m-68 23 8-7m67-77 6 7" stroke="#748967" strokeWidth="5" strokeLinecap="round"/>
          <ellipse cx="374" cy="267" rx="22" ry="13" fill="#eed499" stroke="#b79058" strokeWidth="3"/><path d="m361 264 25 5m-22-9 22 5" stroke="#d4b575" strokeWidth="2"/>
        </g>}
        {art === "apple-crumble" && <g>
          <rect x="197" y="105" width="207" height="175" rx="35" fill="#a85f4e" stroke="#7e4d40" strokeWidth="3"/>
          <path d="M197 163h-16v56h16m207-56h16v56h-16" stroke="#a85f4e" strokeWidth="12" strokeLinejoin="round"/>
          <rect x="209" y="117" width="183" height="151" rx="27" fill="#f3e2ba"/>
          {[0,1,2,3,4].map(i=><path key={i} d={`M${222+i*31} 140q-17 54 5 105`} stroke={i%2?"#d5a464":"#e8c58c"} strokeWidth="20" strokeLinecap="round"/>)}
          {Array.from({length:39},(_,i)=><path key={i} transform={`translate(${225+(i*37)%150} ${133+(i*23)%115}) rotate(${i*29})`} d="M-8-4 1-8 8-2 5 7-6 5Z" fill={i%3===0?"#b8864c":i%3===1?"#dab477":"#edcc90"} stroke="#c6a069" strokeWidth="1"/>)}
          <path d="M355 80q32-8 57 24-42 18-57-24Z" fill="#eed5a3" stroke="#b56450" strokeWidth="6"/><path d="m366 87 29 14" stroke="#f9e8c6" strokeWidth="4"/>
        </g>}
        {art === "ongsimi" && <g>
          <circle cx="300" cy="186" r="111" fill="#789398"/><circle cx="300" cy="186" r="102" fill="#dfd5b6"/>
          {[[247,139],[299,126],[351,153],[248,203],[301,187],[352,217],[290,250]].map(([x,y])=><g key={x+y}><ellipse cx={x} cy={y} rx="22" ry="20" fill="#f5eddb" stroke="#bbae91" strokeWidth="2"/><path d={`M${x-10} ${y-8}q8-7 17-3`} stroke="#fffbed" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[273,165,-20],[331,247,30],[227,241,-10]].map(([x,y,r])=><path key={x} d="M-16-8h32q0 25-32 0Z" transform={`translate(${x} ${y}) rotate(${r})`} fill="#a6b584" stroke="#789364" strokeWidth="3"/>)}
          <path d="m315 155 13-4m-55 70 16 5m66-51 9-5" stroke="#66856a" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {art === "cabbage-jeon" && <g>
          {[[270,164,-27],[337,211,20]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse rx="64" ry="83" fill="#c5ad7d" stroke="#927c58" strokeWidth="3"/><ellipse rx="57" ry="76" fill="#d6c49a"/>
            <path d="M0 61C-28 26-42-27-19-53-5-70 13-63 24-49 47-21 26 24 0 61Z" fill="#a5ad75" stroke="#829260" strokeWidth="2"/>
            <path d="M0 57 1-48m-2 16-19-13M0-15l23-22M0 5l-24-22M0 22l25-30M0 38l-17-14" stroke="#f2e6bd" strokeWidth="5" strokeLinecap="round"/>
            <path d="m-43-25 8-6m68 40 8-7m-72 44 7 3" stroke="#a88856" strokeWidth="4" strokeLinecap="round"/>
          </g>)}
        </g>}
        {art === "deodeok-gui" && <g transform="rotate(-19 300 186)">
          {[[249,172],[289,166],[332,178],[372,191]].map(([x,y],i)=><g key={x} transform={`translate(${x} ${y}) rotate(${i%2?5:-3})`}>
            <path d="M-13-65Q-24-24-17 35L0 65l15-26q11-68-4-104Z" fill="#b96547" stroke="#80462f" strokeWidth="2"/>
            <path d="M-5-54q-8 52 5 103M6-47q5 35-3 64" stroke="#dfad72" strokeWidth="3" strokeLinecap="round"/>
            <path d="m-14-21 25-3m-23 28 21-2m-15 22 13-2" stroke="#874a32" strokeWidth="4" strokeLinecap="round"/>
          </g>)}
          <path d="m255 148 13 7m41 68 12-5m19-86 13 4" stroke="#789064" strokeWidth="5" strokeLinecap="round"/>
          {[[269,189],[308,162],[344,220],[359,183],[285,136]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx="3" ry="1.5" transform={`rotate(25 ${x} ${y})`} fill="#fae1a5"/>)}
        </g>}
        {art === "corn-soup" && <g>
          <circle cx="300" cy="186" r="110" fill="#bd9f66"/><circle cx="300" cy="186" r="101" fill="#f1e4b7"/>
          <path d="M238 175c-7-42 121-57 124-8s-91 71-104 28 68-58 78-19-39 51-53 23" stroke="#fcf1d0" strokeWidth="9" strokeLinecap="round"/>
          {[[259,151],[279,143],[300,154],[271,170],[324,229],[342,219],[342,239],[361,230]].map(([x,y],i)=><path key={x+y} d="M-6-7q9-6 13 3l-2 10q-9 5-13-3Z" transform={`translate(${x} ${y}) rotate(${i*23})`} fill={i%2?"#e6cf91":"#fff2cb"} stroke="#c8af78" strokeWidth="1.5"/>)}
          <path d="M449 182v101" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".6"/><ellipse cx="449" cy="159" rx="13" ry="25" stroke={ink} strokeWidth="3" opacity=".6"/>
        </g>}
        {art === "sweet-potato-chicken" && <g>
          <circle cx="300" cy="186" r="109" fill="#b38456"/><circle cx="300" cy="186" r="98" fill="#8d593e"/>
          {[[239,150,-12],[301,125,18],[330,211,-18],[250,225,20],[371,178,12]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-23" y="-17" width="46" height="34" rx="12" fill="#c68f59" stroke="#714831" strokeWidth="2"/><path d="m-12-6 15-3m-8 18 15-3" stroke="#e3b87a" strokeWidth="3" strokeLinecap="round"/></g>)}
          {[[277,174,-28],[340,147,22],[300,252,58]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><ellipse rx="23" ry="32" fill="#93566b"/><ellipse rx="17" ry="26" fill="#edc365"/><path d="M-4-17q-10 15 0 32" stroke="#f8dda0" strokeWidth="4" strokeLinecap="round"/></g>)}
          <path d="m227 191 16-5m105 52 20-7m-79-95 12 4" stroke="#84966a" strokeWidth="6" strokeLinecap="round"/>
        </g>}
        {art === "pear-shrimp" && <g>
          {[[244,136,-38],[307,124,8],[357,166,48],[295,248,82],[235,217,8]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-17-26Q33-4 17 31-20 15-17-26Z" fill="#fbf2ce" stroke="#c4a35d" strokeWidth="3"/><path d="M-8-14 9 18" stroke="#fffbea" strokeWidth="4" strokeLinecap="round"/></g>)}
          {[[278,181,-15],[346,227,50],[236,175,-55]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M14-20C-28-36-36 28 5 23l-3-13C-16 16-17-7 7-6Z" fill="#eaa08a" stroke="#be715d" strokeWidth="2"/><path d="m-5-23-5 12m-16 1 12 4m-9 18 11-6" stroke="#fff0d9" strokeWidth="3"/><path d="m9-8 20-10-4 15Z" fill="#c87762"/></g>)}
          <path d="m261 226 11-24m55-20 8-25m-20 77 15-19" stroke="#75966c" strokeWidth="5" strokeLinecap="round"/><path d="m239 252 20-4m94-57 10 17m-88-67 12-9" stroke="#bb6953" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {art === "pine-noodles" && <g>
          <circle cx="300" cy="186" r="111" fill="#809397"/><circle cx="300" cy="186" r="101" fill="#f0e4c6"/>
          {Array.from({length:11},(_,i)=><path key={i} d={`M${230+i*10} 141C${351-i*5} ${114+i*12} ${210+i*12} ${248-i*6} ${363-i*6} 235`} stroke={i%2?"#b4a285":"#d2c3a5"} strokeWidth="4" strokeLinecap="round"/>)}
          <path d="m274 155 40 63m-29-70 44 62m-30-64 37 54" stroke="#758b65" strokeWidth="5" strokeLinecap="round"/>
          {[[242,169,-20],[337,148,30],[349,215,-30],[270,238,15],[295,187,30]].map(([x,y,r])=><path key={x} transform={`translate(${x} ${y}) rotate(${r})`} d="M0-9C-8-1-5 9 0 10 5 9 8-1 0-9Z" fill="#fcf0ce" stroke="#b4a07a" strokeWidth="1.5"/>)}
        </g>}
        {art === "tofu-hotpot" && <g>
          <path d="M191 172h-15v28h15m218-28h15v28h-15" stroke="#726257" strokeWidth="7" strokeLinejoin="round"/>
          <circle cx="300" cy="186" r="110" fill="#726257"/><circle cx="300" cy="186" r="100" fill="#d9be92"/>
          {[[239,142,-18],[305,132,10],[338,215,22],[253,227,-12]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-24" y="-20" width="48" height="40" rx="3" fill="#fff2d7" stroke="#bfa887" strokeWidth="2"/><path d="M-18 13h36" stroke="#e4d2af" strokeWidth="3"/></g>)}
          {[[355,154,25],[285,191,-25],[301,254,12]].map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-5-3H5l4 22H-9Z" fill="#ecdbbb"/><path d="M-24-2C-21-28 22-28 24-2q-24 13-48 0Z" fill="#917359"/><path d="m-10-10 10-5 11 5M0-19v15" stroke="#ead4b2" strokeWidth="2"/></g>)}
          <path d="m219 195 20 6m75-28 20 7m-10 45 14-6m-71 47 13-6" stroke="#839369" strokeWidth="6" strokeLinecap="round"/>
        </g>}
        {art === "pork-noodles" && <g><circle cx="300" cy="186" r="109" fill="#f7e5bb"/>{Array.from({length:8},(_,i)=><path key={i} d={`M${231+i*12} 143C${350-i*6} ${113+i*13} ${205+i*13} ${245-i*7} ${357-i*5} 243`} stroke="#fff8db" strokeWidth="5" strokeLinecap="round"/>)}{[0,1,2].map(i=><g key={i} transform={`translate(${235+i*46} ${133+i*3}) rotate(-18)`}><rect width="42" height="80" rx="11" fill="#aa7e59"/><rect x="5" y="5" width="32" height="70" rx="9" fill="#edcfac"/><path d="M10 28h22m-22 17h22m-22 14h22" stroke="#c09472" strokeWidth="6"/></g>)}<path d="m251 252 17-8m35 5 15 7m-34-30 10-10" stroke="#6e855a" strokeWidth="6" strokeLinecap="round"/></g>}
        {art === "fish-stew" && <g><circle cx="300" cy="185" r="113" fill="#566060"/><circle cx="300" cy="185" r="101" fill="#a84f30"/>{[0,1,2].map(i=><g key={i} transform={`translate(${231+i*47} ${139+i%2*15}) rotate(-12)`}><path d="M0 0h40v93H0Z" fill="#d4dbcc" stroke="#889b97" strokeWidth="3"/><path d="M10 0v93m20-93v93" stroke="#f0ebd5" strokeWidth="4"/><path d="M0 32h40m-40 28h40" stroke="#c17b55" strokeWidth="8"/></g>)}<path d="m235 254 28-7m61-123 23-8m11 135 18-10" stroke="#8d9a55" strokeWidth="7" strokeLinecap="round"/></g>}
        {art === "grilled-fish" && <g>{[0,1,2].map(i=><g key={i} transform={`translate(${230+i*68} 185) rotate(${i===1?8:-12})`}><path d="M0-88C-42-48-35 26 0 63 34 22 40-53 0-88Z" fill={i===1?"#d9cbaa":"#a7b9ae"} stroke="#647771" strokeWidth="3"/><path d="M0 60-17 91 0 82 17 91Z" fill="#79938d"/><path d="m-20-20 38 9m-35 12 32 9m-26 12 20 5" stroke="#ac804c" strokeWidth="6" strokeLinecap="round"/><path d="M0-64v118" stroke="#f5dfaa" strokeWidth="2"/><circle cx="9" cy="-58" r="3" fill={ink}/></g>)}</g>}
        {art === "citrus" && <g><path d="M225 124h150l-16 148q-60 34-118 0Z" fill="#fff8e7" stroke="#9c7140" strokeWidth="3"/><path d="m234 170 8 82q60 30 116 0l9-82Z" fill="#f8edcd"/><path d="m237 190 4 33q58 28 119 0l4-33q-62 20-127 0Z" fill="#efa243"/><path d="m243 254 2 17q57 28 113-1l1-17q-57 28-116 1Z" fill="#c6a176"/><ellipse cx="300" cy="127" rx="75" ry="22" fill="#e89739"/><path d="M262 122q34-34 67 0-32 31-67 0Z" fill="#ffcd77" stroke="#fff2c7" strokeWidth="2"/><path d="m296 107 1 30m-22-18 44 9m-39 8 34-22" stroke="#fff2c7" strokeWidth="2"/><circle cx="395" cy="243" r="31" fill="#eea13c"/><path d="m392 211 6-13m-1 6q16-19 26-7-7 12-26 7" stroke="#668657" strokeWidth="4" strokeLinecap="round"/></g>}
        {art === "gnocchi" && <g>
          <ellipse cx="300" cy="188" rx="106" ry="89" fill="#eac483" fillOpacity=".55" />
          {[[250, 136, -25], [302, 124, 12], [350, 151, 32], [237, 185, 16], [292, 177, -18], [344, 205, -10], [262, 230, 24], [315, 243, -25]].map(([x, y, angle]) => (
            <g key={x + y} transform={`translate(${x} ${y}) rotate(${angle})`}>
              <rect x="-22" y="-16" width="44" height="32" rx="13" fill="#e5a24d" stroke="#ac6c32" strokeWidth="2" />
              <path d="M-11-11q5 11 0 22M0-12q5 12 0 24M11-11q5 11 0 22" stroke="#f5cc7b" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
          <path d="m271 151 17-7m-51 63 15 5m77-44 12-10m-49 54 14 6" stroke="#708052" strokeWidth="5" strokeLinecap="round" />
          <path d="m273 128 7 4m37 21 8-2m-58 47 9 3m47 30 8-4m-67 19 8-3" stroke="#fff2cf" strokeWidth="4" strokeLinecap="round" />
        </g>}
        {art === "rice" && <g>
          {Array.from({ length: 50 }, (_, i) => { const angle = i * 2.399; const radius = 16 + Math.sqrt(i) * 13; return <ellipse key={i} cx={300 + Math.cos(angle) * radius} cy={188 + Math.sin(angle) * radius * .83} rx="9" ry="3.5" transform={`rotate(${i * 23} ${300 + Math.cos(angle) * radius} ${188 + Math.sin(angle) * radius * .83})`} fill="#fff9df" stroke="#c4a982" strokeWidth=".7" />; })}
          {[[252, 158, -22], [332, 212, 30], [337, 134, 14]].map(([x, y, r]) => <g key={x + y} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-9 0H9L14 48Q0 56-14 48Z" fill="#e9d8ba" stroke={accent} strokeWidth="2"/><path d="M-41 0C-44-42 40-42 42 0Q0 21-41 0Z" fill={accent}/><path d="M-20-9 0-16 21-8M0-25V-2" stroke="#e8ceb0" strokeWidth="3" strokeLinecap="round"/></g>)}
          <path d="m224 243 27-9m84-71 21 9m-67 86 25-13" stroke="#728257" strokeWidth="7" strokeLinecap="round"/>
        </g>}
        {art === "steak" && <g transform="rotate(-18 300 190)"><path d="M213 133C239 101 293 139 334 118S408 154 392 211 329 259 273 249 174 188 213 133Z" fill="#ae7152" stroke={accent} strokeWidth="9"/><path d="m232 145 118 74m-111-42 79 48m-55-91 96 63" stroke={ink} strokeWidth="7" strokeLinecap="round" opacity=".55"/><path d="m274 167 31-5 6 28-31 5Z" fill="#f3d285"/><path d="M204 251q35-39 60-10M357 104q35-19 45 12" stroke="#7b8c5b" strokeWidth="8" strokeLinecap="round"/></g>}
        {(art === "bowl" || art === "noodles") && <g><circle cx="300" cy="186" r="104" fill={to}/><circle cx="300" cy="186" r="94" fill="#d9ad69" fillOpacity=".65"/>{art === "noodles" ? Array.from({length:8},(_,i)=><path key={i} d={`M${228+i*12} 134 C${330-i*6} ${110+i*13}, ${210+i*13} ${245-i*7}, ${359-i*6} 239`} stroke="#f9e5ac" strokeWidth="5" strokeLinecap="round"/>) : Array.from({length:12},(_,i)=><rect key={i} x={225+(i*37)%128} y={128+(i*23)%106} width="26" height="20" rx="7" transform={`rotate(${i*17} ${238+(i*37)%128} ${138+(i*23)%106})`} fill={i%3===0 ? "#dfb35f" : i%3===1 ? "#b97558" : "#f3dbad"}/>)}<path d="m233 187 28 14m62 36 27-11m-54-90-27-10" stroke="#6c8252" strokeWidth="9" strokeLinecap="round"/><path d="m261 225 20-7m-15-48 11-4" stroke="#ae5336" strokeWidth="7" strokeLinecap="round"/></g>}
        {(art === "minchi" || art === "loco") && <g><ellipse cx="300" cy="190" rx="103" ry="84" fill="#fbedd0"/><ellipse cx="300" cy="188" rx="92" ry="66" fill="#8b5d42"/>{art === "minchi" && Array.from({length:16},(_,i)=><rect key={i} x={226+(i*41)%132} y={133+(i*23)%94} width="17" height="16" rx="3" fill={i%2 ? "#8a5740" : "#d4aa65"}/>)}<path d="M284 140c40-35 84 6 75 38 21 40-26 70-60 44-45 10-57-54-15-82Z" fill="#fff6dc"/><circle cx="316" cy="181" r="27" fill="#dba145"/></g>}
        {art === "bread" && <g transform="rotate(-25 300 185)"><rect x="202" y="127" width="198" height="121" rx="49" fill="#bc874d" stroke={accent} strokeWidth="3"/><path d="M220 190h162" stroke="#648253" strokeWidth="15"/><path d="M221 199h158" stroke="#c26d4d" strokeWidth="8"/><path d="M203 181c8-95 182-94 197 0" fill="#e8ba73"/><path d="m248 138 15 32m26-43 15 34m28-30 15 28" stroke="#fff0c4" strokeWidth="8" strokeLinecap="round"/></g>}
        {art === "toast" && <g transform="rotate(-15 300 186)"><rect x="207" y="121" width="186" height="147" rx="24" fill="#ac7544"/><rect x="213" y="114" width="174" height="137" rx="19" fill="#e9b975"/><rect x="220" y="108" width="160" height="126" rx="16" fill="#f6dc96" stroke="#b58b50" strokeWidth="5"/>{[0,1,2,3,4,5].map(i=><ellipse key={i} cx={245+(i*29)%112} cy={135+(i*31)%75} rx="10" ry="6" fill="#ae7445"/>)}</g>}
        {art === "potato" && <g><ellipse cx="300" cy="189" rx="105" ry="88" fill="#ca984c" stroke={accent} strokeWidth="3"/>{Array.from({length:22},(_,i)=><path key={i} d={`m${228+(i*37)%140} ${126+(i*19)%115} 27 13`} stroke={i%3===0 ? accent : "#f2d995"} strokeWidth="4" strokeLinecap="round"/>)}<path d="m305 148-12 91m-1-59-24-9m31 34 28-11" stroke="#6a8052" strokeWidth="5"/></g>}
        {art === "dessert" && <g><path d="m206 165 91-51 106 54-9 80-94 31-90-40Z" fill="#cd9957" stroke={accent} strokeWidth="3"/><path d="m214 176 87 38 91-36-3 34-88 34-87-35Z" fill="#fbebcb"/><path d="m206 165 94 42 103-39-106-54Z" fill="#a46a42"/><path d="m238 158 65 27 63-23-66-28Z" fill="#e8bf77"/><path d="m246 160 11-4m49 6 12 6m13-22 10 4" stroke={accent} strokeWidth="6" strokeLinecap="round"/></g>}
        {art === "tart" && <g><path d="m218 160 13 91q69 51 139 0l13-91Z" fill="#b77c45"/><ellipse cx="300" cy="164" rx="91" ry="75" fill="#e0ab60" stroke="#a26a36" strokeWidth="6"/><ellipse cx="300" cy="164" rx="73" ry="58" fill="#f4d388"/>{[0,1,2,3,4,5,6].map(i=><ellipse key={i} cx={259+(i*29)%88} cy={130+(i*19)%61} rx={i%2 ? 11 : 7} ry="5" transform={`rotate(${i*31} ${259+(i*29)%88} ${130+(i*19)%61})`} fill="#855038"/>)}</g>}
        {art === "drink" && <g><path d="M226 140h136l-14 119q-55 35-108 0Z" fill="#fff1d9" stroke={accent} strokeWidth="4"/><path d="M364 155c74-17 65 87-11 69" stroke={accent} strokeWidth="12"/><ellipse cx="294" cy="142" rx="67" ry="24" fill="#a97240" stroke={accent} strokeWidth="4"/><path d="M268 104q-23-23 0-48m43 48q-23-23 0-48" stroke={ink} strokeOpacity=".4" strokeWidth="3" strokeLinecap="round"/></g>}
        {art !== "barley-soup" && art !== "corn-soup" && art !== "jujube-porridge" && (["salmon-chanchan", "ginseng-soup", "chili-tteok", "crab-custard", "oyster-jeon", "spinach-soup", "octopus-soup", "cockle-rice", "rice", "bowl", "noodles", "sweet-potato-chicken", "pear-shrimp", "pine-noodles", "tofu-hotpot", "ongsimi", "cabbage-jeon", "deodeok-gui", "salt-shrimp", "ginger-pork", "perilla-kalguksu"].includes(art) ? <path d="M453 113 486 283M466 107 500 279" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".6"/> : <path d="M458 132v152m-10-166v31q10 18 20 0v-31m-10 0v38m34-38v166m0-166q30 55 0 72" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".6"/>)}
      </svg>
      <div className="artwork-caption"><strong>{label}</strong><span>{design.caption}</span></div>
    </div>
  );
}
