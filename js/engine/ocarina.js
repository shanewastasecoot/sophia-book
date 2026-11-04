/* The playable ocarina puzzle. A page with `ocarina: { tune: ['pink', 'blue', ...] }` shows one big
   shell button per note and a row of dots for the tune. Play it right and the page celebrates;
   a wrong note just wobbles and starts the tune over (no failing, no stuck readers). */
(function (SB) {
  const COLORS = { pink: '#ff7ac1', blue: '#5fc8ff', gold: '#ffd34d' };
  const shell = c => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 86L16 64Q10 24 50 14Q90 24 84 64Z" fill="${c}" stroke="#3a1d4f" stroke-width="4" stroke-linejoin="round"/><path d="M50 86L30 24M50 86V16M50 86L70 24" stroke="#3a1d4f" stroke-width="3" opacity=".45" stroke-linecap="round"/></svg>`;

  function render(cfg) {
    const notes = [...new Set(cfg.tune)];
    return `<div class="ocarina" data-tune="${cfg.tune.join(' ')}" data-pos="0">
      <ol class="tune" aria-label="The tune">${cfg.tune.map(n => `<li class="tune-dot" style="--c:${COLORS[n]}"><span class="sr-only">${n}</span></li>`).join('')}</ol>
      <div class="note-row">${notes.map(n => `<button type="button" class="note-btn" data-note="${n}" style="--c:${COLORS[n]}" aria-label="Play the ${n} note">${shell(COLORS[n])}</button>`).join('')}</div>
      <p class="ocarina-msg" aria-live="polite">Your turn! Tap the shells to play the Gate Song.</p>
    </div>`;
  }

  function play(btn) {
    const box = btn.closest('.ocarina');
    if (box.classList.contains('solved')) { SB.audio.play('ocarina-' + btn.dataset.note); return; }
    const tune = box.dataset.tune.split(' '), pos = +box.dataset.pos, note = btn.dataset.note;
    const dots = box.querySelectorAll('.tune-dot'), msg = box.querySelector('.ocarina-msg');
    SB.audio.play('ocarina-' + note);
    btn.classList.remove('hit'); void btn.offsetWidth; btn.classList.add('hit');
    if (note === tune[pos]) {
      dots[pos].classList.add('done');
      box.dataset.pos = pos + 1;
      msg.textContent = pos + 1 < tune.length ? 'Yes! Keep going!' : 'You did it! The gates are opening!';
      if (pos + 1 === tune.length) {
        box.classList.add('solved');
        setTimeout(() => SB.audio.play('gate-open'), 350);
        document.dispatchEvent(new CustomEvent('sb:solved'));
      }
    } else {
      box.dataset.pos = 0;
      dots.forEach(d => d.classList.remove('done'));
      box.classList.remove('oops'); void box.offsetWidth; box.classList.add('oops');
      msg.textContent = 'Oopsie! Start again from the first shell.';
    }
  }

  document.addEventListener('click', e => { const b = e.target.closest?.('.note-btn'); if (b) play(b); });
  SB.ocarina = { render };
})(window.SB);
