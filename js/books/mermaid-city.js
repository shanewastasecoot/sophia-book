/* Book 2: Sophia and the Mermaid City.
   The words and page structure live in mermaid-city.story.js (plain JSON). This file adds what JSON
   can't hold: the drawing for each `scene` key, the treasure icons, and the book's sound effects. */
(function (SB) {
  const A = SB.art, T = A.treasure, { SOPHIA, LUNA, RUBY } = A.cast;
  const story = SB.stories['mermaid-city'];
  const au = SB.audio;

  /* ---------- Sounds ---------- */
  au.register('splash', () => { au.noise(.6, 3000, 400, .5); au.tone(300, 90, .3, 'sine', .3); });
  au.register('glub', () => [0, .14].forEach((t, i) => au.tone(260 + i * 60, 520 + i * 90, .09, 'sine', .3, t)));
  au.register('whoosh', () => au.noise(.55, 300, 3500, .45));
  au.register('boop', () => au.tone(880, 660, .1, 'sine', .25));
  au.register('clank', () => { au.tone(180, 120, .25, 'square', .18); au.noise(.2, 2500, 1200, .3); });
  au.register('squish', () => au.tone(220, 70, .35, 'sawtooth', .3, 0, 18));
  au.register('giggle', () => [0, .1, .2, .3].forEach((t, i) => au.tone(700 + i * 40, 900 + i * 40, .07, 'triangle', .2, t)));
  au.register('snort', () => au.tone(110, 80, .25, 'sawtooth', .4, 0, 30));
  au.register('bloop', () => au.tone(220, 900, .14, 'sine', .3));
  au.register('blink', () => [0, .3].forEach(t => au.tone(1200, 1100, .05, 'sine', .15, t)));
  au.register('hoohoo', () => [0, .22, .44].forEach(t => au.tone(240, 180, .18, 'triangle', .35, t, 6)));
  au.register('click', () => [0, .16, .32].forEach(t => au.tone(1800, 1600, .03, 'square', .15, t)));
  au.register('pickup', () => [784, 988, 1175, 1568].forEach((f, i) => au.tone(f, f, .16, 'sine', .16, i * .06)));
  const NOTES = { pink: 523, blue: 659, gold: 784 };
  for (const [k, f] of Object.entries(NOTES)) au.register('ocarina-' + k, () => { au.tone(f, f * 1.002, .5, 'sine', .3, 0, 5); au.noise(.2, f * 2, f * 2, .03); });
  au.register('gate-open', () => [523, 659, 784, 1047, 1319].forEach((f, i) => au.tone(f, f, .3, 'triangle', .2, i * .1)));

  /* ---------- Little scene helpers ---------- */
  const mermaids = (pos, extra = {}) => [[LUNA, ...pos[0]], [SOPHIA, ...pos[1]], [RUBY, ...pos[2]]]
    .map(([who, x, y, s, pose = 'wave', cls = 'bob']) => A.princess({ ...who, x, y, s, pose, cls, mermaid: true, ...extra })).join('');
  const tentacle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" class="sway">
    <path d="M120 0Q40 -10 20 -70q-10 -40 30 -50q30 -4 26 24" fill="none" stroke="#5a1f7e" stroke-width="34" stroke-linecap="round"/>
    <path d="M120 0Q40 -10 20 -70q-10 -40 30 -50q30 -4 26 24" fill="none" stroke="#b866e0" stroke-width="26" stroke-linecap="round"/>
    <circle cx="36" cy="-40" r="5" fill="#f2c4ff"/><circle cx="54" cy="-14" r="5" fill="#f2c4ff"/><circle cx="34" cy="-80" r="4" fill="#f2c4ff"/></g>`;
  const ink = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" class="floaty" opacity=".8"><circle r="30" fill="#5a1f7e"/><circle cx="26" cy="-10" r="22" fill="#6d2a94"/><circle cx="-22" cy="-14" r="18" fill="#4a1868"/></g>`;
  const icon = (fn, x, y, size) => `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${size / 100})">${fn()}</g>`;
  const fishes = () => A.fish(680, 150, 1, '#ffd65a', true) + A.fish(110, 210, .8, '#ff7ac1') + A.fish(740, 300, .7, '#5fc8ff', true);
  const deep = () => A.water('deep') + A.rays();
  const lagoon = () => A.water('lagoon') + A.rays();

  const SCENES = {
    cover: () => deep() + A.city(400, 420, .95) + A.seabed(true) + A.seaweed(50, 480, 170) + A.seaweed(90, 490, 120, '#24a862') +
      A.coral(160, 486, .85, '#ffb340') + tentacle(690, 470, 1) + fishes() +
      mermaids([[220, 452, .9], [400, 472, 1.15], [580, 452, .9]]) + A.pip({ x: 560, y: 160, s: 1.1, talk: true }),

    splash: () => lagoon() +
      `<path d="M0 0H800V64Q700 84 600 64T400 64T200 64T0 64Z" fill="#dffcff" opacity=".8"/>
       <g fill="#fff" stroke="${A.OL}" stroke-width="2.5" class="floaty"><path d="M330 70q-30 -40 -10 -64q8 30 22 40Z"/><path d="M470 70q30 -40 10 -64q-8 30 -22 40Z"/><circle cx="400" cy="20" r="8"/><circle cx="360" cy="30" r="5"/><circle cx="440" cy="26" r="6"/></g>` +
      A.word(400, 56, 52, 'SPLASH!', '#5ff2ff', -4, '#fff') +
      mermaids([[220, 360, .8, 'up', 'bob'], [400, 470, 1.05, 'up', 'bob'], [590, 380, .8, 'up', 'bob']]) +
      A.bubble(300, 200, 16) + A.bubble(500, 240, 20) + A.bubble(150, 300, 12) + A.bubble(660, 180, 14),

    pip: () => lagoon() + A.seabed(false) + A.seaweed(40, 480, 180) + A.seaweed(760, 480, 200, '#24a862') + A.shell(160, 472, .9) +
      mermaids([[110, 470, .75], [230, 478, .85, 'hold'], [350, 470, .75]]) +
      A.pip({ x: 590, y: 250, s: 2.3, talk: true }) + A.word(600, 70, 34, 'HI-HELLO-HIYA!', '#ffe27a', 4),

    gatesShut: () => deep() + A.city(400, 330, .8) + A.seabed(true) + A.gates(400, 470, .9, false) +
      mermaids([[90, 470, .7, 'nose'], [700, 474, .75], [790, 470, .7]]) +
      A.pip({ x: 130, y: 250, s: 1, flip: true }) + A.word(400, 64, 52, 'CLANK!', '#ffc06b', -5),

    squish: () => deep() + A.city(400, 330, .8) + A.seabed(true) + A.gates(400, 470, .9, false) +
      ink(160, 160, 1.2) + ink(640, 120, .9) + ink(300, 90, .7) + tentacle(660, 470, 1.2) +
      A.word(400, 64, 52, 'SQUISH…', '#ff5fd2', 3) + A.pip({ x: 110, y: 330, s: 1, cls: 'shake' }),

    lock: () => deep() + A.gates(400, 600, 1.45, false) + A.pip({ x: 640, y: 330, s: 1.7, talk: true }) +
      A.word(400, 70, 40, '3 SHELLS!', '#5ff2ff', -3),

    kelp: () => lagoon() + A.seabed(false) + A.kelpForest() +
      mermaids([[220, 470, .85, 'wave', 'wiggle'], [370, 478, .95, 'wave', 'wiggle'], [600, 470, .85, 'wave', 'wiggle']]) +
      A.word(160, 120, 40, 'HEE-HEE!', '#ff5fd2', -8, '#fff') + A.word(660, 130, 36, 'SNORT!', '#ffc06b', 8),

    vents: () => deep() + A.seabed(true) + A.vents() +
      mermaids([[180, 300, .6], [420, 210, .65], [640, 270, .6]], { cls: 'bob' }) + A.word(170, 80, 44, 'BOING!', '#ff5fd2', -8),

    caveEyes: () => deep() + A.cave() + A.octopus({ x: 400, y: 440, s: 1, mood: 'eyes' }) +
      A.princess({ ...LUNA, x: 40, y: 500, s: .55, pose: 'nose', mermaid: true }) +
      A.princess({ ...SOPHIA, x: 760, y: 500, s: .6, pose: 'up', mermaid: true, prop: 'sword' }) +
      A.pip({ x: 120, y: 400, s: .9, cls: 'shake' }) + A.word(400, 470, 30, 'blink… blink…', '#ffe27a', 0),

    octopusGrumpy: () => deep() + A.seabed(true) + A.octopus({ x: 520, y: 480, s: 1.05, mood: 'grumpy', cls: 'shake' }) +
      icon(T.shellGold, 520, 380, 70) + mermaids([[70, 470, .65, 'nose'], [170, 476, .72, 'up'], [270, 470, .65, 'nose']]) +
      A.word(680, 70, 46, 'HMPH!', '#ff5fd2', 6),

    octopusSad: () => deep() + A.seabed(true) + A.octopus({ x: 540, y: 480, s: 1, mood: 'grumpy', cls: 'bob' }) +
      `<path d="M598 300q12 22 0 30q-12 -8 0 -30Z" fill="#9fe8ff" stroke="${A.OL}" stroke-width="3"/>` +
      icon(T.shellGold, 540, 380, 66) + A.princess({ ...SOPHIA, x: 280, y: 470, s: 1.1, pose: 'wave', mermaid: true, cls: 'bob' }) +
      A.pip({ x: 120, y: 260, s: 1 }),

    hideSeek: () => lagoon() + A.seabed(false) + A.octopus({ x: 400, y: 486, s: .8, mood: 'hiding', cls: 'wiggle' }) +
      mermaids([[110, 470, .75, 'wave', 'wiggle'], [690, 476, .82, 'wave', 'wiggle'], [800, 470, .7, 'wave', 'wiggle']]) +
      A.word(400, 64, 46, 'WE SEE YOU!', '#ffe27a', -3) + A.word(620, 160, 34, 'HOO-HOO!', '#ff5fd2', 8),

    octopusHappy: () => deep() + A.seabed(true) + A.octopus({ x: 560, y: 486, s: .95, mood: 'happy', cls: 'sway' }) +
      mermaids([[90, 470, .7], [210, 478, .8], [330, 470, .7]]) + A.pip({ x: 240, y: 170, s: 1, talk: true, cls: 'floaty' }) +
      A.heart(660, 120, 1, '#ff5fd2') + A.heart(720, 170, .7, '#ff7ac1'),

    gateSong: () => deep() + A.city(400, 330, .8) + A.seabed(true) + A.gates(400, 470, .9, false, true) +
      A.princess({ ...SOPHIA, x: 130, y: 476, s: 1, pose: 'sing', mermaid: true }) + icon(T.ocarina, 172, 386, 48) +
      A.note(220, 300, 38, '#ff7ac1') + A.note(260, 250, 34, '#5fc8ff', '♫') + A.note(300, 210, 36, '#ffd34d') +
      A.pip({ x: 690, y: 300, s: 1.1, talk: true }),

    gatesOpen: () => deep() + A.city(400, 330, .8) + A.seabed(true) + A.gates(400, 470, .9, true) +
      A.bubble(330, 220, 18) + A.bubble(460, 180, 24) + A.bubble(400, 120, 14) + fishes() +
      mermaids([[90, 470, .7, 'up'], [210, 478, .78, 'up'], [690, 470, .7, 'up']]) +
      A.octopus({ x: 820, y: 520, s: .45, mood: 'happy', cls: 'bob' }) + A.word(400, 60, 50, 'WHOOOOSH!', '#5ff2ff', -3, '#fff'),

    party: () => lagoon() + A.city(400, 350, .7) + A.seabed(false) + A.coral(130, 486, 1.3, '#ff7a9c') + A.coral(680, 486, 1.2, '#b06cff') +
      A.octopus({ x: 400, y: 486, s: .7, mood: 'happy', cls: 'sway' }) + A.seaweed(260, 490, 220) + A.seaweed(560, 490, 200, '#24a862') +
      A.princess({ ...LUNA, x: 130, y: 400, s: .5, pose: 'wave', mermaid: true, cls: 'bob' }) +
      A.princess({ ...RUBY, x: 690, y: 400, s: .5, pose: 'wave', mermaid: true, cls: 'bob' }) +
      A.princess({ ...SOPHIA, x: 200, y: 250, s: .5, pose: 'wave', mermaid: true, cls: 'bob' }) +
      A.pip({ x: 600, y: 170, s: .9, talk: true, cls: 'floaty' }) + A.word(400, 60, 38, '…SEVEN, EIGHT!', '#ffe27a', -3),

    goodnight: () => deep() + `<circle cx="640" cy="60" r="70" fill="#fff6c9" opacity=".18" filter="url(#glow)"/>` + A.city(400, 420, 1) + A.seabed(true) +
      mermaids([[160, 470, .7], [270, 478, .78], [380, 470, .7]]) + A.pip({ x: 530, y: 330, s: .9 }) +
      A.octopus({ x: 690, y: 490, s: .5, mood: 'happy', cls: 'sway' }) + A.word(400, 70, 46, 'THE END', '#ffe27a', -2),
  };

  const ICONS = { ocarina: T.ocarina, 'shell-pink': T.shellPink, 'shell-blue': T.shellBlue, 'shell-gold': T.shellGold };
  SB.text.hero = story.hero;

  SB.registerBook({
    id: story.id,
    order: 2,
    title: story.title,
    short: story.short,
    theme: story.theme,
    items: story.items.map(it => ({ ...it, icon: ICONS[it.id] })),
    pages: story.pages.map((p, i) => {
      let text = SB.text.markup(p.text);
      if (p.id === 'cover') text = `<h2 class="cover-title">Sophia <span>and the</span> Mermaid City</h2>` + text;
      if (i === story.pages.length - 1) text += `<p class="actions">${SB.text.action('restart', 'Read it again!')} ${SB.text.action('open-book', 'Next adventure: Scorch', 'data-book="scorch"')}</p>`;
      return { ...p, art: SCENES[p.scene], text };
    }),
  });
})(window.SB);
