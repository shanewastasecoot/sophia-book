/* Book 2 cast and places: Pip the baby seahorse, Wigglebottom the octopus, the city gates,
   the kelp forest, the bubble vents and the dark cave. Same outline style as the princesses. */
(function (SB) {
  const A = SB.art, { OL } = A;

  A.addDefs(`
    <radialGradient id="octo" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#d27cf0"/><stop offset="1" stop-color="#8a3cb8"/></radialGradient>
    <radialGradient id="cityGlow" cx=".5" cy=".6" r=".6"><stop offset="0" stop-color="#fff6c9"/><stop offset=".5" stop-color="#7dfcd9" stop-opacity=".7"/><stop offset="1" stop-color="#7dfcd9" stop-opacity="0"/></radialGradient>
    <radialGradient id="caveDark" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#0b1424"/></radialGradient>`);

  /* Pip: chibi baby seahorse with tiny round glasses. Origin at his middle, about 100 tall at scale 1. */
  function pip(o) {
    const p = Object.assign({ x: 400, y: 300, s: 1, flip: false, cls: 'bob', talk: false }, o);
    const body = '#ffcf4d', belly = '#fff0b8', st = `stroke="${OL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
    const g = `
      <path d="M-4 16Q-18 44 0 52Q18 56 16 40Q14 30 4 34" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/>
      <path d="M-4 16Q-18 44 0 52Q18 56 16 40Q14 30 4 34" fill="none" stroke="${body}" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M-18 -10l-10 4 8 6-10 6 9 5-8 7" fill="#ff9ad0" ${st}/>
      <ellipse cx="-2" cy="8" rx="17" ry="22" fill="${body}" ${st}/>
      <path d="M-6 -6q8 2 10 10M-8 4q8 2 11 10M-8 14q7 2 9 9" stroke="#e8a92a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="6" cy="10" rx="7" ry="14" fill="${belly}" opacity=".9"/>
      <path d="M14 -32L42 -36Q48 -30 42 -24L16 -22Z" fill="${body}" ${st}/>
      <circle cx="0" cy="-30" r="24" fill="${body}" ${st}/>
      <path d="M-14 -50l2 -12 7 9 5 -11 5 12" fill="#ff9ad0" ${st}/>
      <ellipse cx="-14" cy="-20" rx="5" ry="3" fill="#ff7aa8" opacity=".55"/>
      <g ${st} fill="#ffffff55"><circle cx="-6" cy="-32" r="8"/><circle cx="12" cy="-32" r="8"/></g>
      <path d="M2 -33h2M-14 -34l-8 -3" ${st}/>
      <circle cx="-5" cy="-31" r="3" fill="${OL}"/><circle cx="13" cy="-31" r="3" fill="${OL}"/>
      <circle cx="-4" cy="-32.5" r="1" fill="#fff"/><circle cx="14" cy="-32.5" r="1" fill="#fff"/>
      ${p.talk ? `<ellipse cx="38" cy="-25" rx="4" ry="3.5" fill="#8a1f3d" ${st} stroke-width="2"/>` : `<path d="M30 -24q5 3 9 -1" ${st} fill="none"/>`}`;
    return `<g transform="translate(${p.x} ${p.y}) scale(${p.flip ? -p.s : p.s} ${p.s})"><g class="${p.cls}">${g}</g></g>`;
  }

  /* Wigglebottom: a giant grumpy (then happy) octopus. Origin at his bottom middle, about 300 tall at scale 1.
     mood: 'grumpy' | 'happy' | 'eyes' (just glowing eyes in the dark) | 'hiding' (behind a far-too-small rock) */
  function octopus(o) {
    const p = Object.assign({ x: 400, y: 480, s: 1, mood: 'grumpy', cls: 'bob' }, o);
    if (p.mood === 'eyes') {
      return `<g transform="translate(${p.x} ${p.y}) scale(${p.s})"><g class="blink">
        <ellipse cx="-60" cy="-180" rx="34" ry="26" fill="#ffe27a" filter="url(#glow)"/><ellipse cx="60" cy="-180" rx="34" ry="26" fill="#ffe27a" filter="url(#glow)"/>
        <ellipse cx="-56" cy="-178" rx="10" ry="20" fill="#1a1040"/><ellipse cx="64" cy="-178" rx="10" ry="20" fill="#1a1040"/></g></g>`;
    }
    const arms = [-75, -54, -32, -11, 11, 32, 54, 75].map((x0, i) => {
      const sg = x0 < 0 ? -1 : 1, ex = x0 * 2.6, ey = -14 + (i % 2) * 14;
      const d = `M${x0} -70Q${x0 * 1.7} ${-8 + (i % 2) * 6} ${ex} ${ey}q${sg * 26} -6 ${sg * 14} -34q-6 -10 ${-sg * 12} -2`;
      return `<path d="${d}" fill="none" stroke="#5a1f7e" stroke-width="30" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#b866e0" stroke-width="22" stroke-linecap="round"/>
        <circle cx="${(x0 + ex) / 2}" cy="${ey - 2}" r="4" fill="#f2c4ff"/><circle cx="${ex - sg * 6}" cy="${ey + 4}" r="3.5" fill="#f2c4ff"/>`;
    }).join('');
    const head = `<path d="M-112 -66C-128 -200 -66 -284 0 -284C66 -284 128 -200 112 -66Q0 -36 -112 -66Z" fill="url(#octo)" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="-60" cy="-236" r="10" fill="#e9a8ff" opacity=".7"/><circle cx="48" cy="-250" r="14" fill="#e9a8ff" opacity=".7"/><circle cx="76" cy="-206" r="7" fill="#e9a8ff" opacity=".7"/>`;
    let face;
    if (p.mood === 'happy' || p.mood === 'hiding') {
      face = `<circle cx="-46" cy="-160" r="30" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="46" cy="-160" r="30" fill="#fff" stroke="${OL}" stroke-width="5"/>
        <circle cx="-42" cy="-154" r="18" fill="${OL}"/><circle cx="50" cy="-154" r="18" fill="${OL}"/>
        <circle cx="-35" cy="-162" r="6.5" fill="#fff"/><circle cx="57" cy="-162" r="6.5" fill="#fff"/>
        <ellipse cx="-86" cy="-118" rx="18" ry="10" fill="#ff7ac1" opacity=".8"/><ellipse cx="86" cy="-118" rx="18" ry="10" fill="#ff7ac1" opacity=".8"/>
        <path d="M-34 -118Q0 -78 34 -118Z" fill="#7a1f4d" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
    } else {
      face = `<circle cx="-46" cy="-160" r="30" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="46" cy="-160" r="30" fill="#fff" stroke="${OL}" stroke-width="5"/>
        <circle cx="-44" cy="-150" r="14" fill="${OL}"/><circle cx="44" cy="-150" r="14" fill="${OL}"/>
        <path d="M-78 -168Q-46 -186 -14 -168L-14 -194L-78 -194Z" fill="#9b4fcf" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M14 -168Q46 -186 78 -168L78 -194L14 -194Z" fill="#9b4fcf" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-80 -204L-18 -188M18 -188L80 -204" stroke="${OL}" stroke-width="11" stroke-linecap="round"/>
        <path d="M-26 -104Q0 -122 26 -104" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    }
    let g = arms + head + face;
    if (p.mood === 'hiding') g += `<path d="M-60 0Q-62 -60 -10 -64Q46 -66 56 0Z" fill="#6f7f95" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -40q12 -8 26 -2" stroke="#9fb0c6" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    return `<g transform="translate(${p.x} ${p.y}) scale(${p.s})"><g class="${p.cls}">${g}</g></g>`;
  }

  /* The grand gates of Mermaid City, shut tight with a three-shell lock, or swung open. */
  function gates(x, y, s, open = false, lit = open) {
    const pillar = px => `<rect x="${px - 30}" y="-300" width="60" height="300" rx="8" fill="#ffd1e8" stroke="${OL}" stroke-width="4"/><circle cx="${px}" cy="-310" r="34" fill="#c6b3ff" stroke="${OL}" stroke-width="4"/><path d="M${px - 18} -298q18 -26 36 0" stroke="${OL}" stroke-width="3" fill="none"/>`;
    const arch = `<path d="M-180 -250Q0 -400 180 -250" fill="none" stroke="#bff4ff" stroke-width="26" stroke-linecap="round"/><path d="M-180 -250Q0 -400 180 -250" fill="none" stroke="${OL}" stroke-width="4" opacity=".6"/>`;
    const lock = (cx, cy) => [['#ff7ac1', -26], ['#5fc8ff', 0], ['#ffd34d', 26]].map(([c, dx]) => `<circle cx="${cx + dx}" cy="${cy}" r="10" fill="${lit ? c : '#2a4a5e'}" stroke="${OL}" stroke-width="3"${lit ? ' filter="url(#glow)"' : ''}/>`).join('');
    const doors = open
      ? `<rect x="-150" y="-250" width="300" height="250" fill="url(#cityGlow)"/>
         <path d="M-150 -250L-112 -236L-112 -8L-150 0Z" fill="#7fd6d0" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
         <path d="M150 -250L112 -236L112 -8L150 0Z" fill="#7fd6d0" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`
      : `<path d="M-150 -250H0V0H-150Z M0 -250H150V0H0Z" fill="#7fd6d0" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
         <path d="M-75 -230V-20M75 -230V-20M-140 -125H-10M10 -125H140" stroke="#4fb3ad" stroke-width="5" stroke-linecap="round"/>
         <circle cx="0" cy="-130" r="44" fill="#ffe7f3" stroke="${OL}" stroke-width="4"/>${lock(0, -130)}`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${doors}${pillar(-180)}${pillar(180)}${arch}</g>`;
  }

  /* Tall, tickly kelp: a whole forest of swaying seaweed. */
  function kelpForest() {
    const cols = ['#2fbf71', '#24a862', '#4fd18b'];
    return [40, 120, 200, 270, 540, 610, 690, 760].map((x, i) => A.seaweed(x, 500, 300 + (i * 37) % 120, cols[i % 3])).join('');
  }

  /* Bubble vents on the sea floor, puffing big bounce-bubbles. */
  function vents() {
    const vent = x => `<path d="M${x - 46} 470Q${x - 30} 410 ${x - 12} 402H${x + 12}Q${x + 30} 410 ${x + 46} 470Z" fill="#46607a" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><ellipse cx="${x}" cy="404" rx="13" ry="5" fill="#132233"/>`;
    return vent(180) + vent(420) + vent(640) +
      A.bubble(180, 330, 40) + A.bubble(420, 250, 56) + A.bubble(640, 320, 44) + A.bubble(420, 120, 30) + A.bubble(200, 200, 22);
  }

  /* A dark, dark cave mouth that fills most of the picture. */
  function cave() {
    return `<path d="M-10 510L-10 60Q120 -10 400 20Q690 -10 810 60L810 510Z" fill="#33485e" stroke="${OL}" stroke-width="5"/>
      <path d="M90 510Q80 170 400 140Q720 170 710 510Z" fill="url(#caveDark)" stroke="${OL}" stroke-width="5"/>
      <path d="M170 150l14 40 16 -36M560 160l16 38 14 -40M380 140l10 30 12 -30" fill="#33485e" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  }

  Object.assign(A, { pip, octopus, gates, kelpForest, vents, cave });
})(window.SB);
