/* Scenery for the Kingdom of Sparkleton: skies, castle, hills, the Glitter Shield. */
(function (SB) {
  const A = SB.art, { OL, star4, rng } = A;

  A.addDefs(`
    <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120a35"/><stop offset="1" stop-color="#4a2c94"/></linearGradient>
    <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f5cf0"/><stop offset=".6" stop-color="#c39bff"/><stop offset="1" stop-color="#ffb3dc"/></linearGradient>
    <linearGradient id="skyDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05030f"/><stop offset="1" stop-color="#22114a"/></linearGradient>`);

  function sky(kind) {
    const id = { night: 'skyNight', dusk: 'skyDusk', dark: 'skyDark' }[kind];
    let s = `<rect width="800" height="500" fill="url(#${id})"/>`;
    if (kind !== 'dusk') {
      const r = rng(kind === 'dark' ? 7 : 42);
      for (let i = 0; i < 70; i++) s += `<circle cx="${(r() * 800).toFixed(1)}" cy="${(r() * 330).toFixed(1)}" r="${(r() * 1.6 + .4).toFixed(2)}" fill="#fff" opacity="${(.35 + r() * .65).toFixed(2)}"/>`;
      for (let i = 0; i < 6; i++) s += star4(Math.round(r() * 780 + 10), Math.round(r() * 250 + 10), 6, '#fff6c9', 'twinkle');
    } else {
      s += `<circle cx="660" cy="120" r="46" fill="#fff3b0" opacity=".9"/>`;
      s += `<g fill="#fff" opacity=".85"><ellipse cx="160" cy="90" rx="60" ry="20"/><ellipse cx="200" cy="76" rx="38" ry="22"/><ellipse cx="520" cy="60" rx="50" ry="16"/><ellipse cx="548" cy="48" rx="30" ry="18"/></g>`;
    }
    return s;
  }
  const moon = (x, y) => `<circle cx="${x}" cy="${y}" r="38" fill="#fff3c4" filter="url(#glow)"/><circle cx="${x + 16}" cy="${y - 10}" r="34" fill="#24165a"/>`;
  const ground = night => `<g stroke="${night ? '#1c1446' : '#4f8f3e'}" stroke-width="3">
    <path d="M-5 430 Q200 400 400 428 T805 420 L805 505 L-5 505Z" fill="${night ? '#3a2f7a' : '#a6d98a'}"/>
    <path d="M-5 455 Q240 438 470 458 T805 452 L805 505 L-5 505Z" fill="${night ? '#2b2263' : '#86c66e'}"/></g>`;

  function castle(x, y, s, night) {
    const wall = night ? '#6a54b8' : '#efd6ff', tower = night ? '#7b63c9' : '#e2c0ff';
    const roof = night ? '#b0407f' : '#ff7ac1', win = night ? '#ffd65a' : '#9fdcff';
    const line = night ? '#2a1d5c' : '#7a4fa0';
    const w = (wx, wy) => `<path d="M${wx} ${wy}v-16a7 7 0 0 1 14 0v16Z" fill="${win}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})"><g stroke="${line}" stroke-width="3.5" stroke-linejoin="round">
      <rect x="-110" y="-140" width="220" height="140" fill="${wall}"/>
      ${[-110, -80, -50, 30, 60, 90].map(cx => `<rect x="${cx}" y="-154" width="20" height="16" fill="${wall}"/>`).join('')}
      <rect x="-150" y="-200" width="60" height="200" fill="${tower}"/>
      <rect x="90" y="-200" width="60" height="200" fill="${tower}"/>
      <rect x="-36" y="-250" width="72" height="250" fill="${tower}"/>
      <path d="M-158 -200 L-120 -268 L-82 -200Z M82 -200 L120 -268 L158 -200Z M-46 -250 L0 -335 L46 -250Z" fill="${roof}"/>
      <path d="M0 -335v-22l18 7-18 7" fill="#ffc83d"/>
      ${w(-127, -150)}${w(113, -150)}${w(-7, -200)}${w(-7, -150)}${w(-80, -90)}${w(66, -90)}
      <path d="M-24 0V-42Q0 -72 24 -42V0Z" fill="${night ? '#3c2a78' : '#9b4fe0'}"/>
    </g></g>`;
  }
  const shield = (cx, cy, rx, ry, op = 1) =>
    `<g opacity="${op}"><path d="M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}Z" fill="#ffc83d" opacity=".16"/>
     <path d="M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}" fill="none" stroke="#ffd65a" stroke-width="5" filter="url(#glow)" class="beam" stroke-dasharray="40 20"/></g>`;
  const stage = () => `<rect x="40" y="440" width="720" height="70" rx="10" fill="#8a3fd1" stroke="${OL}" stroke-width="3"/><rect x="42" y="442" width="716" height="12" fill="#b06cff"/>`;

  Object.assign(A, { sky, moon, ground, castle, shield, stage });
})(window.SB);
