/* The reader: shows one page "sheet" at a time (art layers + read-aloud copy), turns pages with
   arrows / swipes / keys, runs the Pages menu, and keeps nearby pages' art ready ahead of time.
   It knows nothing about any particular book; everything comes from SB.books. */
(function (SB) {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 150));
  const TURN_MS = 520; // keep in step with --turn in css/reader.css

  const el = {};
  const state = { book: null, i: -1, tocBook: null };

  /* ---------- Art cache: a page's SVG is generated the first time it's needed, then reused.
     The hand-inked wobble is baked into the shapes here (js/engine/sketch.js), once per page,
     unless the page or book sets sketch: false. ---------- */
  const cache = new Map();
  const sketchy = (book, page) => (page.sketch ?? book.sketch ?? true) && !document.documentElement.classList.contains('no-sketch');
  function artBody(book, i) {
    const key = book.id + '/' + i;
    if (!cache.has(key)) {
      const page = book.pages[i];
      let body = page.art ? page.art() : '';
      if (body && sketchy(book, page)) body = SB.sketch.apply(body);
      cache.set(key, body);
    }
    return cache.get(key);
  }
  const artSVG = (book, i) => {
    const body = artBody(book, i);
    return body && `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${body}</svg>`;
  };

  /* ---------- Snapshots: each scene as a ready-made bitmap (js/engine/raster.js) ----------
     Waiting and turning pages show the bitmap, which phones can move instantly. Once a page has
     settled, the live animated SVG is put in underneath and the bitmap fades away. */
  const bitmaps = new Map();
  function snapSize() {
    const m = currentSheet()?.querySelector('.media') || el.viewport;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // the picture box is 8:5 on most screens but taller on portrait phones
    const w = Math.round(m.clientWidth * dpr), h = Math.round((m.clientHeight ? m.clientHeight * dpr : w / 1.6));
    return w > 0 ? { w, h } : null;
  }
  async function ensureSnapshot(book, i) {
    const size = snapSize(), body = artBody(book, i);
    if (!size || !body || !SB.raster) return null;
    const key = `${book.id}/${i}@${size.w}x${size.h}`;
    if (bitmaps.has(key)) return bitmaps.get(key);
    const bmp = await SB.raster.snapshot(`${book.id}/${i}`, body, size.w, size.h);
    if (bmp) { bitmaps.set(key, bmp); while (bitmaps.size > 8) bitmaps.delete(bitmaps.keys().next().value); }
    return bmp;
  }
  function readySnapshot(book, i) {
    const size = snapSize();
    return size && bitmaps.get(`${book.id}/${i}@${size.w}x${size.h}`);
  }
  function showSnapshot(sheet, bmp) {
    if (sheet.dataset.mode === 'picture') return true;   // a painting is already a plain image
    const c = sheet.querySelector('.layer-snap');
    if (!c || !bmp) return false;
    if (!sheet.dataset.snapped) {
      try {
        c.width = bmp.width; c.height = bmp.height;
        c.getContext('2d').drawImage(bmp, 0, 0);
      } catch (e) {            // bitmap no longer usable: stay with the live scene
        for (const [k, v] of bitmaps) if (v === bmp) bitmaps.delete(k);
        return false;
      }
      sheet.dataset.snapped = '1';
    }
    sheet.dataset.mode = 'snap';
    sheet.querySelector('.layer-art').replaceChildren();   // drop the live SVG: nothing left to repaint
    return true;
  }
  function goLive(sheet, book, i) {
    if (sheet.dataset.mode === 'live' || sheet.dataset.mode === 'picture') return;
    const art = sheet.querySelector('.layer-art');
    if (!art.firstChild) art.innerHTML = artSVG(book, i);
    if (sheet.dataset.mode !== 'snap') { sheet.dataset.mode = 'live'; return; }
    // let the live scene paint underneath for a moment, then fade the bitmap away
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
      if (sheet.classList.contains('current')) sheet.dataset.mode = 'live';
    }, 120)));
  }

  /* ---------- Painted pictures ----------
     Drop a painting at img/<book id>/<page id>.png (or .webp / .jpg) and that page shows it instead of
     the drawn scene. Pages without one keep their drawing, so paintings can be added a few at a time. */
  const pictureNow = new Map(), pictureLookups = new Map();
  function findPicture(book, i) {
    const page = book.pages[i], key = book.id + '/' + i;
    if (page.illustration?.src) return Promise.resolve(null);   // the page names its own picture
    if (!pictureLookups.has(key)) {
      pictureLookups.set(key, (async () => {
        for (const ext of ['png', 'webp', 'jpg']) {
          const src = `img/${book.id}/${page.id}.${ext}`;
          // wait for load, not decode(): decode() can wait forever while the tab is in the background
          try {
            await new Promise((ok, no) => { const im = new Image(); im.onload = ok; im.onerror = no; im.src = src; });
            pictureNow.set(key, src); return src;
          } catch (e) { /* not there */ }
        }
        pictureNow.set(key, null);
        return null;
      })());
    }
    return pictureLookups.get(key);
  }
  const knownPicture = (book, i) => pictureNow.get(book.id + '/' + i);

  // A page that was showing its drawing when its painting turned up: fade the painting in over it.
  function usePicture(sheet, src) {
    if (sheet.dataset.mode === 'picture') return;
    const media = sheet.querySelector('.media');
    media.insertAdjacentHTML('afterbegin', illustrationHTML({ illustration: { src } }, true).replace('layer-illustration', 'layer-illustration arriving'));
    sheet.dataset.mode = 'picture';
    setTimeout(() => { sheet.querySelector('.layer-art')?.replaceChildren(); }, 450);
  }

  /* Full-frame illustration (PNG / WebP / SVG file) for a page, as a <picture> with a WebP source. */
  function illustrationHTML(page, eager) {
    const il = page.illustration;
    if (!il?.src) return '';
    const style = `object-fit:${il.fit || 'cover'};object-position:${il.focus || '50% 50%'}`;
    return `<picture class="layer layer-illustration">
      ${il.webp ? `<source type="image/webp" srcset="${esc(il.webp)}">` : ''}
      <img src="${esc(il.src)}" alt="" style="${style}" ${il.width ? `width="${il.width}" height="${il.height}"` : ''}
        loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''}></picture>`;
  }
  const frameOf = (book, page) => page.illustration?.frame || page.frame || book.frame || 'vignette';

  const preloaded = new Set();
  function preloadImages(page) {
    const srcs = (page.images || []).map(im => im.src);
    if (page.illustration) srcs.push(page.illustration.webp || page.illustration.src);
    for (const src of srcs) {
      if (!src || preloaded.has(src)) continue;
      preloaded.add(src);
      const link = document.createElement('link');
      link.rel = 'prefetch'; link.as = 'image'; link.href = src;
      document.head.appendChild(link);
    }
  }
  // Warm the pages a reader is most likely to open next, when the browser is idle: draw their art,
  // snapshot it, fetch their pictures, and lay the next/previous pages (as bitmaps, animations paused)
  // under the current one. A tap then only has to reveal a finished page.
  const ready = new Map();
  function prefetchAround(book, i) {
    idle(() => ensureSnapshot(book, i));   // the current page too, so it can turn away as a bitmap
    for (const j of [i + 1, i - 1, i + 2]) {
      if (j < 0 || j >= book.pages.length) continue;
      idle(async () => {
        artBody(book, j); preloadImages(book.pages[j]);
        const key = book.id + '/' + j;
        if (Math.abs(j - state.i) !== 1 || state.book !== book || ready.has(key)) return;
        const bmp = (await findPicture(book, j)) ? null : await ensureSnapshot(book, j);
        if (Math.abs(j - state.i) !== 1 || state.book !== book || ready.has(key)) return;
        const s = buildSheet(book, j, bmp);
        s.classList.add('waiting'); s.inert = true; s.setAttribute('aria-hidden', 'true');
        s.dataset.side = j > state.i ? 'next' : 'prev';
        el.viewport.prepend(s);
        ready.set(key, s);
      });
    }
  }
  function takeSheet(book, i) {
    const key = book.id + '/' + i, s = ready.get(key);
    if (!s) return buildSheet(book, i);
    ready.delete(key);
    s.classList.remove('waiting'); s.inert = false; s.removeAttribute('aria-hidden');
    return s;
  }
  // Drop waiting pages that are no longer next to the current one.
  function pruneWaiting(book, i) {
    for (const [key, s] of ready) {
      const [b, j] = key.split('/');
      if (b !== book.id || Math.abs(+j - i) !== 1) { s.remove(); ready.delete(key); }
      else s.dataset.side = +j > i ? 'next' : 'prev';
    }
  }

  /* ---------- Sheets ---------- */
  function buildSheet(book, i, bmp = readySnapshot(book, i)) {
    const page = book.pages[i];
    const sheet = document.createElement('article');
    sheet.className = 'sheet';
    sheet.dataset.page = i;
    sheet.style.setProperty('--seed', i % 7); // shifts the watercolor wash so each page's paper differs
    const imgs = (page.images || []).map(im => `<img class="layer" src="${esc(im.src)}" alt="${esc(im.alt || '')}" loading="lazy" decoding="async">`).join('');
    const painted = knownPicture(book, i);
    sheet.innerHTML = `
      <div class="media frame-${esc(frameOf(book, page))}" role="img" aria-label="${esc(page.alt || page.illustration?.alt || '')}">
        ${illustrationHTML(painted ? { illustration: { src: painted } } : page, true)}
        <div class="layer layer-art"></div>
        <canvas class="layer layer-snap" aria-hidden="true"></canvas>
        ${imgs}
        <canvas class="layer layer-fx" aria-hidden="true"></canvas>
        ${SB.items.pickupLayer(page)}
      </div>
      <button class="zoom-btn" type="button" aria-label="Make the picture bigger"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <span class="ink-frame" aria-hidden="true"></span>
      <div class="copy">${page.chapter ? SB.art.ui.chapter(page.chapter.n, page.chapter.title) : ''}${page.text || ''}${page.ocarina ? SB.ocarina.render(page.ocarina) : ''}</div>`;
    if (painted) sheet.dataset.mode = 'picture';
    else if (!showSnapshot(sheet, bmp)) goLive(sheet, book, i);   // no bitmap yet: draw the live scene right away
    return sheet;
  }
  const currentSheet = () => el.viewport.querySelector('.sheet.current');

  /* ---------- Quest checkpoints: a page with a treasure to find or a tune to play must be finished
     before reading past it (arrows, swipes, the Pages menu and links all stop there). On by default
     for books with treasures; a book can turn it off with gated: false. ---------- */
  const solvedKey = book => 'sb-solved-' + book.id;
  const gated = book => book.gated ?? !!book.items?.length;
  function pageDone(book, i) {
    const p = book.pages[i];
    if (p.pickup && !SB.items.has(book, p.pickup.item)) return false;
    if (p.ocarina && !SB.store.get(solvedKey(book), []).includes(p.id || i)) return false;
    return true;
  }
  // the furthest page that can be reached right now
  function furthest(book) {
    if (gated(book)) for (let i = 0; i < book.pages.length; i++) if (!pageDone(book, i)) return i;
    return book.pages.length - 1;
  }
  // Tried to read on too soon: say what's missing and wiggle it.
  function remind() {
    const page = state.book.pages[state.i], s = currentSheet();
    if (page.pickup) {
      const it = SB.items.def(page.pickup.item);
      SB.items.hint(`Find the ${it?.name || 'treasure'} first!`, page.pickup.item);
      const ring = s?.querySelector('.pickup');
      ring?.classList.remove('look'); void ring?.getBoundingClientRect(); ring?.classList.add('look');
    } else if (page.ocarina) {
      SB.items.hint('Play the Gate Song to open the gates!');
      const box = s?.querySelector('.ocarina');
      box?.classList.remove('oops'); void box?.offsetWidth; box?.classList.add('oops');
      box?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    SB.audio.play('boing');
  }

  function show(i, dir = 0) {
    const book = state.book;
    if (i < 0 || i >= book.pages.length) return false;
    const max = furthest(book);
    if (i > max) {
      if (state.i === max) { remind(); return false; }
      i = max; // a menu tap or link past a checkpoint lands on the checkpoint instead
      if (i === state.i) return false;
    }
    const old = currentSheet();
    if (old && i === state.i) return false;
    state.i = i;
    const page = book.pages[i];

    SB.applyTheme(page.theme || book.theme);
    // Fast taps: drop any page still mid-turn so only one page is ever leaving.
    el.viewport.querySelectorAll('.sheet.out-next, .sheet.out-prev').forEach(s => s.remove());
    const sheet = takeSheet(book, i);
    sheet.classList.add('current');
    if (!sheet.isConnected) el.viewport.appendChild(sheet);
    pruneWaiting(book, i);
    findPicture(book, i).then(src => { if (src && sheet.classList.contains('current')) usePicture(sheet, src); });
    const turning = !!(old && dir && !SB.prefersReducedMotion());

    if (old) {
      old.classList.remove('current', 'in', 'settle');
      old.setAttribute('aria-hidden', 'true');
      old.inert = true;
      if (turning) {
        showSnapshot(old, readySnapshot(book, +old.dataset.page));   // turn away as a bitmap, not a live scene
        old.classList.add(dir > 0 ? 'out-next' : 'out-prev');
        sheet.classList.add('in');
        // Once it has turned away, the old page is exactly the "previous page": keep it waiting underneath.
        const oldKey = book.id + '/' + old.dataset.page;
        const drop = () => {
          if (!old.isConnected || !old.classList.contains(dir > 0 ? 'out-next' : 'out-prev')) return;
          if (state.book === book && Math.abs(+old.dataset.page - state.i) === 1 && !ready.has(oldKey)) {
            old.className = 'sheet waiting'; old.style.transform = '';
            old.dataset.side = +old.dataset.page > state.i ? 'next' : 'prev';
            ready.set(oldKey, old);
          } else old.remove();
        };
        old.addEventListener('animationend', e => { if (e.target === old) drop(); });
        setTimeout(drop, 800);
      } else {
        old.remove();
      }
    }

    // While the page turns, give it the whole frame budget: hold the canvases, start them after.
    const canvas = sheet.querySelector('.layer-fx');
    if (turning) {
      SB.fx.stop();
      SB.backdrop.hold(TURN_MS);
      clearTimeout(show.fxTimer);
      show.fxTimer = setTimeout(() => {
        if (!sheet.isConnected || !sheet.classList.contains('current')) return;
        SB.fx.start(canvas, page.fx);
        goLive(sheet, book, i);
      }, TURN_MS);
    } else {
      SB.fx.start(canvas, page.fx);
      goLive(sheet, book, i);
    }
    SB.backdrop.setPage(i);
    el.next.classList.remove('nudge');
    updateChrome();
    // Prepare the neighbours only after the turn has finished, so building them never steals turn frames.
    clearTimeout(show.prefetchTimer);
    show.prefetchTimer = setTimeout(() => { if (state.book === book && state.i === i) prefetchAround(book, i); }, turning ? TURN_MS + 80 : 0);
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
    // waiting on a treasure or the tune: the arrow looks sleepy but still answers with a reminder
    const locked = i < n - 1 && i >= furthest(book);
    el.next.classList.toggle('locked', locked);
    if (locked) el.next.classList.remove('nudge');
    el.fill.style.width = `${(i / (n - 1 || 1)) * 100}%`;
    el.label.textContent = i === 0 ? 'Cover' : `Page ${i} of ${n - 1}`;
    el.live.textContent = `${page.title || ''}. ${el.label.textContent}`;
    el.progress.setAttribute('aria-valuenow', i);
    el.progress.setAttribute('aria-valuemax', n - 1);
  }

  function openBook(id, page = 0) {
    const book = SB.getBook(id) || SB.books[0];
    if (state.book !== book) { state.book = book; state.i = -1; ready.clear(); el.viewport.querySelectorAll('.sheet').forEach(s => s.remove()); SB.items.setBook(book); }
    const i = typeof page === 'number' ? page : Math.max(0, book.pages.findIndex(p => p.id === page));
    show(i, 0) || updateChrome();
  }

  // "Read it again!": back to the cover with an empty treasure bag. Pages built ahead of time were made
  // without the treasures already collected, so drop them and let them be rebuilt.
  function restart() {
    SB.items.reset();
    SB.store.set(solvedKey(state.book), []);
    for (const s of ready.values()) s.remove();
    ready.clear();
    show(0, -1);
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
        el.viewport.dataset.peek = dx < 0 ? 'next' : 'prev';
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
        // a painted picture opens big; a drawn scene gets a sparkle where you tapped
        if (currentSheet()?.dataset.mode === 'picture') openZoom(); else sparkle(e);
      }
      start = null; dragging = false; delete el.viewport.dataset.peek;
    });
    el.viewport.addEventListener('pointercancel', () => { if (dragging) reset(currentSheet()); start = null; dragging = false; delete el.viewport.dataset.peek; });
    el.viewport.addEventListener('click', e => { if (e.target.closest('.zoom-btn')) openZoom(); });
    // stop the browser from starting an image drag (desktop) or a long-press menu, which would swallow the swipe
    el.viewport.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------- Big picture: the current page's picture, full screen. Swipe to turn pages, tap to close. ---------- */
  const zoom = {};
  function fillZoom() {
    const s = currentSheet(); if (!s || !zoom.el) return;
    const img = s.querySelector('.layer-illustration img');
    const svg = !img && artSVG(state.book, state.i);
    zoom.stage.innerHTML = img ? `<img src="${esc(img.currentSrc || img.src)}" alt="">`
      : svg ? svg.replace('xMidYMid slice', 'xMidYMid meet') : '';
  }
  function openZoom() {
    if (!zoom.el) {
      zoom.el = document.createElement('div');
      zoom.el.className = 'zoom'; zoom.el.hidden = true;
      zoom.el.setAttribute('role', 'dialog'); zoom.el.setAttribute('aria-label', 'Big picture');
      zoom.el.innerHTML = `<div class="zoom-stage"></div>
        <button class="icon-btn zoom-close" type="button" aria-label="Close the big picture"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg></button>
        <p class="zoom-hint">Turn the phone sideways for an even bigger picture</p>`;
      zoom.stage = zoom.el.querySelector('.zoom-stage');
      document.body.appendChild(zoom.el);
      let start = null;
      zoom.el.addEventListener('pointerdown', e => { start = { x: e.clientX, y: e.clientY }; });
      zoom.el.addEventListener('pointerup', e => {
        if (!start) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y; start = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) zoomTurn(dx < 0 ? 1 : -1);
        else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) closeZoom();
      });
      zoom.el.addEventListener('pointercancel', () => { start = null; });
      zoom.el.addEventListener('dragstart', e => e.preventDefault());
    }
    fillZoom();
    zoom.el.hidden = false;
    void zoom.el.offsetWidth;
    zoom.el.classList.add('open');
  }
  function closeZoom() {
    if (!zoom.el || zoom.el.hidden) return false;
    zoom.el.classList.remove('open');
    setTimeout(() => { if (!zoom.el.classList.contains('open')) { zoom.el.hidden = true; zoom.stage.replaceChildren(); } }, 200);
    return true;
  }
  const zoomOpen = () => zoom.el && !zoom.el.hidden;
  function zoomTurn(dir) {
    if (!go(dir)) return;
    fillZoom();
    // a painted picture may be found a moment after the page turns
    setTimeout(() => { if (zoomOpen()) fillZoom(); }, TURN_MS + 100);
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
    const max = furthest(book);
    el.tocList.innerHTML = book.pages.map((p, i) => {
      const cur = book === state.book && i === state.i, locked = i > max;
      return `<li><button type="button" class="toc-item${locked ? ' locked' : ''}" data-book="${esc(book.id)}" data-i="${i}" ${cur ? 'aria-current="page"' : ''} ${locked ? 'disabled' : ''}>
        <span class="thumb" data-book="${esc(book.id)}" data-i="${i}"></span>
        <span class="toc-label">${i === 0 ? '' : `<b>${i}.</b> `}${locked ? '🔒 Keep reading to unlock' : esc(p.title || `Page ${i}`)}</span></button></li>`;
    }).join('');
    // Thumbnails are drawn only when they scroll into view.
    thumbObserver?.disconnect();
    const fill = t => {
      const b = SB.getBook(t.dataset.book), i = +t.dataset.i;
      t.innerHTML = illustrationHTML(b.pages[i], false) + artSVG(b, i);
      t.classList.add('ready');
      findPicture(b, i).then(src => { if (src) t.innerHTML = illustrationHTML({ illustration: { src } }, false); });
    };
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
      if (a?.dataset.action === 'restart') restart();
      if (a?.dataset.action === 'open-book') openBook(a.dataset.book, 0);
    });
    document.addEventListener('keydown', e => {
      if (zoomOpen()) {
        if (e.key === 'Escape') closeZoom();
        else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') zoomTurn(e.key === 'ArrowRight' ? 1 : -1);
        return;
      }
      if (e.key === 'Escape') return closeToc();
      if (!el.toc.hidden || SB.items.isOpen() || e.target.closest('input, textarea, .pickup')) return;
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Home') show(0, -1);
      else if (e.key === 'End') show(state.book.pages.length - 1, 1);
    });
    // A treasure picked up or the tune played: the way on is open, so the next arrow bounces.
    const unlocked = () => { updateChrome(); if (!el.next.disabled && !el.next.classList.contains('locked')) el.next.classList.add('nudge'); };
    document.addEventListener('sb:progress', unlocked);
    document.addEventListener('sb:solved', () => {
      const book = state.book, id = book.pages[state.i].id || state.i, solved = SB.store.get(solvedKey(book), []);
      if (!solved.includes(id)) SB.store.set(solvedKey(book), [...solved, id]);
      unlocked();
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
    // Turn the noise textures and edge masks into plain images, and fetch the font for scene snapshots.
    idle(() => { SB.raster.bakeTextures(); SB.raster.fonts(); });
    initGestures();
    updateSoundBtn();
    routeFromHash();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.SB);
