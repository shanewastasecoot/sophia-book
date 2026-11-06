/* Book 1: Princess Sophia and the Noisy Shadow Demon.

   Page fields:
     id     short slug, used in the URL (#sparkle-swords/grumbo)
     title  label in the Pages menu
     theme  optional world theme for this page (defaults to the book's theme)
     fx     optional canvas effect on top of the art: 'sparkles' | 'bubbles' | 'glow'
     images optional [{ src, alt }] raster layers above the SVG (lazy-loaded, prefetched one page ahead)
     alt    description of the picture for screen readers
     art    () => SVG fragment in an 800 x 500 box (built only when the page is near)
     text   HTML for the read-aloud copy */
(function (SB) {
  const A = SB.art, { SOPHIA, LUNA, RUBY } = A.cast;
  const { sfx, dad, note, say, shout, huge, whisper, action } = SB.text;
  const her = SB.text.name('Sophia');

  const scroll = (x, y) => `<g transform="translate(${x} ${y}) rotate(3)"><g stroke="${A.OL}" stroke-width="3.5" stroke-linejoin="round">
      <rect x="-150" y="-128" width="300" height="250" rx="6" fill="#fff4dc"/>
      <rect x="-166" y="-148" width="332" height="28" rx="14" fill="#f0d9a8"/><rect x="-166" y="112" width="332" height="28" rx="14" fill="#f0d9a8"/></g>
      <text text-anchor="middle" font-family="Grandstander, sans-serif" font-weight="900" fill="${A.OL}">
        <tspan x="0" y="-74" font-size="38" fill="#ff4fa3">THE RULE</tspan>
        <tspan x="0" y="-26" font-size="22">{Reader} has to say</tspan>
        <tspan x="0" y="12" font-size="34" fill="#8a3fd1">EVERY WORD</tspan>
        <tspan x="0" y="50" font-size="20">in this book.</tspan>
        <tspan x="0" y="86" font-size="17" font-weight="600">(Even the silly ones.)</tspan>
      </text></g>`;

  SB.registerBook({
    id: 'sparkle-swords',
    order: 1,
    title: 'Princess Sophia and the Noisy Shadow Demon',
    short: 'The Noisy Shadow Demon',
    theme: 'sparkle-night',
    pages: [
      {
        id: 'cover', title: 'Cover', fx: 'sparkles',
        alt: 'Princess Sophia holding up her glowing sword with Princess Luna and Princess Ruby. A big blue shadow demon peeks out behind the castle.',
        art: () => A.sky('night') + A.moon(670, 85) + A.castle(400, 440, 1.05, true) + A.shield(400, 445, 300, 300, .6) +
          A.grumbo({ x: 725, y: 470, s: .42, mood: 'grin' }) + A.ground(true) +
          A.princess({ ...LUNA, x: 215, y: 470, s: .95, pose: 'sing', prop: 'mic', cls: 'sway' }) +
          A.princess({ ...RUBY, x: 585, y: 470, s: .95, pose: 'drum', prop: 'sticks', cls: 'sway' }) + A.drum(585, 472, .7) +
          A.princess({ ...SOPHIA, x: 400, y: 480, s: 1.15, pose: 'up', prop: 'sword', cls: 'bob' }),
        text: `<h2 class="cover-title">Princess Sophia <span>and the</span> Noisy Shadow Demon</h2>
          <p class="cover-sub">A book {Reader} has to read EXACTLY the way it's written.</p>
          <p class="hint">Tap the bright words to hear their sounds. Swipe or tap the arrow to turn the page.</p>
          {reader-choice}`,
      },
      {
        id: 'rule', title: 'The Rule',
        alt: 'Princess Sophia, hand on her hip, pointing very bossily at a giant scroll.',
        art: () => A.sky('dusk') + A.ground(false) + scroll(540, 255) +
          A.princess({ ...SOPHIA, x: 215, y: 482, s: 1.45, pose: 'hold', cls: 'bob' }) +
          A.sparkles([[380, 90, 8], [720, 420, 8], [90, 120, 7]], '#fff'),
        text: `<p>Hi, ${her}! Are you listening? Good.</p>
          <p>This book has one rule: everything written here, {Reader} has to ${huge('SAY.')}</p>
          <p>Even the silly words. Even the <b>VERY</b> silly words.</p>
          <p>No skipping, {Reader}. ${note('(Sophia is watching you.)')}</p>`,
      },
      {
        id: 'sophia', title: 'Princess Sophia',
        alt: 'Princess Sophia cheering with both arms up, her big curly brown hair going boing.',
        art: () => A.sky('dusk') + A.castle(120, 445, .7, false) + A.ground(false) +
          A.princess({ ...SOPHIA, x: 410, y: 490, s: 1.7, pose: 'wave', hairCls: 'boing' }) +
          A.sparkles([[250, 110], [610, 90, 12], [650, 300], [220, 290, 7], [570, 200, 6]], '#fff') +
          A.word(660, 430, 46, 'BOING!', '#ff4fa3', 8),
        text: `<p>This is Princess Sophia. Hey, wait a minute... that's <b>YOU!</b></p>
          <p>She has curly, swirly, twirly hair. ${sfx('boing', 'BOING!')} ${sfx('boing', 'BOING!')} ${sfx('boing', 'BOING!')}</p>
          <p>She is brave. She is sparkly. And she is the BOSS of this book.</p>
          <p>${note('{Reader}, say this:')} ${dad('“Yes, Princess Sophia. You are the boss of me.”')}</p>`,
      },
      {
        id: 'band', title: 'The Sparkle Swords', fx: 'sparkles',
        alt: 'The three princesses playing on a purple stage under pink and blue spotlights, with music notes floating across the night sky.',
        art: () => A.sky('night') + A.spot(150, 220, 'spotPink') + A.spot(400, 400, 'spotCyan') + A.spot(650, 580, 'spotPink') + A.stage() +
          `<g transform="translate(400 62) rotate(-3)"><rect x="-210" y="-34" width="420" height="62" rx="31" fill="#ff4fa3" stroke="#fff" stroke-width="4"/><text text-anchor="middle" y="12" font-family="Grandstander, sans-serif" font-weight="900" font-size="34" fill="#fff">THE SPARKLE SWORDS</text></g>` +
          A.princess({ ...LUNA, x: 200, y: 448, s: 1.05, pose: 'sing', prop: 'mic', cls: 'sway' }) +
          A.princess({ ...RUBY, x: 600, y: 448, s: 1.05, pose: 'drum', prop: 'sticks', cls: 'sway' }) + A.drum(600, 452, .78) +
          A.princess({ ...SOPHIA, x: 400, y: 456, s: 1.22, pose: 'up', prop: 'sword', cls: 'bob' }) +
          A.note(90, 200, 44, '#ffc83d') + A.note(700, 190, 48, '#5ff2ff', '♫') + A.note(290, 150, 36, '#ff7ac1') + A.note(530, 140, 40, '#fff', '♫'),
        text: `<p>Sophia has a band. It's called ${shout('THE SPARKLE SWORDS!')}</p>
          <p>Princess Luna sings. Princess Ruby drums. And Princess Sophia has a magic sword that SINGS when she swings it!</p>
          <p>${sfx('swish', 'SWISH!')} ${say('“La!”')} ${sfx('swish', 'SWOOSH!')} ${say('“La-LA!”')}</p>`,
      },
      {
        id: 'shield', title: 'The Glitter Shield',
        alt: 'The princesses singing in front of the castle. Their music makes a glowing golden dome over it.',
        art: () => A.sky('night') + A.moon(110, 90) + A.castle(400, 445, 1.1, true) + A.shield(400, 450, 330, 340, 1) + A.ground(true) +
          A.princess({ ...LUNA, x: 320, y: 480, s: .55, pose: 'sing', prop: 'mic', cls: 'sway' }) +
          A.princess({ ...SOPHIA, x: 400, y: 484, s: .62, pose: 'up', prop: 'sword', cls: 'sway' }) +
          A.princess({ ...RUBY, x: 480, y: 480, s: .55, pose: 'drum', prop: 'sticks', cls: 'sway' }) + A.drum(480, 482, .4) +
          A.note(240, 300, 34, '#ffd65a') + A.note(550, 260, 38, '#ffd65a', '♫') + A.note(330, 180, 30, '#fff') + A.note(470, 140, 34, '#ffd65a') +
          A.word(620, 190, 30, '...PICKLE BOTTOM?!', '#9be15d', 6),
        text: `<p>Every night, the Sparkle Swords sing a song that makes a golden <b>Glitter Shield</b> over the castle. ${sfx('hum', 'HUMMM...')}</p>
          <p>${note('{Reader}, sing the song in your highest, squeakiest voice:')} ${dad('“La-dee-DAAA, sparkle-sparkle... PICKLE BOTTOM!”')}</p>
          <p>Pickle bottom?! That's not in the song! ${note('Too late, {Reader}. You already sang it.')}</p>`,
      },
      {
        id: 'burp', title: 'BUUURP!',
        alt: 'The sky is dark. A huge blue demon with purple horns and a goofy grin rises behind the hills and burps a giant green cloud, while the ground shakes under the three princesses.',
        art: () => A.sky('dark') + A.castle(200, 455, .85, true) + A.grumbo({ x: 560, y: 540, s: 1.25, mood: 'grin' }) + A.ground(true) +
          `<g class="floaty"><g stroke="#3f7a1f" stroke-width="3"><circle cx="330" cy="150" r="46" fill="#9be15d"/><circle cx="290" cy="120" r="30" fill="#b5ef6e"/><circle cx="370" cy="115" r="26" fill="#86d04a"/></g></g>` +
          A.word(330, 165, 40, 'BURP!', '#fff', -8) + A.word(120, 475, 30, 'RUMBLE', '#ffc83d', -4) + A.word(700, 480, 30, 'RUMBLE', '#ffc83d', 5),
        text: `<p>But one night... the sky went dark.</p>
          <p>The ground went ${sfx('rumble', 'RUMBLE... RUMBLE...')}</p>
          <p>And then... ${sfx('burp', 'BUUURP!')}</p>
          <p>Out popped a shadow demon as big as a mountain and as blue as a blueberry!</p>`,
      },
      {
        id: 'grumbo', title: 'Grumbo',
        alt: 'A close-up of the big blue demon grinning, with green stink clouds around his feet.',
        art: () => A.sky('dark') + A.spot(400, 400, 'spotCyan') + A.grumbo({ x: 400, y: 560, s: 1.42, mood: 'grin', cls: 'bob' }) +
          A.stink(110, 420, 1.1) + A.stink(690, 410, 1.2) + A.word(150, 110, 44, 'TOE JAM?!', '#9be15d', -8) +
          A.sparkles([[700, 90, 8], [620, 200, 6], [80, 250, 6]], '#fff'),
        text: `<p>${note('{Reader}, you have to do the monster voice now. Big and grumbly. Ready?')}</p>
          <p>${dad('“I am GRUMBO! I am BIG! I am BLUE! And I have STINKY TOE JAM!”')}</p>
          <p>${her}, did {Reader} just say <b>toe jam</b>? {He} did!</p>
          <p>${dad('“And I do NOT like singing!”')} ${sfx('roar', 'RAAAWR!')}</p>`,
      },
      {
        id: 'chomp', title: 'CHOMP!',
        alt: 'Grumbo with his mouth wide open, slurping up birds, an ice cream cone, music notes, and the King\'s sleepy snore, while Sophia watches.',
        art: () => A.sky('dark') + A.grumbo({ x: 400, y: 545, s: 1.2, mood: 'chomp', cls: 'shake' }) + A.ground(true) +
          A.bird(160, 170, 1.3, '#5fc8ff') + A.bird(650, 140, 1.2, '#ffd65a') + A.iceCream(130, 330, 1.3) + A.zzz(610, 320, 46, '#ffd65a') +
          A.note(240, 110, 40, '#ff7ac1') + A.note(560, 230, 36, '#5ff2ff', '♫') +
          `<g stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"><path d="M200 190l60 40M195 340l70 -10M610 170l-60 50M600 300l-70 0"/></g>` +
          A.word(400, 70, 56, 'CHOMP!', '#ff4fa3', -4, '#fff'),
        text: `<p>Grumbo gobbled up ALL the songs in the kingdom.</p>
          <p>${sfx('chomp', 'CHOMP!')} The birds' tweet-tweet. ${sfx('chomp', 'CHOMP!')} The ice cream truck's ding-ding. ${sfx('chomp', 'CHOMP!')} Even the King's snore!</p>
          <p>${note('{Reader}, read the next part in a teeny-tiny whisper.')} ${whisper('it was so quiet, you could hear a butterfly burp.')}</p>`,
      },
      {
        id: 'showtime', title: 'Showtime', fx: 'sparkles',
        alt: 'The three princesses in a heroic pose under pink and blue spotlights.',
        art: () => A.sky('night') + A.spot(120, 190, 'spotCyan') + A.spot(400, 400, 'spotPink') + A.spot(680, 610, 'spotCyan') + A.ground(true) +
          A.princess({ ...LUNA, x: 180, y: 474, s: 1.1, pose: 'sing', prop: 'mic', cls: 'sway' }) +
          A.princess({ ...RUBY, x: 620, y: 474, s: 1.1, pose: 'drum', prop: 'sticks', cls: 'sway' }) + A.drum(620, 478, .82) +
          A.princess({ ...SOPHIA, x: 400, y: 486, s: 1.45, pose: 'up', prop: 'sword', cls: 'bob' }) +
          A.word(400, 52, 40, 'SHOWTIME!', '#ffc83d', -3),
        text: `<p>But Princess Sophia was NOT scared. She jumped up and said, ${say('“Sparkle Swords, it\'s SHOWTIME!”')}</p>
          <p>${her}, you shout it too. {Reader}, you shout it with her. One, two, three...</p>
          <p>${shout('SPARKLE SWORDS, LET\'S GO!')}</p>`,
      },
      {
        id: 'toot', title: 'TOOT!',
        alt: 'Grumbo stomping with a goofy grin while green stink clouds puff out behind him. Luna and Ruby hold their noses and Sophia makes a yucky face.',
        art: () => A.sky('night') + A.ground(true) + A.grumbo({ x: 610, y: 470, s: .92, mood: 'roar', cls: 'shake' }) +
          A.stink(450, 250, 1.4) + A.stink(390, 160, 1) + A.stink(480, 110, .8) +
          A.princess({ ...LUNA, x: 90, y: 472, s: .9, pose: 'nose' }) +
          A.princess({ ...SOPHIA, x: 215, y: 478, s: 1.02, pose: 'nose' }) +
          A.princess({ ...RUBY, x: 340, y: 472, s: .9, pose: 'nose' }) +
          A.word(150, 110, 44, 'EWWW!', '#9be15d', -6) + A.word(660, 70, 40, 'TOOT!', '#ffc83d', 6) +
          `<g stroke="#ffc83d" stroke-width="5" stroke-linecap="round"><path d="M505 478l-20 8M715 478l20 8M530 490l-14 12M690 490l14 12"/></g>`,
        text: `<p>Grumbo stomped. ${sfx('stomp', 'STOMP!')} ${sfx('stomp', 'STOMP!')} And then Grumbo did a big... stinky... ${sfx('toot', 'TOOT!')}</p>
          <p>${say('“EWWWW!”')} said the princesses.</p>
          <p>${note('{Reader}, say this:')} ${dad('“It wasn\'t me! ...Okay, maybe it was a LITTLE bit me.”')}</p>`,
      },
      {
        id: 'sword', title: 'Shwing-a-ding-ding',
        alt: 'Sophia swings her glowing sword and a rainbow of music flies at a very surprised Grumbo.',
        art: () => A.sky('night') + A.ground(true) +
          `<path d="M345 165Q490 40 590 240" fill="none" stroke="url(#rainbow)" stroke-width="18" stroke-linecap="round" stroke-dasharray="40 20" class="beam" filter="url(#glow)"/>` +
          A.grumbo({ x: 640, y: 472, s: .8, mood: 'surprised', cls: 'shake' }) +
          A.princess({ ...SOPHIA, x: 230, y: 484, s: 1.42, pose: 'up', prop: 'sword', cls: 'bob' }) +
          A.note(430, 160, 40, '#ffc83d') + A.note(520, 120, 36, '#ff7ac1', '♫') + A.note(470, 260, 32, '#5ff2ff') +
          A.word(400, 56, 40, 'SHWING-A-DING-DING!', '#ffc83d', -3),
        text: `<p>Sophia swung her magic sword. ${sfx('swish', 'SWISH!')}</p>
          <p>${note('{Reader}, you have to make the sword noise:')} ${dad('“SHWING-a-ding-DING!”')}</p>
          <p>Luna sang high: ${sfx('la', 'La-la-LAAA!')} Ruby drummed loud: ${sfx('boom', 'BOOM-BA-BOOM!')}</p>
          <p>Grumbo's eyes went BOINK.</p>`,
      },
      {
        id: 'wiggle', title: 'Wiggle Wobble',
        alt: 'The three princesses and Grumbo all wiggling and dancing under spotlights.',
        art: () => A.sky('night') + A.spot(120, 150, 'spotPink') + A.spot(400, 330, 'spotCyan') + A.spot(680, 520, 'spotPink') + A.ground(true) +
          A.grumbo({ x: 660, y: 470, s: .62, mood: 'surprised', cls: 'wiggle' }) +
          A.princess({ ...LUNA, x: 110, y: 474, s: .95, pose: 'wave', cls: 'wiggle' }) +
          A.princess({ ...SOPHIA, x: 280, y: 480, s: 1.12, pose: 'wave', cls: 'wiggle' }) +
          A.princess({ ...RUBY, x: 450, y: 474, s: .95, pose: 'wave', cls: 'wiggle' }) +
          `<g stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"><path d="M40 430q-12 -14 0 -28M180 430q12 -14 0 -28M200 430q-12 -14 0 -28M360 430q12 -14 0 -28M380 430q-12 -14 0 -28M520 430q12 -14 0 -28"/></g>` +
          A.word(400, 60, 46, 'WIGGLE WOBBLE!', '#ff4fa3', -4, '#fff'),
        text: `<p>Then the princesses did their secret move: the <b>Wiggle Wobble!</b></p>
          <p>Everybody has to do it. Yes, {Reader}. You too. Stand up!</p>
          <p>Wiggle your bottom and say: ${dad('“I am a wiggly, jiggly JELLY PRINCESS!”')}</p>
          <p>${her}, was {Reader} wiggly enough? Do it AGAIN, {Reader}!</p>`,
      },
      {
        id: 'pop', title: 'POP!',
        alt: 'Grumbo shown four times, getting smaller and smaller until he is teeny tiny, with a big POP.',
        art: () => A.sky('night') + A.ground(true) +
          A.grumbo({ x: 130, y: 462, s: .5 }) + A.grumbo({ x: 340, y: 462, s: .3, mood: 'surprised' }) + A.grumbo({ x: 500, y: 462, s: .17, mood: 'surprised' }) +
          A.grumbo({ x: 640, y: 462, s: .07, mood: 'cute' }) +
          `<g fill="#ffd65a" opacity=".85"><circle cx="248" cy="380" r="5"/><circle cx="264" cy="380" r="5"/><circle cx="420" cy="410" r="4"/><circle cx="434" cy="410" r="4"/><circle cx="560" cy="430" r="3.5"/><circle cx="572" cy="430" r="3.5"/></g>` +
          `<g transform="translate(700 380)">${A.star4(0, 0, 46, '#ffc83d', 'twinkle')}</g>` + A.word(700, 300, 48, 'POP!', '#ff4fa3', 8, '#fff') +
          A.sparkles([[600, 380, 8], [760, 440, 7], [650, 330, 6]], '#fff'),
        text: `<p>The music was SO sparkly that Grumbo started to shrink!</p>
          <p>Mountain-big... house-big... puppy-big... ${sfx('pop', 'POP!')}</p>
          <p>${huge('teeny-tiny!')}</p>`,
      },
      {
        id: 'squeak', title: 'Squeak',
        alt: 'Sophia holds a jellybean-sized Grumbo in her hand. Birds, ice cream, and music notes fly out of him.',
        art: () => A.sky('night') + A.ground(true) +
          A.princess({ ...SOPHIA, x: 320, y: 482, s: 1.45, pose: 'hold' }) +
          A.grumbo({ x: 390, y: 376, s: .13, mood: 'cute' }) +
          A.bird(520, 170, 1.1, '#5fc8ff') + A.bird(640, 120, 1, '#ffd65a') + A.iceCream(710, 260, 1) + A.zzz(560, 330, 34, '#ffd65a') +
          A.note(470, 240, 34, '#ff7ac1') + A.note(600, 70, 32, '#5ff2ff', '♫') +
          A.word(470, 320, 26, 'squeak!', '#5fc8ff', -8, '#fff') + A.word(640, 430, 34, 'HONK-SHOOO!', '#ffc83d', -3),
        text: `<p>Now Grumbo was as small as a jellybean. ${sfx('squeak', 'squeak!', 'tiny')}</p>
          <p>All the songs came tumbling back out! ${sfx('tweet', 'Tweet-tweet!')} ${sfx('ding', 'Ding-ding!')}</p>
          <p>And the King's snore. ${note('{Reader}, do the King\'s snore. Louder. LOUDER!')} ${sfx('honk', 'HONK-SHOOOOO!')}</p>`,
      },
      {
        id: 'friend', title: 'A New Friend',
        alt: 'At sunset, Sophia holds tiny Grumbo in her hand. He wears a teeny crown and has a teeny drum, and Luna and Ruby smile at him. Little hearts float in the sky.',
        art: () => A.sky('dusk') + A.ground(false) +
          A.princess({ ...LUNA, x: 140, y: 478, s: 1, pose: 'wave', cls: 'sway' }) +
          A.princess({ ...SOPHIA, x: 300, y: 486, s: 1.2, pose: 'wave', cls: 'sway' }) +
          A.princess({ ...RUBY, x: 660, y: 478, s: 1, pose: 'wave', cls: 'sway' }) +
          A.grumbo({ x: 470, y: 476, s: .22, mood: 'cute', crown: true }) + A.drum(535, 478, .45) +
          A.heart(440, 320, 1, '#ff4fa3') + A.heart(520, 290, .7, '#ff7ac1') +
          A.sparkles([[90, 80], [560, 70, 8], [740, 200, 7], [400, 140, 7]], '#fff'),
        text: `<p>Sophia picked him up. ${say('“Grumbo, were you grumpy because nobody ever sang WITH you?”')}</p>
          <p>${note('{Reader}, answer in your tiniest, squeakiest Grumbo voice:')} ${dad('“Squeak.”')}</p>
          <p>That meant yes. So Sophia gave him a teeny drum to go with his teeny crown, and Grumbo became the smallest Sparkle Sword ever!</p>`,
      },
      {
        id: 'end', title: 'The End', fx: 'sparkles',
        alt: 'The castle at night under the golden Glitter Shield. The three princesses sit on a blanket singing sleepily, tiny Grumbo drums on a rock, and a mermaid secretly peeks out from the reeds of a pond.',
        art: () => A.sky('night') + A.moon(660, 85) + A.castle(400, 445, 1.1, true) + A.shield(400, 450, 330, 340, 1) + A.ground(true) +
          A.zzz(250, 200, 30) + A.note(330, 150, 26, '#ffd65a') + A.note(480, 170, 24, '#fff', '♫') +
          A.grumbo({ x: 300, y: 474, s: .06, mood: 'cute', crown: true }) + A.word(300, 435, 18, 'squeak!', '#5fc8ff', -8, '#fff') +
          A.word(400, 60, 46, 'THE END', '#ffc83d', -2),
        text: `<p>Now every night, the Sparkle Swords sing, the Glitter Shield glows gold, and a teeny-tiny voice sings along. ${sfx('squeak', 'squeak!', 'tiny')}</p>
          <p>${her}, did {Reader} read EVERY word? Then {he} gets to say one last thing:</p>
          <p>${dad('“Goodnight, Princess Sophia. Goodnight, my boss.”')}</p>
          <p><b>The End.</b></p>
          <p class="actions">${action('restart', 'Read it again!')} ${action('open-book', 'Next adventure: Mermaid City', 'data-book="mermaid-city"')}</p>`,
      },
    ],
  });
})(window.SB);
