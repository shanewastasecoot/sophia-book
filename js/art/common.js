/* Shared art: the cast (chibi princesses, Grumbo), props, and small drawing helpers.
   Every scene is an SVG fragment drawn in an 800 x 500 box; the reader wraps it in <svg>.
   Gradients and filters live in ONE shared <defs> block (SB.art.addDefs) so pages never duplicate ids. */
(function (SB) {
  const OL = '#3a1d4f';   // outline for princesses and props
  const OLG = '#120e3a';  // outline for Grumbo
  const defs = [];
  const addDefs = s => defs.push(s);

  addDefs(`
    <linearGradient id="blade" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c49bff"/><stop offset=".5" stop-color="#ffb3e6"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
    <radialGradient id="gBody" cx=".42" cy=".32" r=".8"><stop offset="0" stop-color="#6676ff"/><stop offset="1" stop-color="#232a96"/></radialGradient>
    <linearGradient id="spotPink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff4fa3" stop-opacity=".55"/><stop offset="1" stop-color="#ff4fa3" stop-opacity="0"/></linearGradient>
    <linearGradient id="spotCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ff2ff" stop-opacity=".5"/><stop offset="1" stop-color="#5ff2ff" stop-opacity="0"/></linearGradient>
    <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff4fa3"/><stop offset=".33" stop-color="#ffc83d"/><stop offset=".66" stop-color="#5ff2ff"/><stop offset="1" stop-color="#b06cff"/></linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <!-- Hand-inked jitter: a slow warp bends straight lines like a wobbly pen, then a fine grit
         roughens the edges like pencil on paper. Used on scenes (SVG) and UI frames (CSS filter: url()). -->
    <filter id="sketch-filter" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="7" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" xChannelSelector="R" yChannelSelector="G" result="wobbly"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="3" result="grit"/>
      <feDisplacementMap in="wobbly" in2="grit" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`);

  /* ---------- Cast (change colors here) ---------- */
  const cast = {
    SOPHIA: { hair: 'curly', hairC: '#4e2b1a', hairHi: '#7d4e30', skin: '#c49f78', eye: '#6b3f22', dress: '#9b4fe0', dress2: '#ff7ac1', shoe: '#ff4fa3', tail: '#9b4fe0', fin: '#ff7ac1' },
    LUNA:   { hair: 'straight', hairC: '#1e1a3a', hairHi: '#3a3470', skin: '#a8714f', eye: '#3b2418', dress: '#3f6fd8', dress2: '#bcd4ff', shoe: '#2c4fa8', clip: true, tail: '#3f8fd8', fin: '#bcd4ff' },
    RUBY:   { hair: 'buns', hairC: '#c4421f', hairHi: '#e46a3a', skin: '#f3d3ba', eye: '#3f7a3a', dress: '#e0314f', dress2: '#ffb340', shoe: '#a81d39', tail: '#e0314f', fin: '#ffb340' },
  };

  /* ---------- Small helpers ---------- */
  const star4 = (x, y, r, fill, cls = '') =>
    `<path class="${cls}" d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${fill}"/>`;
  const note = (x, y, size, fill, glyph = '♪') =>
    `<g class="floaty"><text x="${x}" y="${y}" font-size="${size}" fill="${fill}" stroke="${OL}" stroke-width="2" paint-order="stroke" font-family="Segoe UI Symbol, Apple Symbols, sans-serif" font-weight="700">${glyph}</text></g>`;
  function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  const word = (x, y, s, txt, fill, rot = 0, stroke = OL) => `<g transform="translate(${x} ${y}) rotate(${rot})"><text text-anchor="middle" font-family="Grandstander, sans-serif" font-weight="900" font-size="${s}" fill="${fill}" stroke="${stroke}" stroke-width="${s / 8}" paint-order="stroke" stroke-linejoin="round">${txt}</text></g>`;
  const sparkles = (pts, c = '#ffd65a') => pts.map(([x, y, r]) => star4(x, y, r || 9, c, 'twinkle')).join('');
  const heart = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" class="floaty"><path d="M0 -6c-10 -14 -30 -4 -20 12l20 18 20 -18c10 -16 -10 -26 -20 -12Z" fill="${c}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/></g>`;
  const spot = (x1, x2, grad) => `<path d="M${x1} -10 L${x2 - 70} 500 L${x2 + 70} 500 Z" fill="url(#${grad})"/>`;
  const bird = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" class="floaty"><g stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"><circle r="15" fill="${c}"/><path d="M-4 -2q-14 -16 -22 2Z" fill="${c}"/><path d="M13 -3l12 4-12 4Z" fill="#ffb340"/></g><circle cx="5" cy="-5" r="3" fill="${OL}"/></g>`;
  const iceCream = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" class="floaty"><g stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"><path d="M-15 0L0 40L15 0Z" fill="#e8b46a"/><circle cx="-7" cy="-6" r="12" fill="#ff9ad0"/><circle cx="8" cy="-8" r="12" fill="#c9f2ff"/><circle cx="0" cy="-20" r="11" fill="#fff3a6"/><circle cx="0" cy="-33" r="5" fill="#e0314f"/></g></g>`;
  const zzz = (x, y, s, c = '#fff') => `<g class="floaty"><text x="${x}" y="${y}" font-family="Grandstander, sans-serif" font-weight="900" font-size="${s}" fill="${c}" stroke="${OL}" stroke-width="3" paint-order="stroke">Z<tspan font-size="${s * .75}" dy="-8">z</tspan><tspan font-size="${s * .55}" dy="-8">z</tspan></text></g>`;
  const stink = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" class="floaty" opacity=".85"><g stroke="#3f7a1f" stroke-width="3"><circle r="22" fill="#9be15d"/><circle cx="22" cy="-8" r="18" fill="#b5ef6e"/><circle cx="-18" cy="-12" r="16" fill="#86d04a"/></g><path d="M-6 -40q-8 -10 0 -20M8 -40q8 -10 0 -20" stroke="#86d04a" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;

  const crown = (cx, by, w) => `<path d="M${cx - w} ${by}L${cx - w} ${by - 15}L${cx - w / 2} ${by - 6}L${cx} ${by - 20}L${cx + w / 2} ${by - 6}L${cx + w} ${by - 15}L${cx + w} ${by}Z" fill="#ffc83d" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${cx}" cy="${by - 6}" r="${w / 5}" fill="#ff4fa3"/>`;
  function sword(hx, hy, ang) {
    return `<g transform="translate(${hx} ${hy}) rotate(${ang})">
      <rect x="-4" y="-2" width="8" height="16" rx="3.5" fill="#b06cff" stroke="${OL}" stroke-width="2"/><circle cx="0" cy="16" r="5.5" fill="#ffd34d" stroke="${OL}" stroke-width="2"/>
      <path d="M-7 -9L-7 -86L0 -101L7 -86L7 -9Z" fill="url(#blade)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round" filter="url(#glow)"/>
      <path d="M0 -15V-88" stroke="#fff" stroke-width="2" opacity=".9"/>
      <rect x="-17" y="-11" width="34" height="8" rx="4" fill="#ffd34d" stroke="${OL}" stroke-width="2"/><circle cx="0" cy="-7" r="3.5" fill="#ff4fa3"/>
    </g>`;
  }
  function drum(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><g stroke="${OL}" stroke-width="3" stroke-linejoin="round">
      <path d="M-36 -62V-4A36 9 0 0 0 36 -4V-62Z" fill="#e0314f"/>
      <path d="M-36 -52L-24 -16L-12 -52L0 -16L12 -52L24 -16L36 -52" stroke="#ffd34d" stroke-width="4" fill="none"/>
      <ellipse cx="0" cy="-62" rx="36" ry="10" fill="#fff4e0"/>
    </g></g>`;
  }

  /* ---------- Chibi princess: big head, small body. Origin at her feet, about 230 tall at scale 1.
     Pass mermaid: true for a tail instead of legs and skirt. ---------- */
  const POSES = {
    up:   { L: [-38, -56],  R: [62, -112] },
    sing: { L: [-38, -56],  R: [28, -96], front: true },
    drum: { L: [-34, -50],  R: [34, -50] },
    wave: { L: [-64, -118], R: [64, -118] },
    nose: { L: [-7, -114],  R: [7, -114], front: true },
    hold: { L: [-38, -56],  R: [48, -70] },
  };
  const ring = (r, angles) => angles.map(a => [Math.round(r * Math.cos(a * Math.PI / 180)), Math.round(-140 - r * Math.sin(a * Math.PI / 180))]);
  const CURLS = [...ring(58, [235, 215, 190, 165, 140, 115, 90, 65, 40, 15, -10, -35, -55]), [-72, -140], [72, -140], [-68, -112], [68, -112], [-58, -88], [58, -88]];
  const BANGS = [[-34, -178], [-17, -187], [0, -190], [17, -187], [34, -178], [-47, -162], [47, -162]];

  function princess(o) {
    const p = Object.assign({ x: 400, y: 450, s: 1, pose: 'up', prop: null, cls: '', hairCls: '', mermaid: false }, o);
    const P = POSES[p.pose];
    const { skin: sk, dress: d, dress2: d2, hairC: h, hairHi: hh } = p;
    const st = `stroke="${OL}" stroke-width="3" stroke-linejoin="round"`;
    let g = '';
    if (p.hair === 'curly') {
      g += `<g class="${p.hairCls}">` + CURLS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="21" fill="${h}" ${st}/>`).join('')
        + CURLS.map(([x, y]) => `<path d="M${x - 8} ${y + 4}q8 -12 16 0" stroke="${hh}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`).join('') + `</g>`;
    } else if (p.hair === 'straight') {
      g += `<path d="M-60 -140Q-63 -206 0 -206Q63 -206 60 -140L66 -78Q0 -66 -66 -78Z" fill="${h}" ${st}/>`;
    } else {
      g += `<circle cx="-48" cy="-190" r="24" fill="${h}" ${st}/><circle cx="48" cy="-190" r="24" fill="${h}" ${st}/>`;
    }
    if (p.mermaid) {
      g += `<path d="M0 -20Q-28 -16 -50 2Q-22 6 0 -6Q22 6 50 2Q28 -16 0 -20Z" fill="${p.fin}" ${st}/>
        <path d="M-22 -78Q-38 -40 -12 -20Q0 -12 12 -20Q38 -40 22 -78Z" fill="${p.tail}" ${st}/>
        <path d="M-14 -58q5 6 10 0q5 6 10 0q5 6 10 0M-10 -44q5 6 10 0q5 6 10 0" stroke="#ffffff99" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else {
      g += `<rect x="-14" y="-24" width="11" height="22" rx="5" fill="${d2}" ${st}/><rect x="3" y="-24" width="11" height="22" rx="5" fill="${d2}" ${st}/>
        <ellipse cx="-10" cy="-4" rx="12" ry="6.5" fill="${p.shoe}" ${st}/><ellipse cx="10" cy="-4" rx="12" ry="6.5" fill="${p.shoe}" ${st}/>
        <path d="M-20 -74L20 -74Q54 -42 52 -20Q0 -6 -52 -20Q-54 -42 -20 -74Z" fill="${d}" ${st}/>
        <path d="M-52 -20Q0 -6 52 -20L51 -30Q0 -17 -51 -30Z" fill="${d2}"/>
        ${[[-30, -36], [12, -52], [32, -34], [-8, -30], [-14, -58]].map(([x, y]) => star4(x, y, 4.5, '#fff')).join('')}`;
    }
    const arm = (sx, [hx, hy]) => `<path d="M${sx} -80L${hx} ${hy}" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M${sx} -80L${hx} ${hy}" stroke="${sk}" stroke-width="7.5" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="7.5" fill="${sk}" stroke="${OL}" stroke-width="2.5"/>`;
    g += arm(-14, P.L) + arm(14, P.R);
    g += `<path d="M-16 -92Q0 -96 16 -92L21 -72L-21 -72Z" fill="${d2}" ${st}/>
      <rect x="-22" y="-77" width="44" height="7" rx="3.5" fill="#ffd34d" ${st} stroke-width="2"/><circle cx="0" cy="-73.5" r="3.5" fill="#ff4fa3"/>
      <circle cx="-18" cy="-86" r="9" fill="${d}" ${st}/><circle cx="18" cy="-86" r="9" fill="${d}" ${st}/>
      <circle cx="0" cy="-140" r="52" fill="${sk}" ${st}/>`;
    if (p.pose === 'nose') {
      g += `<path d="M-28 -140l12 7-12 7M28 -140l-12 7 12 7" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M-11 -103q5.5 -6 11 0t11 0" stroke="${OL}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    } else {
      for (const ex of [-20, 20]) {
        g += `<ellipse cx="${ex}" cy="-132" rx="10" ry="13" fill="${OL}"/><ellipse cx="${ex}" cy="-128" rx="7.5" ry="8.5" fill="${p.eye}"/>
          <circle cx="${ex + 3.5}" cy="-137" r="4.2" fill="#fff"/><circle cx="${ex - 3.5}" cy="-125" r="2" fill="#fff"/>
          <path d="M${ex + (ex > 0 ? 8 : -8)} -142l${ex > 0 ? 6 : -6} -5" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>`;
      }
      g += p.pose === 'sing'
        ? `<ellipse cx="0" cy="-106" rx="6.5" ry="8.5" fill="#8a1f3d" stroke="${OL}" stroke-width="2.5"/>`
        : `<path d="M-10 -110Q0 -95 10 -110Z" fill="#8a1f3d" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`;
    }
    g += `<ellipse cx="-34" cy="-113" rx="9" ry="5.5" fill="#ff6f9f" opacity=".55"/><ellipse cx="34" cy="-113" rx="9" ry="5.5" fill="#ff6f9f" opacity=".55"/>`;
    let crownY = -194;
    if (p.hair === 'curly') {
      g += `<g class="${p.hairCls}">` + BANGS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="${h}" ${st}/><path d="M${x - 6} ${y + 3}q6 -9 12 0" stroke="${hh}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('') + `</g>`;
      crownY = -212;
    } else {
      g += `<path d="M-54 -146Q-56 -196 0 -196Q56 -196 54 -146Q30 -170 0 -166Q-30 -170 -54 -146Z" fill="${h}" ${st}/>`;
      if (p.clip) g += `<path d="M30 -186a10 10 0 1 0 13 13a8 8 0 1 1 -13 -13Z" fill="#ffd65a" ${st} stroke-width="2"/>`;
      if (p.hair === 'buns') g += `<path d="M-70 -172l-10 10M70 -172l10 10" stroke="#ffd34d" stroke-width="5" stroke-linecap="round"/>`;
    }
    g += crown(0, crownY, 20);
    if (P.front) g += [P.L, P.R].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${sk}" stroke="${OL}" stroke-width="2.5"/>`).join('');
    if (p.prop === 'sword') g += sword(P.R[0], P.R[1], p.pose === 'up' ? 18 : 40);
    if (p.prop === 'mic') g += `<g transform="translate(${P.R[0]} ${P.R[1]}) rotate(-35)"><rect x="-3.5" y="-6" width="7" height="22" rx="3.5" fill="#3a2a55" stroke="${OL}" stroke-width="2"/><circle cx="0" cy="-12" r="9" fill="#dfe6ff" stroke="${OL}" stroke-width="2.5"/></g>`;
    if (p.prop === 'sticks') g += `<g stroke="#f5d9a8" stroke-width="4.5" stroke-linecap="round"><path d="M${P.L[0]} ${P.L[1]}l14 16"/><path d="M${P.R[0]} ${P.R[1]}l-14 16"/></g><circle cx="${P.L[0] + 14}" cy="${P.L[1] + 16}" r="4.5" fill="#ffd34d" stroke="${OL}" stroke-width="1.5"/><circle cx="${P.R[0] - 14}" cy="${P.R[1] + 16}" r="4.5" fill="#ffd34d" stroke="${OL}" stroke-width="1.5"/>`;
    return `<g transform="translate(${p.x} ${p.y}) scale(${p.s})"><g class="${p.cls}">${g}</g></g>`;
  }

  /* ---------- Grumbo: round chibi shadow demon. Origin at his feet, about 330 tall at scale 1. ---------- */
  function grumbo(o) {
    const p = Object.assign({ x: 600, y: 480, s: 1, mood: 'grin', cls: 'bob', crown: false }, o);
    const st = `stroke="${OLG}" stroke-width="6" stroke-linejoin="round"`;
    let g = `<ellipse cx="-152" cy="-112" rx="34" ry="22" transform="rotate(-25 -152 -112)" fill="#2a3399" ${st}/>
      <ellipse cx="152" cy="-112" rx="34" ry="22" transform="rotate(25 152 -112)" fill="#2a3399" ${st}/>
      <path d="M-92 -232Q-125 -280 -112 -330Q-82 -288 -48 -262Z" fill="#b06cff" ${st}/>
      <path d="M48 -262Q82 -288 112 -330Q125 -280 92 -232Z" fill="#b06cff" ${st}/>
      <ellipse cx="-72" cy="-6" rx="44" ry="17" fill="#1b2170" ${st}/><ellipse cx="72" cy="-6" rx="44" ry="17" fill="#1b2170" ${st}/>
      <path d="M-150 -10C-176 -140 -110 -272 0 -272C110 -272 176 -140 150 -10Q0 14 -150 -10Z" fill="url(#gBody)" ${st}/>
      <ellipse cx="0" cy="-58" rx="92" ry="44" fill="#8a96ff" opacity=".28"/>
      <g stroke="#5ff2ff" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#glow)" opacity=".9">
        <path d="M-126 -140q18 -22 6 -52"/><path d="M126 -140q-18 -22 -6 -52"/><path d="M-80 -28q20 -24 40 0t40 0t40 0t40 0"/>
      </g>`;
    const brows = (l, r) => `<path d="${l}" stroke="${OLG}" stroke-width="13" stroke-linecap="round" fill="none"/><path d="${r}" stroke="${OLG}" stroke-width="13" stroke-linecap="round" fill="none"/>`;
    const ew = `stroke="${OLG}" stroke-width="5"`;
    if (p.mood === 'cute') {
      g += `<circle cx="-48" cy="-170" r="42" fill="#fff" ${ew}/><circle cx="48" cy="-170" r="42" fill="#fff" ${ew}/>
        <circle cx="-44" cy="-163" r="28" fill="${OLG}"/><circle cx="52" cy="-163" r="28" fill="${OLG}"/>
        <circle cx="-34" cy="-176" r="10" fill="#fff"/><circle cx="62" cy="-176" r="10" fill="#fff"/>
        <circle cx="-52" cy="-152" r="4.5" fill="#fff"/><circle cx="44" cy="-152" r="4.5" fill="#fff"/>
        <ellipse cx="-100" cy="-112" rx="24" ry="13" fill="#ff7ac1" opacity=".75"/><ellipse cx="100" cy="-112" rx="24" ry="13" fill="#ff7ac1" opacity=".75"/>
        <path d="M-26 -100q13 18 26 0q13 18 26 0" stroke="${OLG}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (p.mood === 'surprised') {
      g += `<circle cx="-48" cy="-176" r="40" fill="#fff" ${ew}/><circle cx="46" cy="-176" r="38" fill="#fff" ${ew}/>
        <circle cx="-46" cy="-174" r="9" fill="${OLG}"/><circle cx="44" cy="-174" r="9" fill="${OLG}"/>
        ${brows('M-88 -236Q-52 -262 -16 -240', 'M14 -240Q50 -262 86 -236')}
        <ellipse cx="0" cy="-84" rx="24" ry="30" fill="#2a0b3d" ${ew}/>`;
    } else {
      g += `<circle cx="-50" cy="-178" r="40" fill="#fff" ${ew}/><circle cx="44" cy="-174" r="31" fill="#fff" ${ew}/>
        <circle cx="-38" cy="-168" r="15" fill="${OLG}"/><circle cx="53" cy="-183" r="11" fill="${OLG}"/>
        <circle cx="-33" cy="-174" r="5" fill="#fff"/><circle cx="56" cy="-187" r="3.5" fill="#fff"/>`;
      if (p.mood === 'grin') {
        g += brows('M-92 -230L-24 -214', 'M18 -210L76 -226');
        g += `<path d="M-90 -118Q0 -96 90 -121Q56 -38 0 -38Q-58 -38 -90 -118Z" fill="#2a0b3d" ${ew}/>`;
        g += [-62, -38, -14, 34, 58].map(x => { const t = (x + 90) / 180, y = (1 - t) ** 2 * -118 + 2 * (1 - t) * t * -96 + t * t * -121; return `<rect x="${x - 8}" y="${(y - 1).toFixed(1)}" width="16" height="16" rx="3" fill="#fff"/>`; }).join('');
        g += `<ellipse cx="12" cy="-54" rx="30" ry="12" fill="#ff6fa8"/>`;
      } else {
        g += brows(p.mood === 'roar' ? 'M-92 -238L-22 -210' : 'M-90 -230L-24 -216', p.mood === 'roar' ? 'M16 -208L80 -234' : 'M18 -212L76 -226');
        g += `<ellipse cx="0" cy="-86" rx="72" ry="52" fill="#2a0b3d" ${ew}/><ellipse cx="0" cy="-56" rx="40" ry="15" fill="#ff6fa8"/>
          <path d="M-58 -122l12 22 12 -24 12 22 12 -24 12 22 12 -24 12 22 12 -20Z" fill="#fff"/>
          <path d="M-44 -46l10 -16 10 16 10 -16 10 16 10 -16 10 16 10 -16 10 16Z" fill="#fff"/>`;
      }
    }
    if (p.crown) g += `<g transform="translate(0 -262) scale(2.2)">${crown(0, 0, 20)}</g>`;
    return `<g transform="translate(${p.x} ${p.y}) scale(${p.s})"><g class="${p.cls}">${g}</g></g>`;
  }

  SB.art = {
    OL, OLG, cast, addDefs,
    get defs() { return defs.join(''); },
    star4, note, rng, word, sparkles, heart, spot, bird, iceCream, zzz, stink, crown, sword, drum, princess, grumbo,
  };

  /* ---------- Text helpers for page copy ---------- */
  SB.text = {
    sfx: (snd, label, cls = '') => `<button type="button" class="sfx ${cls}" data-snd="${snd}">${label}</button>`,
    name: n => `<span class="her">${n}</span>`,
    dad: t => `<span class="dad">${t}</span>`,
    note: t => `<span class="note">${t}</span>`,
    say: t => `<span class="say">${t}</span>`,
    shout: t => `<span class="shout">${t}</span>`,
    huge: t => `<span class="huge">${t}</span>`,
    whisper: t => `<span class="whisper">${t}</span>`,
    action: (action, label, attrs = '') => `<button type="button" class="action-btn" data-action="${action}" ${attrs}>${label}</button>`,
  };
})(window.SB);
