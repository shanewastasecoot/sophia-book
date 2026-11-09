/* Book 3: The Sparkle Swords and Scorch's Little Flame.
   The words and page structure live in scorch.story.js (plain JSON). This file adds the drawing for each
   `scene` key (placeholders until the paintings arrive) and the book's new sound effects. */
(function (SB) {
  const A = SB.art, { SOPHIA, LUNA, RUBY, MAGNOLIA } = A.cast;
  const story = SB.stories['scorch'];
  const au = SB.audio;

  /* ---------- Sounds (a recorded sounds/<name>.mp3 replaces any of these) ---------- */
  au.register('clang', () => { au.tone(1400, 1350, .35, 'triangle', .2); au.tone(2100, 2000, .25, 'sine', .12); });
  au.register('fire', () => { au.noise(1.1, 400, 2200, .55); au.noise(.9, 200, 900, .35, .1, 'lowpass'); });
  au.register('crash', () => { au.noise(.9, 1800, 120, .7, 0, 'lowpass'); au.tone(90, 40, .6, 'sine', .5); });
  au.register('crack', () => { au.noise(.12, 4000, 2500, .7, 0, 'highpass'); au.tone(600, 200, .1, 'square', .15); });
  au.register('dragon-roar', () => { au.tone(140, 70, 1.2, 'sawtooth', .45, 0, 9); au.noise(1.1, 700, 200, .35); });
  au.register('dragon-laugh', () => [0, .26, .52, .78].forEach(t => au.tone(170, 120, .2, 'sawtooth', .3, t, 14)));
  au.register('hooves', () => [0, .14, .32, .46].forEach(t => au.tone(320, 220, .06, 'triangle', .3, t)));
  au.register('arrow', () => { au.noise(.25, 6000, 1500, .4, 0, 'highpass'); au.tone(500, 160, .06, 'square', .12, .22); });
  au.register('bell', () => [0, .55].forEach(t => { au.tone(392, 390, 1.1, 'sine', .3, t); au.tone(784, 780, .8, 'sine', .1, t); }));
  au.register('heartbeat', () => [0, .22].forEach(t => au.tone(70, 50, .14, 'sine', .7, t)));
  au.register('hiccup', () => { au.tone(500, 900, .07, 'sine', .3); au.noise(.15, 3000, 1000, .15, .05); });
  au.register('whisper', () => [0, .35, .7].forEach(t => au.noise(.5, 2500, 5000, .18, t, 'highpass')));
  au.register('wings', () => { [0, .3].forEach(t => au.noise(.22, 300, 120, .6, t, 'lowpass')); au.noise(.9, 400, 2500, .4, .6); });

  /* ---------- Scene helpers ---------- */
  const tiny = (x, y, s = .09) => A.grumbo({ x, y, s, mood: 'cute', crown: true, cls: 'bob' });
  const trio = (pos, extra = {}) => [[LUNA, ...pos[0]], [SOPHIA, ...pos[1]], [RUBY, ...pos[2]]]
    .map(([who, x, y, s, pose = 'up', prop = null, cls = 'bob']) => A.princess({ ...who, x, y, s, pose, prop, cls, ...extra })).join('');
  const magnolia = (x, y, s = 1, pose = 'hold') => A.princess({ ...MAGNOLIA, x, y, s, pose, prop: 'bow', cls: 'sway' });
  const fireFrom = (x, y, s, flip, tx, ty, w) => { const [mx, my] = A.mouthOf(x, y, s, flip); return A.flame(mx, my, tx, ty, w); };
  const day = () => A.emberSky('morning') + A.ground(false);
  const ember = () => A.emberSky('ember') + A.emberHills('#6b5a4a', '#4e3f34');
  const lightShield = (cx, cy, rx, ry, cracked = false) => A.shield(cx, cy, rx, ry, 1) +
    (cracked ? `<path d="M${cx - rx * .4} ${cy - ry * .9}l18 30 -14 20 22 34M${cx + rx * .3} ${cy - ry * .8}l-16 26 18 18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>` : '');

  const SCENES = {
    cover: () => ember() + A.stoneCastle(560, 440, .9) + A.dragon({ x: 470, y: 230, s: .55, mood: 'angry', cls: 'floaty' }) +
      trio([[150, 476, .8, 'sing'], [300, 486, 1, 'up', 'sword'], [440, 476, .8, 'drum', 'sticks']]) + magnolia(720, 476, .8) + tiny(330, 410),

    practice: () => day() + A.castle(400, 330, .8, false) +
      trio([[180, 470, .9, 'sing'], [400, 480, 1.05, 'up', 'sword'], [620, 470, .9, 'up', 'sword', 'wiggle']]) +
      lightShield(180, 470, 110, 150) + tiny(430, 400) + A.word(620, 90, 44, 'CLANG!', '#ffc83d', 6) + A.sparkles([[90, 80], [700, 160, 8], [520, 60, 7]]),

    smoke: () => day() + A.castle(150, 360, .55, false) + A.smokePlume(620, 300, 1.4) + A.smokePlume(680, 260, 1) +
      trio([[300, 470, .85, 'nose'], [440, 480, 1, 'hold'], [580, 470, .85, 'nose']]) + A.bird(470, 300, 1.4, '#7d7987') +
      `<g transform="translate(470 360) rotate(-8)"><rect x="-26" y="-18" width="52" height="36" fill="#f3e2c0" stroke="${A.OL}" stroke-width="2.5"/><path d="M-26 -18l8 8 6 -6 8 6 8 -6 6 6 10 -8" fill="#3a2a2a"/></g>` +
      A.word(400, 70, 46, 'DONG! DONG!', '#ffc83d', -3),

    ride: () => ember() + A.stoneCastle(600, 430, .75) + A.dragon({ x: 520, y: 200, s: .45, mood: 'angry', cls: 'floaty' }) +
      fireFrom(520, 200, .45, false, 680, 320, 40) +
      trio([[90, 476, .7, 'up', 'sword'], [210, 486, .82, 'up', 'sword'], [330, 476, .7, 'up', 'sword']]) + A.word(220, 80, 42, 'FWOOOSH!', '#ffb02e', -5),

    setout: () => day() + A.castle(400, 330, .75, false) +
      `<circle cx="590" cy="380" r="46" fill="url(#eggGlow)" class="twinkle"/><g transform="translate(590 400)" stroke="${A.OL}" stroke-width="3"><rect x="-14" y="-30" width="28" height="36" rx="4" fill="#ffd27a"/><path d="M-16 -30h32M-8 -40h16" fill="none"/></g>` +
      trio([[200, 470, .85, 'wave'], [400, 480, 1, 'hold', 'sword'], [600, 470, .85, 'wave']]) + tiny(430, 400) + A.word(400, 70, 44, 'CLOP-CLOP-CLOP!', '#ffc83d', -3),

    woods: () => `<rect width="800" height="500" fill="#14261c"/>` +
      [60, 170, 290, 520, 640, 750].map((x, k) => `<path d="M${x - 26} 500Q${x - 10} 260 ${x - 30} 0H${x + 30}Q${x + 14} 260 ${x + 26} 500Z" fill="${k % 2 ? '#3a2a1e' : '#2e2218'}" stroke="${A.OL}" stroke-width="3"/>`).join('') +
      `<path d="M0 0H800V90Q600 140 400 100T0 110Z" fill="#1f4a2c" stroke="${A.OL}" stroke-width="3"/>` +
      `<path d="M120 500Q300 380 400 400T700 320" fill="none" stroke="#ffd65a" stroke-width="18" stroke-linecap="round" opacity=".55" filter="url(#glow)" class="beam"/>` +
      trio([[300, 470, .7, 'sing'], [420, 476, .8, 'hold', 'sword'], [540, 470, .7, 'nose']]) + A.note(330, 280, 30, '#ffd65a') + A.note(380, 240, 26, '#fff', '♫') +
      A.word(640, 110, 30, 'shhh-hhh…', '#cfe8b0', 4),

    bridge: () => A.emberSky('morning') + `<path d="M0 300Q200 280 400 300T800 300V500H0Z" fill="#5fa8e8" stroke="${A.OL}" stroke-width="3"/>` +
      `<path d="M0 340q40 -10 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0M0 400q40 -10 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" stroke="#d6efff" stroke-width="4" fill="none"/>` +
      `<g fill="#2a1e18" stroke="${A.OL}" stroke-width="3"><path d="M90 300v-50l14 10v40Z"/><path d="M700 300v-44l14 8v36Z"/></g>` +
      [[170, 430], [280, 400], [390, 420], [500, 395], [610, 420]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="44" ry="14" fill="#8a8794" stroke="${A.OL}" stroke-width="3"/>`).join('') +
      A.princess({ ...SOPHIA, x: 500, y: 396, s: .6, pose: 'wave', prop: 'sword', cls: 'bob' }) + A.princess({ ...LUNA, x: 610, y: 421, s: .55, pose: 'wave', cls: 'sway' }) +
      A.princess({ ...RUBY, x: 280, y: 401, s: .55, pose: 'wave', cls: 'shake' }) + A.word(400, 80, 46, 'SPLOOSH!', '#d6efff', -4),

    nest: () => ember() + `<g transform="translate(400 420)"><ellipse rx="300" ry="70" fill="#5a3a22" stroke="${A.OL}" stroke-width="4"/>` +
      [-260, -170, -80, 10, 100, 190].map(x => `<rect x="${x}" y="-60" width="80" height="22" rx="10" fill="#7a5233" stroke="${A.OL}" stroke-width="3" transform="rotate(${x % 3 ? -8 : 7} ${x + 40} -49)"/>`).join('') +
      `<ellipse rx="220" ry="40" fill="#2a1a12"/></g>` +
      `<circle cx="400" cy="410" r="40" fill="url(#eggGlow)" class="twinkle"/><path d="M400 390q22 18 0 36q-22 -18 0 -36Z" fill="#ffc23d" stroke="${A.OL}" stroke-width="3"/>` +
      trio([[150, 476, .6, 'nose'], [560, 480, .7, 'hold'], [670, 476, .6, 'nose']]),

    magnolia: () => ember() + `<rect x="0" y="330" width="800" height="170" fill="#9a96a3" stroke="${A.OL}" stroke-width="3"/>` +
      magnolia(400, 420, 1.2) + trio([[140, 470, .7], [250, 476, .8, 'hold', 'sword'], [660, 470, .7, 'drum', 'sticks']]) +
      A.dragon({ x: 620, y: 170, s: .35, mood: 'angry', cls: 'floaty', flip: true }) + A.smokePlume(120, 200, .8),

    tower: () => ember() + A.stoneCastle(400, 470, 1, { broken: true }) + lightShield(400, 470, 330, 300) +
      A.dragon({ x: 160, y: 200, s: .45, mood: 'angry', cls: 'shake', flip: true }) +
      `<g fill="#9a96a3" stroke="${A.OL}" stroke-width="3"><rect x="180" y="120" width="40" height="34" transform="rotate(20 200 137)"/><rect x="260" y="70" width="34" height="30" transform="rotate(-15 277 85)"/><rect x="120" y="260" width="30" height="26"/></g>` +
      A.word(560, 90, 52, 'CRASH!', '#ff6a2b', 6),

    toot: () => ember() + `<rect x="0" y="380" width="800" height="120" fill="#9a96a3" stroke="${A.OL}" stroke-width="3"/>` +
      A.dragon({ x: 640, y: 300, s: .6, mood: 'angry', flip: true }) +
      `<g transform="translate(330 430)"><path d="M-50 0Q-50 -60 0 -62Q50 -60 50 0Z" fill="#8a8794" stroke="${A.OL}" stroke-width="3.5"/></g>` + tiny(330, 390, .12) +
      trio([[90, 476, .6, 'nose'], [180, 482, .7, 'nose'], [480, 476, .6, 'nose']]) + A.word(330, 250, 56, 'TOOT!', '#9be15d', -6) + A.stink(390, 330, .8),

    laugh: () => ember() + `<rect x="0" y="380" width="800" height="120" fill="#9a96a3" stroke="${A.OL}" stroke-width="3"/>` +
      A.dragon({ x: 560, y: 360, s: .75, mood: 'laugh', cls: 'wiggle', flip: true }) +
      `<g transform="translate(200 430)"><path d="M-50 0Q-50 -60 0 -62Q50 -60 50 0Z" fill="#8a8794" stroke="${A.OL}" stroke-width="3.5"/></g>` + tiny(200, 390, .12) +
      A.word(560, 70, 50, 'HAW-HAW-HAW!', '#ffc83d', -4) + A.smokePlume(700, 150, .5),

    talk: () => ember() + `<rect x="0" y="380" width="800" height="120" fill="#9a96a3" stroke="${A.OL}" stroke-width="3"/>` +
      A.dragon({ x: 660, y: 330, s: .65, mood: 'angry', flip: true }) +
      A.princess({ ...SOPHIA, x: 380, y: 470, s: 1, pose: 'wave', cls: 'bob' }) + lightShield(150, 470, 130, 180) +
      A.princess({ ...LUNA, x: 100, y: 470, s: .55, pose: 'sing', cls: 'bob' }) + A.princess({ ...RUBY, x: 200, y: 470, s: .55, pose: 'nose', cls: 'bob' }),

    crack: () => ember() + `<rect x="0" y="380" width="800" height="120" fill="#9a96a3" stroke="${A.OL}" stroke-width="3"/>` +
      A.dragon({ x: 680, y: 260, s: .5, mood: 'angry', flip: true }) + fireFrom(680, 260, .5, true, 300, 300, 70) +
      lightShield(250, 470, 200, 260, true) + A.princess({ ...LUNA, x: 200, y: 470, s: .8, pose: 'sing', cls: 'shake' }) +
      A.princess({ ...SOPHIA, x: 420, y: 500, s: .8, pose: 'nose', cls: '' }) + A.word(300, 90, 58, 'CRACK!', '#fff', -6),

    together: () => ember() + A.stoneCastle(400, 470, .8) + A.dragon({ x: 660, y: 200, s: .4, mood: 'angry', cls: 'floaty', flip: true }) +
      lightShield(160, 470, 140, 200) + trio([[160, 470, .7, 'sing'], [400, 480, .8, 'up', 'sword'], [580, 476, .7, 'drum', 'sticks']]) +
      magnolia(80, 476, .65) + `<g stroke="#8a5a2b" stroke-width="4"><path d="M250 486l6 -26M300 490l4 -26M350 486l6 -26"/></g>` + A.word(560, 90, 40, 'BOOM-BA-BOOM!', '#ff4fa3', 4),

    arrow: () => ember() + A.stoneCastle(400, 470, .8) +
      `<rect x="600" y="80" width="10" height="400" fill="#6b4a2a" stroke="${A.OL}" stroke-width="2.5"/><path d="M610 90L700 110L690 150L610 140Z" fill="#3f8f52" stroke="${A.OL}" stroke-width="2.5"/>` +
      A.dragon({ x: 560, y: 260, s: .5, mood: 'sad', cls: 'shake' }) + magnolia(140, 476, .9) +
      `<path d="M210 340L600 120" stroke="#8a5a2b" stroke-width="4" stroke-dasharray="14 10"/>` + A.word(320, 90, 48, 'THWIP!', '#fff', -8),

    gaze: () => ember() + A.stoneCastle(560, 470, .95, { glowWindow: true }) +
      A.dragon({ x: 230, y: 480, s: .7, mood: 'sad', cls: '' }) + A.princess({ ...SOPHIA, x: 500, y: 480, s: .8, pose: 'hold', prop: 'sword', cls: 'bob' }),

    egg: () => ember() + A.stoneCastle(560, 470, .95, { glowWindow: true }) + A.dragon({ x: 150, y: 480, s: .5, mood: 'sad', cls: '' }) +
      magnolia(360, 476, .85, 'wave') + A.princess({ ...SOPHIA, x: 470, y: 480, s: .85, pose: 'hold', cls: 'bob' }),

    return: () => ember() + A.stoneCastle(620, 470, .8, { glowWindow: false }) + A.dragon({ x: 250, y: 480, s: .7, mood: 'calm', cls: 'bob' }) +
      A.egg(470, 470, 1) + A.princess({ ...RUBY, x: 540, y: 480, s: .8, pose: 'hold', cls: 'bob' }) +
      A.princess({ ...SOPHIA, x: 700, y: 480, s: .75, pose: 'wave', cls: 'bob' }) + A.word(470, 330, 30, 'thump-thump', '#ffc83d', 0),

    flight: () => A.emberSky('ember') + `<circle cx="680" cy="380" r="70" fill="#ffd27a" opacity=".7"/>` +
      `<path d="M0 420Q200 380 400 410T800 400V500H0Z" fill="#4f6a3a" stroke="${A.OL}" stroke-width="3"/><path d="M0 470Q260 430 520 470T800 460" fill="none" stroke="#bfe3ff" stroke-width="8"/>` +
      A.castle(150, 440, .2, false) + A.stoneCastle(660, 440, .18) +
      A.dragon({ x: 360, y: 330, s: .62, mood: 'calm', cls: 'floaty' }) + A.egg(400, 330, .4) +
      A.princess({ ...RUBY, x: 300, y: 250, s: .28, pose: 'up', cls: '' }) + A.princess({ ...SOPHIA, x: 340, y: 246, s: .3, pose: 'up', cls: '' }) +
      A.princess({ ...LUNA, x: 380, y: 250, s: .28, pose: 'up', cls: '' }) + A.princess({ ...MAGNOLIA, x: 270, y: 256, s: .28, pose: 'up', cls: '' }) +
      A.word(400, 70, 40, 'WHUMP! WHOOSH!', '#ffc83d', -3),

    hatch: () => A.sky('night') + A.moon(660, 80) + A.emberHills('#3a2f5a', '#2a2148') +
      `<path d="M60 500V300Q180 200 330 300V500Z" fill="#2a2030" stroke="${A.OL}" stroke-width="3"/>` +
      A.dragon({ x: 200, y: 470, s: .45, mood: 'calm', cls: 'bob', wingsUp: false }) + A.flicker({ x: 410, y: 480, s: .55 }) + A.egg(410, 486, .6, true) +
      trio([[540, 470, .55, 'sing'], [640, 476, .62, 'up', 'sword'], [740, 470, .55, 'drum', 'sticks']]) + A.note(520, 300, 30, '#ffd65a') + A.note(620, 260, 28, '#fff', '♫'),

    missing: () => day() + A.castle(560, 360, .6, false) + A.dragon({ x: 360, y: 440, s: .6, mood: 'sad', cls: 'shake' }) +
      fireFrom(360, 440, .6, false, 640, 420, 50) + A.smokePlume(700, 380, .7) + A.smokePlume(120, 360, .6) +
      `<g fill="#b4b0bb" stroke="${A.OL}" stroke-width="3"><rect x="80" y="400" width="40" height="30" transform="rotate(25 100 415)"/><rect x="140" y="440" width="34" height="28" transform="rotate(-12 157 454)"/></g>` +
      A.word(400, 70, 50, 'RAAAAAWR!', '#ff6a2b', -4),

    search: () => day() + A.castle(620, 330, .55, false) + A.dragon({ x: 640, y: 210, s: .3, mood: 'sad', cls: 'floaty', flip: true }) +
      [[160, 470], [210, 455], [262, 466], [316, 450], [370, 462], [424, 446]].map(([x, y]) => `<g fill="#3a2420"><circle cx="${x}" cy="${y}" r="5"/><circle cx="${x - 7}" cy="${y - 8}" r="3"/><circle cx="${x}" cy="${y - 10}" r="3"/><circle cx="${x + 7}" cy="${y - 8}" r="3"/></g>`).join('') +
      A.princess({ ...MAGNOLIA, x: 120, y: 480, s: .75, pose: 'nose', cls: '' }) +
      trio([[470, 470, .65, 'hold'], [560, 476, .72, 'hold', 'sword'], [650, 470, .65, 'hold']]),

    shield: () => day() + A.castle(400, 330, .6, false) + lightShield(400, 470, 380, 330, true) +
      A.dragon({ x: 640, y: 200, s: .45, mood: 'sad', cls: 'floaty', flip: true }) + fireFrom(640, 200, .45, true, 420, 180, 50) +
      trio([[300, 470, .7, 'sing'], [440, 480, .8, 'up', 'sword'], [140, 476, .7, 'drum', 'sticks']]),

    squeak: () => day() + `<path d="M420 470V330h300v140" fill="#e2c0ff" stroke="${A.OL}" stroke-width="3"/><path d="M400 340L570 260L740 340Z" fill="#ff7ac1" stroke="${A.OL}" stroke-width="3"/>` +
      `<g stroke="${A.OL}" stroke-width="3"><ellipse cx="560" cy="456" rx="70" ry="22" fill="#ffb3dc"/><ellipse cx="600" cy="430" rx="50" ry="18" fill="#bcd4ff"/></g>` +
      `<path d="M598 412L598 398L606 406L612 394L618 406L626 398L626 412Z" fill="#fff3c4" stroke="${A.OL}" stroke-width="2"/>` +
      lightShield(160, 470, 150, 220, true) + A.princess({ ...SOPHIA, x: 380, y: 480, s: .8, pose: 'hold', cls: 'bob' }) + A.word(612, 360, 26, 'squeak!', '#5fc8ff', -8, '#fff'),

    drum: () => day() + `<g transform="translate(420 440)"><ellipse rx="150" ry="96" fill="#e0314f" stroke="${A.OL}" stroke-width="4"/><ellipse rx="112" ry="74" fill="#fff4e0" stroke="${A.OL}" stroke-width="3.5"/></g>` +
      A.flicker({ x: 380, y: 480, s: .45, mood: 'laugh' }) + tiny(470, 470, .14) +
      A.princess({ ...SOPHIA, x: 680, y: 480, s: .8, pose: 'wave', cls: 'bob' }) + A.word(400, 90, 46, 'HEE-HEE-HEE!', '#ff4fa3', -4),

    hiccup: () => day() + A.castle(620, 330, .55, false) + A.dragon({ x: 300, y: 470, s: .7, mood: 'laugh', cls: 'wiggle' }) +
      A.flicker({ x: 470, y: 480, s: .3 }) + A.flame(520, 420, 580, 400, 14) + tiny(600, 470, .12) +
      A.word(560, 300, 40, 'HIC!', '#ffb02e', 8) + A.word(300, 90, 46, 'HAW-HAW-HAW!', '#ffc83d', -4),

    promise: () => day() + A.castle(560, 330, .7, false) + A.dragon({ x: 600, y: 470, s: .6, mood: 'calm', cls: 'bob', flip: true }) +
      A.princess({ ...SOPHIA, x: 380, y: 480, s: .85, pose: 'up', cls: 'bob' }) +
      `<circle cx="442" cy="368" r="34" fill="url(#eggGlow)" class="twinkle"/><path d="M442 352q16 14 0 30q-16 -16 0 -30Z" fill="#ffc23d" stroke="${A.OL}" stroke-width="3"/>` +
      A.princess({ ...MAGNOLIA, x: 180, y: 480, s: .8, pose: 'hold', prop: 'sword', cls: '' }) + A.sparkles([[120, 120], [260, 80, 8], [700, 120, 7]]) +
      A.word(260, 90, 36, 'SPARKLE!', '#ffc83d', -4),

    finale: () => A.sky('night') + A.spot(160, 220, 'spotPink') + A.spot(640, 560, 'spotCyan') + A.moon(680, 70) +
      `<rect x="40" y="440" width="720" height="70" rx="10" fill="#8a3fd1" stroke="${A.OL}" stroke-width="3"/>` +
      A.dragon({ x: 640, y: 440, s: .5, mood: 'calm', cls: 'sway', flip: true }) + A.flicker({ x: 480, y: 446, s: .28, mood: 'laugh' }) +
      trio([[120, 446, .6, 'sing'], [230, 452, .7, 'up', 'sword'], [340, 446, .6, 'drum', 'sticks']]) + A.princess({ ...MAGNOLIA, x: 440, y: 446, s: .6, pose: 'up', prop: 'sword', cls: 'bob' }) + tiny(540, 446, .12) +
      A.word(400, 70, 46, 'THE END', '#ffc83d', -2) + A.sparkles([[80, 120], [740, 160, 8], [420, 160, 7]]),
  };

  SB.text.hero = story.hero;
  SB.registerBook({
    id: story.id,
    order: 3,
    title: story.title,
    short: story.short,
    theme: story.theme,
    pages: story.pages.map((p, i) => {
      let text = SB.text.markup(p.text);
      if (p.id === 'cover') text = `<h2 class="cover-title">The Sparkle Swords <span>and</span> Scorch's Little Flame</h2>` + text;
      if (i === story.pages.length - 1) text += `<p class="actions">${SB.text.action('restart', 'Read it again!')} ${SB.text.action('open-book', 'Back to book one', 'data-book="sparkle-swords"')}</p>`;
      return { ...p, art: SCENES[p.scene], text };
    }),
  });
})(window.SB);
