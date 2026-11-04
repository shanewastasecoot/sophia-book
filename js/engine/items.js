/* Treasure bag: tap-to-collect pickups in the pictures, a "You found…" toast, the item flying
   into the bag, and the bag panel. A book opts in with `items: [{ id, name, desc, icon }]`
   and pages place them with `pickup: { item, x, y, size }`. Collected items are remembered per book. */
(function (SB) {
  const el = {};
  let book = null;

  const key = () => 'sb-items-' + book.id;
  const owned = () => new Set(book ? SB.store.get(key(), []) : []);
  const def = id => book?.items?.find(it => it.id === id);
  const iconSVG = (it, cls = '') => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${it.icon()}</svg>`;

  function updateBadge(bump) {
    const total = book?.items?.length || 0, n = total ? owned().size : 0;
    el.btn.hidden = !total;
    el.count.textContent = n;
    el.count.hidden = n === 0;
    el.btn.setAttribute('aria-label', `Treasure bag: ${n} of ${total} found`);
    if (bump) { el.btn.classList.remove('bump'); void el.btn.offsetWidth; el.btn.classList.add('bump'); }
  }

  /* A layer over the picture holding the item to tap. Same 800 x 500 box as the art, so x/y line up. */
  function pickupLayer(page) {
    const p = page.pickup, it = p && def(p.item);
    if (!it || owned().has(it.id)) return '';
    const size = p.size || 80;
    return `<div class="layer layer-pickup"><svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <g class="pickup" data-pickup="${it.id}" role="button" tabindex="0" aria-label="Pick up the ${it.name}" transform="translate(${p.x} ${p.y})">
        <circle class="pickup-ring" r="${size * .62}"/>
        <g class="pickup-bob"><g class="pickup-icon" transform="translate(${-size / 2} ${-size / 2}) scale(${size / 100})">${it.icon()}</g></g>
      </g></svg></div>`;
  }

  function collect(target) {
    const it = def(target.dataset.pickup);
    if (!it) return;
    const set = owned();
    if (set.has(it.id)) return;
    set.add(it.id);
    SB.store.set(key(), [...set]);
    SB.audio.play('pickup');
    fly(target.querySelector('.pickup-icon'), it);
    target.classList.add('taken');
    setTimeout(() => target.closest('.layer-pickup')?.remove(), 450);
    toast(it);
  }

  // The item arcs up and into the bag button, then the bag bumps.
  function fly(src, it) {
    const from = src?.getBoundingClientRect(), to = el.btn.getBoundingClientRect();
    if (!from?.width || SB.prefersReducedMotion() || !Element.prototype.animate) return updateBadge(true);
    const f = document.createElement('div');
    f.className = 'fly';
    f.style.cssText = `left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px`;
    f.innerHTML = iconSVG(it);
    document.body.appendChild(f);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2), dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const a = f.animate([
      { transform: 'translate(0, 0) scale(1)' },
      { transform: `translate(${dx * .35}px, ${dy * .35 - 90}px) scale(1.3) rotate(-12deg)`, offset: .4 },
      { transform: `translate(${dx}px, ${dy}px) scale(.25) rotate(20deg)`, opacity: .4 },
    ], { duration: 850, easing: 'cubic-bezier(.45, 0, .3, 1)' });
    a.onfinish = () => { f.remove(); updateBadge(true); };
  }

  function toast(it) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `${iconSVG(it, 'toast-icon')}<div><p class="toast-kicker">You found</p><p class="toast-name">${it.name}!</p></div>`;
    el.toasts.appendChild(t);
    setTimeout(() => t.classList.add('leaving'), 2600);
    setTimeout(() => t.remove(), 3100);
  }

  /* ---------- Bag panel ---------- */
  function render() {
    const have = owned();
    el.grid.innerHTML = book.items.map(it => {
      const got = have.has(it.id);
      return `<li class="slot ${got ? 'got' : 'empty'}">${iconSVG(it, 'slot-icon')}
        <p class="slot-name">${got ? it.name : '???'}</p><p class="slot-desc">${got ? it.desc : 'Not found yet. Keep reading!'}</p></li>`;
    }).join('');
    el.sub.textContent = `${have.size} of ${book.items.length} treasures found`;
  }
  function open() {
    render();
    el.panel.hidden = false; el.scrim.hidden = false;
    void el.panel.offsetWidth; // apply the closed position first so the pop-in animates
    el.panel.classList.add('open'); el.scrim.classList.add('open');
    document.getElementById('app').inert = true;
    el.close.focus({ preventScroll: true });
  }
  function close() {
    if (el.panel.hidden) return;
    el.panel.classList.remove('open'); el.scrim.classList.remove('open');
    document.getElementById('app').inert = false;
    setTimeout(() => { el.panel.hidden = true; el.scrim.hidden = true; }, SB.prefersReducedMotion() ? 0 : 260);
    el.btn.focus({ preventScroll: true });
  }

  function init() {
    Object.assign(el, {
      btn: document.getElementById('bagBtn'), count: document.getElementById('bagCount'),
      panel: document.getElementById('bag'), scrim: document.getElementById('bagScrim'), grid: document.getElementById('bagGrid'),
      sub: document.getElementById('bagSub'), close: document.getElementById('bagClose'), toasts: document.getElementById('toasts'),
    });
    el.btn.addEventListener('click', open);
    el.close.addEventListener('click', close);
    el.scrim.addEventListener('click', close);
    document.addEventListener('click', e => { const p = e.target.closest?.('[data-pickup]'); if (p) collect(p); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      const p = e.target.closest?.('[data-pickup]');
      if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); collect(p); }
    });
  }

  SB.items = {
    init, pickupLayer,
    setBook(b) { book = b; updateBadge(false); },
    isOpen: () => el.panel && !el.panel.hidden,
  };
})(window.SB);
