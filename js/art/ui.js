/* Storybook UI ornaments drawn as inline SVG: chapter headers and scene dividers.
   They color themselves from the theme (CSS classes .orn-*), so they glow in the ocean themes
   and stay soft in Sparkleton. Also the tiny markup language used by JSON story files. */
(function (SB) {
  const NUM = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  const waves = (x0, n) => `M${x0} 22` + 'q10 -8 20 0t20 0'.repeat(1) + 't20 0'.repeat(n);

  function chapter(n, title) {
    return `<header class="chapter">
      <svg class="chapter-orn" viewBox="0 0 320 44" aria-hidden="true" focusable="false">
        <path class="orn-line" d="${waves(6, 4)}"/>
        <path class="orn-line" d="${waves(194, 4)}"/>
        <circle class="orn-dot" cx="132" cy="22" r="3"/><circle class="orn-dot" cx="188" cy="22" r="3"/>
        <g transform="translate(160 24)">
          <path class="orn-fill" d="M0 16L-17 7Q-18 -14 0 -17Q18 -14 17 7Z"/>
          <path class="orn-rib" d="M0 16L-10 -10M0 16V-15M0 16L10 -10"/>
          <circle class="orn-dot" cx="0" cy="-22" r="2.4"/>
        </g>
      </svg>
      <p class="chapter-num">Chapter ${NUM[n] || n}</p>
      <h2 class="chapter-title">${title}</h2>
    </header>`;
  }

  function divider() {
    return `<div class="divider" role="separator">
      <svg viewBox="0 0 320 30" aria-hidden="true" focusable="false">
        <path class="orn-line" d="${waves(20, 3)}" transform="translate(0 -6)"/>
        <path class="orn-line" d="${waves(200, 3)}" transform="translate(0 -6)"/>
        <circle class="orn-bubble" cx="146" cy="10" r="3"/><circle class="orn-bubble" cx="176" cy="8" r="4"/><circle class="orn-bubble" cx="168" cy="22" r="2.4"/>
        <path class="orn-fill" d="M160 4l3.5 7.5 8 .8-6 5.4 1.8 8-7.3-4.2-7.3 4.2 1.8-8-6-5.4 8-.8Z"/>
      </svg>
    </div>`;
  }

  SB.art.ui = { chapter, divider };

  /* Story markup for JSON page text (one string per paragraph):
       {name}               the hero's name, highlighted
       {sfx:glub|GLUB!}     a tappable sound word (sound id | label)
       {say:“Hi!”}          spoken line          {pip:“Hi-hello!”}  Pip's speedy talking
       {shout:LET'S GO!}    big shout-along      {huge:tiny!}       giant word
       {whisper:psst}       tiny text            {b:bold}           bold
       "{divider}"          (a whole paragraph) a decorative scene divider */
  const T = SB.text;
  const TAGS = {
    name: () => T.name(SB.text.hero || 'Sophia'),
    sfx: (a, b) => T.sfx(a, b || a),
    say: a => T.say(a), shout: a => T.shout(a), huge: a => T.huge(a), whisper: a => T.whisper(a),
    pip: a => `<span class="pip">${a}</span>`,
    b: a => `<b>${a}</b>`,
  };
  T.divider = divider;
  T.markup = function (paras) {
    return [].concat(paras || []).map(p => {
      if (p.trim() === '{divider}') return divider();
      return `<p>${p.replace(/\{(\w+)(?::([^|}]*))?(?:\|([^}]*))?\}/g, (m, tag, a, b) => TAGS[tag] ? TAGS[tag](a, b) : m)}</p>`;
    }).join('');
  };
})(window.SB);
