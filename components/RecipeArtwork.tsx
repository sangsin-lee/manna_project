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
        {art !== "corn-soup" && art !== "jujube-porridge" && (["rice", "bowl", "noodles", "sweet-potato-chicken", "pear-shrimp", "pine-noodles", "tofu-hotpot", "ongsimi", "cabbage-jeon", "deodeok-gui", "salt-shrimp", "ginger-pork", "perilla-kalguksu"].includes(art) ? <path d="M453 113 486 283M466 107 500 279" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".6"/> : <path d="M458 132v152m-10-166v31q10 18 20 0v-31m-10 0v38m34-38v166m0-166q30 55 0 72" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".6"/>)}
      </svg>
      <div className="artwork-caption"><strong>{label}</strong><span>{design.caption}</span></div>
    </div>
  );
}
