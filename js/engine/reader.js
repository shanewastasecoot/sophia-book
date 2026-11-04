/* The reader: shows one page "sheet" at a time (art layers + read-aloud copy), turns pages with
   arrows / swipes / keys, runs the Pages menu, and keeps nearby pages' art ready ahead of time.
   It knows nothing about any particular book; everything comes from SB.books. */
(function (SB) {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 150));

  const el = {};
  const state = { book: null, i: -1, tocBook: null };

  /* ---------- Art cache: a page's SVG is generated the first time it's needed, then reused ---------- */
  const cache = new Map();
  function artSVG(book, i) {
    const key = book.id + '/' + i;
    if (!cache.has(key)) {
      const page = book.pages[i];
      cache.set(key, `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${page.art ? page.art() : ''}</svg>`);
    }
    return cache.get(key);
  }
  const preloaded = new Set();
  function preloadImages(page) {
    for (const im of page.images || []) {
      if (preloaded.has(im.src)) continue;
      preloaded.add(im.src);
      const link = document.createElement('link');
      link.rel = 'prefetch'; link.as = 'image'; link.href = im.src;
      document.head.appendChild(link);
    }
  }
  // Warm the pages a reader is most likely to open next, when the browser is idle.
  function prefetchAround(book, i) {
    for (const j of [i + 1, i - 1, i + 2]) {
      if (j < 0 || j >= book.pages.length) continue;
      idle(() => { artSVG(book, j); preloadImages(book.pages[j]); });
    }
  }

  /* ---------- Sheets ---------- */
  function buildSheet(book, i) {
    const page = book.pages[i];
    const sheet = document.createElement('article');
    sheet.className = 'sheet';
    sheet.dataset.page = i;
    const imgs = (page.images || []).map(im => `<img class="layer" src="${esc(im.src)}" alt="${esc(im.alt || '')}" loading="lazy" decoding="async">`).join('');
    sheet.innerHTML = `
      <div class="media">
        <div class="layer layer-art" role="img" aria-label="${esc(page.alt || '')}">${artSVG(book, i)}</div>
        ${imgs}
        <canvas class="layer layer-fx" aria-hidden="true"></canvas>
        ${SB.items.pickupLayer(page)}
      </div>
      <div class="copy">${page.chapter ? SB.art.ui.chapter(page.chapter.n, page.chapter.title) : ''}${page.text || ''}${page.ocarina ? SB.ocarina.render(page.ocarina) : ''}</div>`;
    return sheet;
  }
  const currentSheet = () => el.viewport.querySelector('.sheet.current');

  function show(i, dir = 0) {
    const book = state.book;
    if (i < 0 || i >= book.pages.length) return false;
    const old = currentSheet();
    if (old && i === state.i) return false;
    state.i = i;
    const page = book.pages[i];

    SB.applyTheme(page.theme || book.theme);
    // Fast taps: drop any page still mid-turn so only one page is ever leaving.
    el.viewport.querySelectorAll('.sheet:not(.current)').forEach(s => s.remove());
    const sheet = buildSheet(book, i);
    sheet.classList.add('current');
    el.viewport.appendChild(sheet);

    if (old) {
      old.classList.remove('current', 'in', 'settle');
      old.setAttribute('aria-hidden', 'true');
      old.inert = true;
      if (dir && !SB.prefersReducedMotion()) {
        old.classList.add(dir > 0 ? 'out-next' : 'out-prev');
        sheet.classList.add('in');
        const drop = () => old.remove();
        old.addEventListener('animationend', drop, { once: true });
        setTimeout(drop, 800);
      } else {
        old.remove();
      }
    }

    SB.fx.start(sheet.querySelector('.layer-fx'), page.fx);
    SB.backdrop.setPage(i);
    el.next.classList.remove('nudge');
    updateChrome();
    prefetchAround(book, i);
    history.replaceState(null, '', `#${book.id}/${page.id || i}`);
    return true;
  }
  const go = d => show(state.i + d, d);

  function updateChrome() {
    const { book, i } = state, n = book.pages.length, page = book.pages[i];
    el.title.textContent = book.short || book.title;
    document.title = book.title;
    el.prev.disabled = i === 0;
    el.next.disabled = i === n - 1;
    el.fill.style.width = `${(i / (n - 1 || 1)) * 100}%`;
    el.label.textContent = i === 0 ? 'Cover' : `Page ${i} of ${n - 1}`;
    el.live.textContent = `${page.title || ''}. ${el.label.textContent}`;
    el.progress.setAttribute('aria-valuenow', i);
    el.progress.setAttribute('aria-valuemax', n - 1);
  }

  function openBook(id, page = 0) {
    const book = SB.getBook(id) || SB.books[0];
    if (state.book !== book) { state.book = book; state.i = -1; el.viewport.querySelectorAll('.sheet').forEach(s => s.remove()); SB.items.setBook(book); }
    const i = typeof page === 'number' ? page : Math.max(0, book.pages.findIndex(p => p.id === page));
    show(i, 0) || updateChrome();
  }

  /* ---------- Swipe: the page follows your finger, then turns or springs back ---------- */
  function initGestures() {
    let start = null, dragging = false;
    const reset = sheet => {
      if (!sheet) return;
      sheet.classList.add('settle'); sheet.style.transform = '';
      setTimeout(() => sheet.classList.remove('settle'), 260);
    };
    el.viewport.addEventListener('pointerdown', e => {
      if (e.button > 0 || e.target.closest('button, a, input, .pickup')) { start = null; return; }
      start = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
      dragging = false;
    });
    el.viewport.addEventListener('pointermove', e => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!dragging && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        dragging = true;
        try { el.viewport.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (dragging) {
        const atEdge = (dx > 0 && state.i === 0) || (dx < 0 && state.i === state.book.pages.length - 1);
        const s = currentSheet();
        if (s) s.style.transform = `translateX(${dx * (atEdge ? .2 : .65)}px) rotate(${dx * .008}deg)`;
      }
    });
    el.viewport.addEventListener('pointerup', e => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x, dt = performance.now() - start.t, s = currentSheet();
      if (dragging) {
        const flick = Math.abs(dx) / dt > .5 && Math.abs(dx) > 30;
        if (!((Math.abs(dx) > 70 || flick) && go(dx < 0 ? 1 : -1))) reset(s);
      } else if (e.target.closest('.media')) {
        sparkle(e);
      }
      start = null; dragging = false;
    });
    el.viewport.addEventListener('pointercancel', () => { if (dragging) reset(currentSheet()); start = null; dragging = false; });
  }

  // Tap the picture: a star pops where you tapped.
  function sparkle(e) {
    const svg = currentSheet()?.querySelector('.layer-art svg');
    if (!svg?.getScreenCTM) return;
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const q = pt.matrixTransform(svg.getScreenCTM().inverse());
    const colors = ['#ffc83d', '#ff4fa3', '#5ff2ff', '#b06cff', '#7dfcd9', '#fff'];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = SB.art.star4(Math.round(q.x), Math.round(q.y), 22, colors[Math.floor(Math.random() * colors.length)], 'burst');
    svg.appendChild(g); setTimeout(() => g.remove(), 750);
    SB.audio.chime();
  }

  /* ---------- Pages menu (bottom sheet on phones, side drawer on wide screens) ---------- */
  let thumbObserver = null;
  function renderToc() {
    const book = state.tocBook;
    el.tocBooks.hidden = SB.books.length < 2;
    el.tocBooks.innerHTML = SB.books.map(b =>
      `<button type="button" class="toc-book" role="tab" data-book="${esc(b.id)}" aria-selected="${b === book}">${esc(b.short || b.title)}</button>`).join('');
    el.tocList.innerHTML = book.pages.map((p, i) => {
      const cur = book === state.book && i === state.i;
      return `<li><button type="button" class="toc-item" data-book="${esc(book.id)}" data-i="${i}" ${cur ? 'aria-current="page"' : ''}>
        <span class="thumb" data-book="${esc(book.id)}" data-i="${i}"></span>
        <span class="toc-label">${i === 0 ? '' : `<b>${i}.</b> `}${esc(p.title || `Page ${i}`)}</span></button></li>`;
    }).join('');
    // Thumbnails are drawn only when they scroll into view.
    thumbObserver?.disconnect();
    const fill = t => { t.innerHTML = artSVG(SB.getBook(t.dataset.book), +t.dataset.i); t.classList.add('ready'); };
    if ('IntersectionObserver' in window) {
      thumbObserver = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { fill(en.target); thumbObserver.unobserve(en.target); }
      }), { root: el.tocList, rootMargin: '120px' });
      el.tocList.querySelectorAll('.thumb').forEach(t => thumbObserver.observe(t));
    } else {
      el.tocList.querySelectorAll('.thumb').forEach(fill);
    }
  }
  function openToc() {
    state.tocBook = state.book;
    renderToc();
    el.toc.hidden = false; el.scrim.hidden = false;
    void el.toc.offsetWidth; // apply the closed position first so the slide-in animates
    el.toc.classList.add('open'); el.scrim.classList.add('open');
    el.tocBtn.setAttribute('aria-expanded', 'true');
    el.app.inert = true;
    const cur = el.tocList.querySelector('[aria-current="page"]');
    cur?.scrollIntoView({ block: 'center' });
    (cur || el.tocClose).focus({ preventScroll: true });
  }
  function closeToc() {
    if (el.toc.hidden) return;
    el.toc.classList.remove('open'); el.scrim.classList.remove('open');
    el.tocBtn.setAttribute('aria-expanded', 'false');
    el.app.inert = false;
    setTimeout(() => { el.toc.hidden = true; el.scrim.hidden = true; }, SB.prefersReducedMotion() ? 0 : 280);
    el.tocBtn.focus({ preventScroll: true });
  }

  /* ---------- Wiring ---------- */
  function updateSoundBtn() {
    el.soundBtn.setAttribute('aria-pressed', String(!SB.audio.muted));
    el.soundBtn.setAttribute('aria-label', SB.audio.muted ? 'Sound is off. Turn sound on' : 'Sound is on. Turn sound off');
    el.soundBtn.classList.toggle('muted', SB.audio.muted);
  }

  function routeFromHash() {
    const [bookId, page] = decodeURIComponent(location.hash.slice(1)).split('/');
    const book = SB.getBook(bookId);
    if (!book) return openBook(SB.books[0].id, 0);
    const n = Number(page);
    openBook(book.id, Number.isInteger(n) && page !== '' ? n : (page || 0));
  }

  function boot() {
    ['app', 'viewport', 'prev', 'next', 'fill', 'label', 'live', 'progress', 'title', 'tocBtn', 'soundBtn', 'toc', 'tocList', 'tocBooks', 'tocClose', 'scrim']
      .forEach(id => el[id] = $(id));
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    defs.setAttribute('class', 'shared-defs'); defs.setAttribute('aria-hidden', 'true');
    defs.innerHTML = `<defs>${SB.art.defs}</defs>`;
    document.body.prepend(defs);

    el.prev.addEventListener('click', () => go(-1));
    el.next.addEventListener('click', () => go(1));
    el.tocBtn.addEventListener('click', openToc);
    el.tocClose.addEventListener('click', closeToc);
    el.scrim.addEventListener('click', closeToc);
    el.soundBtn.addEventListener('click', () => { SB.audio.setMuted(!SB.audio.muted); updateSoundBtn(); });
    el.tocBooks.addEventListener('click', e => {
      const b = e.target.closest('.toc-book'); if (!b) return;
      state.tocBook = SB.getBook(b.dataset.book); renderToc();
    });
    el.tocList.addEventListener('click', e => {
      const b = e.target.closest('.toc-item'); if (!b) return;
      const sameBook = state.book.id === b.dataset.book, i = +b.dataset.i;
      closeToc();
      if (sameBook) show(i, Math.sign(i - state.i)); else openBook(b.dataset.book, i);
    });
    document.addEventListener('click', e => {
      const s = e.target.closest('.sfx');
      if (s) { SB.audio.play(s.dataset.snd); s.classList.remove('go'); void s.offsetWidth; s.classList.add('go'); return; }
      const a = e.target.closest('[data-action]');
      if (a?.dataset.action === 'restart') show(0, -1);
      if (a?.dataset.action === 'open-book') openBook(a.dataset.book, 0);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') return closeToc();
      if (!el.toc.hidden || SB.items.isOpen() || e.target.closest('input, textarea, .pickup')) return;
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Home') show(0, -1);
      else if (e.key === 'End') show(state.book.pages.length - 1, 1);
    });
    window.addEventListener('hashchange', () => {
      const want = `#${state.book.id}/${state.book.pages[state.i].id || state.i}`;
      if (location.hash !== want) routeFromHash();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) SB.fx.stop();
      else { const s = currentSheet(); if (s) SB.fx.start(s.querySelector('.layer-fx'), state.book.pages[state.i].fx); }
    });

    SB.items.init();
    initGestures();
    updateSoundBtn();
    routeFromHash();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.SB);
