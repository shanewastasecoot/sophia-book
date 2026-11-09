/* Book 3 art: Scorch the dragon (and baby Flicker), fire, the glowing egg, and Thornwall's stone castle.
   These are placeholder scenes until the painted pictures arrive (img/scorch/<page>.webp). */
(function (SB) {
  const A = SB.art, { OL } = A;

  A.addDefs(`
    <linearGradient id="skyEmber" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1220"/><stop offset=".55" stop-color="#b8402a"/><stop offset="1" stop-color="#ffb35a"/></linearGradient>
    <linearGradient id="skyMorning" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec8ff"/><stop offset="1" stop-color="#fff1c9"/></linearGradient>
    <radialGradient id="eggGlow"><stop offset="0" stop-color="#fff2a8"/><stop offset=".6" stop-color="#ffb347" stop-opacity=".6"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>
    <linearGradient id="fireG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff3a0"/><stop offset=".45" stop-color="#ffb02e"/><stop offset="1" stop-color="#ff4a1c" stop-opacity=".2"/></linearGradient>`);

  const sky = kind => `<rect width="800" height="500" fill="url(#${kind === 'morning' ? 'skyMorning' : 'skyEmber'})"/>`;
  const hills = (c1 = '#6a8f3e', c2 = '#4f7a30') =>
    `<path d="M0 380Q140 320 300 370T620 350T800 360V500H0Z" fill="${c1}" stroke="${OL}" stroke-width="3"/>
     <path d="M0 430Q200 390 420 430T800 420V500H0Z" fill="${c2}" stroke="${OL}" stroke-width="3"/>`;
  const smoke = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" class="floaty" opacity=".75"><circle r="34" fill="#5b5560"/><circle cx="28" cy="-26" r="30" fill="#6e6873"/><circle cx="-10" cy="-58" r="26" fill="#7e7883"/><circle cx="18" cy="-90" r="20" fill="#8e8893"/></g>`;

  /* ---------- Thornwall: a gray stone castle. Origin at the bottom middle. ---------- */
  function stoneCastle(x, y, s = 1, opts = {}) {
    const st = `stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"`;
    const crenel = (x0, w, top) => Array.from({ length: Math.floor(w / 24) }, (_, k) => `<rect x="${x0 + k * 24}" y="${top - 14}" width="14" height="14" fill="#9a96a3" ${st}/>`).join('');
    const brick = (x0, y0, w, h) => `<path d="${Array.from({ length: Math.floor(h / 22) }, (_, k) => `M${x0} ${y0 + k * 22 + 22}h${w}`).join('')}" stroke="#7d7987" stroke-width="2"/>`;
    const glow = opts.glowWindow ? `<circle cx="120" cy="-270" r="34" fill="url(#eggGlow)" class="twinkle"/>` : '';
    const broken = opts.broken ? `<path d="M-200 -160L-170 -190L-150 -160L-130 -200L-110 -150V0H-200Z" fill="#9a96a3" ${st}/>` : `<rect x="-200" y="-230" width="80" height="230" fill="#a6a2ae" ${st}/>${crenel(-200, 80, -230)}`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-150" y="-150" width="300" height="150" fill="#b4b0bb" ${st}/>${brick(-150, -150, 300, 150)}${crenel(-150, 300, -150)}
      ${broken}
      <rect x="80" y="-320" width="80" height="320" fill="#a6a2ae" ${st}/>${crenel(80, 80, -320)}
      <path d="M100 -290v-26a20 20 0 0 1 40 0v26Z" fill="${opts.glowWindow ? '#ffd27a' : '#3a3442'}" ${st}/>
      <path d="M100 -290v-26a20 20 0 0 1 40 0v26M120 -336v46M100 -303h40" fill="none" stroke="${OL}" stroke-width="2.5"/>
      ${glow}
      <path d="M-30 0V-60Q0 -96 30 -60V0Z" fill="#4a2f22" ${st}/>
      <path d="M150 -150h50v150h-50" fill="#a6a2ae" ${st}/>
      <path d="M140 -322v-40l24 10-24 10" fill="#3f8f52" stroke="${OL}" stroke-width="2.5"/>
    </g>`;
  }

  /* ---------- Fire breath: a cone of flame from (x1,y1) toward (x2,y2) ---------- */
  function flame(x1, y1, x2, y2, w = 60) {
    const a = Math.atan2(y2 - y1, x2 - x1), len = Math.hypot(x2 - x1, y2 - y1), deg = a * 180 / Math.PI;
    return `<g transform="translate(${x1} ${y1}) rotate(${deg})" class="floaty">
      <path d="M0 0Q${len * .3} ${-w * .35} ${len * .55} ${-w * .7}Q${len * .8} ${-w} ${len} ${-w * .4}Q${len * .9} 0 ${len} ${w * .4}Q${len * .8} ${w} ${len * .55} ${w * .7}Q${len * .3} ${w * .35} 0 0Z" fill="url(#fireG)" stroke="#c2410c" stroke-width="3"/>
      <path d="M0 0Q${len * .3} ${-w * .15} ${len * .5} ${-w * .3}Q${len * .7} 0 ${len * .5} ${w * .3}Q${len * .3} ${w * .15} 0 0Z" fill="#fff6c2" opacity=".9"/>
    </g>`;
  }

  /* ---------- The egg ---------- */
  const egg = (x, y, s = 1, cracked = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cy="-40" r="80" fill="url(#eggGlow)" class="twinkle"/>
    <ellipse cy="-40" rx="34" ry="44" fill="#f2a33a" stroke="${OL}" stroke-width="3.5"/>
    <g fill="#d9361e"><circle cx="-12" cy="-58" r="6"/><circle cx="12" cy="-34" r="7"/><circle cx="-8" cy="-18" r="5"/><circle cx="16" cy="-66" r="4"/></g>
    ${cracked ? `<path d="M-30 -46l12 -8 8 10 10 -12 10 10 12 -6" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>` : ''}
  </g>`;

  /* ---------- Scorch: a chibi red-and-gold dragon, facing right. Origin at her feet, about 300 tall at scale 1.
     mood: angry | laugh | calm | sad.  baby: true draws Flicker (big head, little wings). ---------- */
  function dragon(o) {
    const p = Object.assign({ x: 400, y: 470, s: 1, mood: 'angry', flip: false, cls: 'bob', baby: false, wingsUp: true }, o);
    const st = `stroke="${OL}" stroke-width="${p.baby ? 4.5 : 3.5}" stroke-linejoin="round"`;
    const red = '#d9361e', red2 = '#a8261a', gold = '#ffc23d';
    const hr = p.baby ? 78 : 62; // head radius
    const hx = p.baby ? 70 : 150, hy = p.baby ? -170 : -210;
    let g = '';
    // tail
    g += `<path d="M-100 -60Q-220 -40 -250 -120Q-262 -150 -236 -150" fill="none" stroke="${OL}" stroke-width="36" stroke-linecap="round"/>
      <path d="M-100 -60Q-220 -40 -250 -120Q-262 -150 -236 -150" fill="none" stroke="${red}" stroke-width="28" stroke-linecap="round"/>
      <path d="M-236 -150l-26 -28 34 4Z" fill="${gold}" ${st}/>`;
    // back wing
    const wing = (dx, sc) => p.wingsUp
      ? `<g transform="translate(${dx} 0) scale(${sc})"><path d="M-20 -150Q-60 -330 60 -360Q40 -300 90 -280Q60 -250 100 -220Q40 -200 40 -150Z" fill="${red2}" ${st}/><path d="M-20 -150Q10 -290 60 -360M-10 -150Q40 -260 90 -280M0 -150Q50 -210 100 -220" fill="none" stroke="${OL}" stroke-width="2.5"/></g>`
      : `<g transform="translate(${dx} 0) scale(${sc})"><path d="M-30 -150Q-150 -200 -170 -100Q-120 -120 -110 -80Q-80 -110 -60 -70Q-50 -110 -10 -110Z" fill="${red2}" ${st}/></g>`;
    g += wing(-30, p.baby ? .45 : 1);
    // legs, body, belly
    g += `<ellipse cx="-60" cy="-18" rx="34" ry="22" fill="${red2}" ${st}/><ellipse cx="60" cy="-18" rx="34" ry="22" fill="${red2}" ${st}/>
      <ellipse cx="0" cy="-100" rx="${p.baby ? 80 : 120}" ry="${p.baby ? 70 : 85}" fill="${red}" ${st}/>
      <ellipse cx="${p.baby ? 10 : 30}" cy="-86" rx="${p.baby ? 46 : 70}" ry="${p.baby ? 44 : 56}" fill="${gold}" ${st}/>
      <path d="M${p.baby ? -24 : -28} -110h${p.baby ? 60 : 110}M${p.baby ? -28 : -34} -86h${p.baby ? 70 : 126}M${p.baby ? -22 : -26} -62h${p.baby ? 62 : 112}" stroke="#d9901f" stroke-width="3"/>`;
    // spikes along the back
    if (!p.baby) g += [[-100, -150], [-60, -178], [-14, -186], [32, -182]].map(([sx, sy]) => `<path d="M${sx - 14} ${sy + 8}L${sx} ${sy - 22}L${sx + 14} ${sy + 8}Z" fill="${gold}" ${st}/>`).join('');
    // front wing
    g += wing(20, p.baby ? .5 : 1.05);
    // neck and head
    g += `<path d="M60 -140Q${hx - 20} ${hy + 40} ${hx} ${hy}" fill="none" stroke="${OL}" stroke-width="${p.baby ? 0 : 66}" stroke-linecap="round"/>
      <path d="M60 -140Q${hx - 20} ${hy + 40} ${hx} ${hy}" fill="none" stroke="${red}" stroke-width="${p.baby ? 0 : 58}" stroke-linecap="round"/>
      <path d="M${hx - 30} ${hy - hr + 10}L${hx - 50} ${hy - hr - 40}L${hx - 10} ${hy - hr + 4}Z" fill="${gold}" ${st}/>
      <path d="M${hx + 18} ${hy - hr + 6}L${hx + 24} ${hy - hr - 44}L${hx + 40} ${hy - hr + 18}Z" fill="${gold}" ${st}/>
      <circle cx="${hx}" cy="${hy}" r="${hr}" fill="${red}" ${st}/>
      <ellipse cx="${hx + hr * .78}" cy="${hy + hr * .32}" rx="${hr * .62}" ry="${hr * .45}" fill="${red}" ${st}/>
      <circle cx="${hx + hr * 1.1}" cy="${hy + hr * .16}" r="4" fill="${OL}"/><circle cx="${hx + hr * .92}" cy="${hy + hr * .1}" r="4" fill="${OL}"/>`;
    // face by mood
    const ex = hx + hr * .1, ey = hy - hr * .22, er = p.baby ? 20 : 15;
    if (p.mood === 'laugh') {
      g += `<path d="M${ex - er} ${ey}q${er} -${er * 1.1} ${er * 2} 0M${ex + er * 2.2} ${ey}q${er} -${er * 1.1} ${er * 2} 0" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>
        <path d="M${hx + hr * .3} ${hy + hr * .5}Q${hx + hr * .9} ${hy + hr * 1.25} ${hx + hr * 1.35} ${hy + hr * .55}Z" fill="#7a1420" ${st}/>
        <path d="M${hx + hr * .55} ${hy + hr * .78}q14 10 26 2" fill="#ff7a8a" stroke="none"/>`;
    } else {
      for (const k of [0, 1]) {
        const cx = ex + k * er * 2.6;
        g += `<ellipse cx="${cx}" cy="${ey}" rx="${er}" ry="${er * 1.15}" fill="#fff" ${st}/><circle cx="${cx + er * .3}" cy="${ey + 2}" r="${er * .62}" fill="#ffb000" stroke="${OL}" stroke-width="2"/>
          <ellipse cx="${cx + er * .3}" cy="${ey + 2}" rx="${er * .2}" ry="${er * .5}" fill="${OL}"/><circle cx="${cx + er * .45}" cy="${ey - er * .3}" r="${er * .22}" fill="#fff"/>`;
      }
      if (p.mood === 'angry') g += `<path d="M${ex - er * 1.2} ${ey - er * 1.5}L${ex + er} ${ey - er * .7}M${ex + er * 3.8} ${ey - er * 1.5}L${ex + er * 1.6} ${ey - er * .7}" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>
        <path d="M${hx + hr * .3} ${hy + hr * .6}L${hx + hr * 1.3} ${hy + hr * .55}" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
        <path d="M${hx + hr * .5} ${hy + hr * .58}l6 12 6 -12M${hx + hr * .9} ${hy + hr * .57}l6 12 6 -12" fill="#fff" stroke="${OL}" stroke-width="2"/>`;
      if (p.mood === 'sad') g += `<path d="M${ex - er} ${ey - er * 1.3}L${ex + er} ${ey - er * 1.7}M${ex + er * 3.6} ${ey - er * 1.3}L${ex + er * 1.6} ${ey - er * 1.7}" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>
        <path d="M${hx + hr * .4} ${hy + hr * .66}q${hr * .4} -${hr * .2} ${hr * .8} 0" fill="none" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
        <path d="M${ex - er * .2} ${ey + er * 1.3}q8 16 0 22q-8 -6 0 -22Z" fill="#9fe8ff" stroke="${OL}" stroke-width="2.5"/>`;
      if (p.mood === 'calm') g += `<path d="M${hx + hr * .4} ${hy + hr * .62}q${hr * .4} ${hr * .26} ${hr * .8} 0" fill="none" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="${ex - er * .4}" cy="${ey + er * 1.6}" rx="${er * .7}" ry="${er * .4}" fill="#ff8aa0" opacity=".6"/>`;
    }
    const flip = p.flip ? ' scale(-1 1)' : '';
    return `<g transform="translate(${p.x} ${p.y}) scale(${p.s})${flip}"><g class="${p.cls}">${g}</g></g>`;
  }
  const flicker = o => dragon({ baby: true, mood: 'calm', ...o });
  // where Scorch's mouth is, so fire lines up: dragon({x,y,s}) then flame from mouthOf(...)
  const mouthOf = (x, y, s = 1, flip = false) => [x + (flip ? -1 : 1) * 245 * s, y - 180 * s];

  Object.assign(A, { emberSky: sky, emberHills: hills, smokePlume: smoke, stoneCastle, flame, egg, dragon, flicker, mouthOf });
})(window.SB);
