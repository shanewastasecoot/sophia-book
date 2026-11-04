/* Scenery for Mermaid City (book 2): water, light rays, seabed, seaweed, coral, fish, the pearl city. */
(function (SB) {
  const A = SB.art, { OL } = A;

  A.addDefs(`
    <linearGradient id="seaDeep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a6b86"/><stop offset=".55" stop-color="#062a4a"/><stop offset="1" stop-color="#03152a"/></linearGradient>
    <linearGradient id="seaLagoon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9af0e8"/><stop offset=".5" stop-color="#2bb3c0"/><stop offset="1" stop-color="#137a96"/></linearGradient>
    <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>`);

  const water = kind => `<rect width="800" height="500" fill="url(#${kind === 'lagoon' ? 'seaLagoon' : 'seaDeep'})"/>`;
  const rays = () => [[120, 60], [330, 90], [560, 70], [720, 50]].map(([x, w]) => `<path d="M${x} -10L${x + w} -10L${x + w * 2.2} 500L${x + w * .4} 500Z" fill="url(#ray)"/>`).join('');
  const seabed = deep => `<g stroke="${deep ? '#0a2b3a' : '#b08a4a'}" stroke-width="3">
    <path d="M-5 440 Q180 410 380 438 T805 428 L805 505 L-5 505Z" fill="${deep ? '#1d5368' : '#f0d9a0'}"/>
    <path d="M-5 465 Q260 448 500 468 T805 460 L805 505 L-5 505Z" fill="${deep ? '#163f52' : '#e3c487'}"/></g>`;
  const seaweed = (x, y, h, c = '#2fbf71') =>
    `<g class="sway"><path d="M${x} ${y}q-16 ${-h / 4} 0 ${-h / 2}t0 ${-h / 2}" stroke="${OL}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M${x} ${y}q-16 ${-h / 4} 0 ${-h / 2}t0 ${-h / 2}" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
  const coral = (x, y, s, c = '#ff7a9c') => {
    const d = 'M0 0V-46M0 -22L-20 -44V-62M0 -32L18 -52V-68M-20 -50L-32 -60M18 -58L30 -66';
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="${d}" stroke="${OL}" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  const fish = (x, y, s, c, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="floaty"><g stroke="${OL}" stroke-width="2.5" stroke-linejoin="round">
    <path d="M-22 0L-36 -12L-36 12Z" fill="${c}"/><ellipse rx="24" ry="15" fill="${c}"/></g>
    <circle cx="10" cy="-4" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="11" cy="-4" r="2" fill="${OL}"/>
    <path d="M-4 -10q4 10 0 20" stroke="#ffffffaa" stroke-width="2.5" fill="none"/></g></g>`;
  const shell = (x, y, s, c = '#ffd1e8') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0L-22 -8Q-20 -34 0 -38Q20 -34 22 -8Z" fill="${c}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M0 0L-12 -32M0 0V-36M0 0L12 -32" stroke="${OL}" stroke-width="2" opacity=".6"/></g>`;
  const bubble = (x, y, r) => `<g class="floaty"><circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff22" stroke="#ffffffcc" stroke-width="${Math.max(1.5, r / 10)}"/><circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .22}" fill="#fff" opacity=".85"/></g>`;

  // The pearl city: shell-spire towers with glowing windows.
  function city(x, y, s) {
    const tower = (tx, w, h, c) => `<rect x="${tx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><circle cx="${tx}" cy="${-h}" r="${w / 2}" fill="${c}"/>`;
    const win = (wx, wy) => `<circle cx="${wx}" cy="${wy}" r="6" fill="#7dfcd9" filter="url(#glow)"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})"><g stroke="${OL}" stroke-width="3" stroke-linejoin="round" opacity=".95">
      ${tower(-150, 50, 140, '#c6b3ff')}${tower(-80, 60, 210, '#ffd1e8')}${tower(0, 80, 280, '#bff4ff')}${tower(85, 60, 190, '#ffd1e8')}${tower(150, 46, 120, '#c6b3ff')}
      <path d="M0 -320l-16 -40h32Z" fill="#ffd65a"/></g>
      ${win(-80, -150)}${win(0, -230)}${win(0, -170)}${win(85, -130)}${win(-150, -90)}${win(150, -80)}
    </g>`;
  }

  Object.assign(A, { water, rays, seabed, seaweed, coral, fish, shell, bubble, city });
})(window.SB);
