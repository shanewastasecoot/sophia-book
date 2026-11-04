/* Book 2: Sophia's Mermaid City Adventure. STARTER ONLY: a cover and a "coming soon" page.
   It shows the pieces the sequel will use (underwater themes, bubble/glow canvas effects,
   mermaid tails, ocean scenery, a new sound). To write the story, add pages to the array below;
   nothing in js/engine or css needs to change. Page fields are documented in sparkle-swords.js. */
(function (SB) {
  const A = SB.art, { SOPHIA, LUNA, RUBY } = A.cast;
  const { sfx, dad, note, action } = SB.text;
  const her = SB.text.name('Sophia');

  SB.audio.register('bubble', () => [0, .09, .2].forEach((t, i) => SB.audio.tone(300 + i * 120, 900 + i * 200, .08, 'sine', .22, t)));

  SB.registerBook({
    id: 'mermaid-city',
    order: 2,
    title: "Sophia's Mermaid City Adventure",
    short: 'Mermaid City',
    theme: 'mermaid-deep',
    pages: [
      {
        id: 'cover', title: 'Cover', fx: 'bubbles',
        alt: 'Mermaid Sophia waving in front of a glowing pearl city under the sea, with mermaid Luna and Ruby and tiny Grumbo in a bubble.',
        art: () => A.water('deep') + A.rays() + A.city(400, 430, 1) + A.seabed(true) +
          A.seaweed(60, 470, 150) + A.seaweed(95, 480, 110, '#24a862') + A.seaweed(740, 470, 160) + A.coral(690, 478, 1, '#ff7a9c') + A.coral(150, 482, .8, '#ffb340') +
          A.fish(650, 160, 1, '#ffd65a') + A.fish(140, 200, .8, '#ff7ac1', true) +
          A.princess({ ...LUNA, x: 220, y: 450, s: .9, pose: 'wave', mermaid: true, cls: 'bob' }) +
          A.princess({ ...RUBY, x: 580, y: 450, s: .9, pose: 'wave', mermaid: true, cls: 'bob' }) +
          A.princess({ ...SOPHIA, x: 400, y: 470, s: 1.15, pose: 'wave', mermaid: true, cls: 'bob' }) +
          A.bubble(500, 110, 34) + A.grumbo({ x: 500, y: 128, s: .1, mood: 'cute', crown: true, cls: '' }),
        text: `<h2 class="cover-title">Sophia's <span>Mermaid City</span> Adventure</h2>
          <p class="cover-sub">Book two. Daddy still has to read every word.</p>
          <p class="hint">Coming soon! Here's a sneak peek.</p>`,
      },
      {
        id: 'coming-soon', title: 'Coming Soon', theme: 'mermaid-lagoon', fx: 'glow',
        alt: 'A sunny lagoon with coral, shells and fish. Tiny Grumbo floats inside a bubble.',
        art: () => A.water('lagoon') + A.rays() + A.seabed(false) +
          A.seaweed(80, 480, 130) + A.seaweed(720, 476, 150, '#24a862') + A.coral(200, 480, 1, '#ff7a9c') + A.coral(600, 482, 1.1, '#b06cff') +
          A.shell(300, 476, 1) + A.shell(520, 480, .8, '#ffe27a') + A.fish(560, 180, 1.1, '#ff8a3d', true) + A.fish(250, 250, .9, '#5fc8ff') +
          A.bubble(400, 260, 70) + A.grumbo({ x: 400, y: 300, s: .22, mood: 'cute', crown: true, cls: '' }) +
          A.word(400, 80, 50, 'COMING SOON!', '#ffe27a', -3),
        text: `<p>${her}, guess what? Grumbo found a bubble, and the bubble floated all the way down to <b>Mermaid City!</b> ${sfx('bubble', 'BLUB BLUB!')}</p>
          <p>This story is still being written. But Daddy still has to follow the rule. ${note('Daddy, say:')} ${dad('“Blub blub. I am a very handsome fish.”')}</p>
          <p class="actions">${action('open-book', 'Back to book one', 'data-book="sparkle-swords"')}</p>`,
      },
    ],
  });
})(window.SB);
