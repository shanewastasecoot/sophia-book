/* Full-screen animated backdrop behind the reader, chosen by the world theme (`backdrop: 'ocean'`).
   Three depth layers: far caustic light rays, a shimmering caustic net near the surface, and
   bubbles at three depths. The "camera" drifts a little with each page turn and with the pointer,
   and nearer layers move more, which gives the parallax. Add another backdrop with SB.backdrop.register(). */
(function (SB) {
  const kinds = {};
  let canvas = null, c = null, kind = null, state = null, raf = 0, w = 0, h = 0;
  const target = { x: 0, y: 0, page: 0 }, cam = { x: 0, y: 0 };
  const rand = (a, b) => a + Math.random() * (b - a);
  const wrap = (v, m) => ((v % m) + m) % m;

  kinds.ocean = {
    init() {
      const layer = (n, depth, rMin, rMax, sp) => Array.from({ length: n }, () => ({
        x: Math.random(), y: rand(0, 1.2), r: rand(rMin, rMax), sp: rand(sp * .6, sp * 1.4), ph: rand(0, 6.3), depth,
      }));
      return {
        rays: Array.from({ length: 7 }, (_, i) => ({ x: i / 7 + rand(0, .06), w: rand(.04, .09), ph: rand(0, 6.3), sp: rand(.15, .35) })),
        bubbles: [layer(28, .25, 1.5, 3.5, .02), layer(16, .6, 3, 6, .035), layer(8, 1, 6, 11, .055)],
      };
    },
    frame(c, s, w, h, t) {
      // far: caustic light rays, barely moved by the camera
      c.globalCompositeOperation = 'lighter';
      if (s.rayH !== h) { s.ray = c.createLinearGradient(0, 0, 0, h * .95); s.ray.addColorStop(0, 'rgba(140,255,236,1)'); s.ray.addColorStop(1, 'rgba(140,255,236,0)'); s.rayH = h; }
      c.fillStyle = s.ray;
      for (const r of s.rays) {
        const x = wrap(r.x + Math.sin(t * r.sp + r.ph) * .025 - cam.x * .12, 1.25) - .12;
        c.globalAlpha = .045 + .045 * (Math.sin(t * r.sp * 1.8 + r.ph) + 1) / 2;
        c.beginPath();
        c.moveTo(x * w, 0); c.lineTo((x + r.w) * w, 0);
        c.lineTo((x + r.w * 2.6 + .1) * w, h * .95); c.lineTo((x + .05) * w, h * .95);
        c.closePath(); c.fill();
      }
      c.globalAlpha = 1;
      // middle: shimmering caustic net under the surface
      c.lineWidth = 1.4;
      const step = Math.max(12, w / 90);
      for (let k = 0; k < 12; k++) {
        const base = h * .015 + k * h * .02;
        c.strokeStyle = `rgba(125,252,217,${.055 - k * .004})`;
        c.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          const X = x / w - cam.x * .3;
          const y = base + Math.sin(X * 9 + t * .8 + k) * 6 + Math.sin(X * 23 - t * 1.15 + k * 2) * 3;
          x ? c.lineTo(x, y) : c.moveTo(x, y);
        }
        c.stroke();
      }
      c.globalCompositeOperation = 'source-over';
      // near: bubbles in three depths; nearer bubbles are bigger, brighter, faster, and shift more
      for (const layer of s.bubbles) for (const b of layer) {
        const y = wrap(b.y - t * b.sp, 1.2) - .1 - cam.y * b.depth * .05;
        const x = wrap(b.x + Math.sin(t * .9 + b.ph) * .008 - cam.x * b.depth, 1);
        const r = b.r * Math.min(1.4, Math.max(.7, w / 1000)), a = .18 + .4 * b.depth;
        c.beginPath(); c.arc(x * w, y * h, r, 0, Math.PI * 2);
        c.fillStyle = `rgba(180,245,255,${a * .25})`; c.fill();
        c.lineWidth = Math.max(1, r / 7); c.strokeStyle = `rgba(220,255,255,${a})`; c.stroke();
        c.beginPath(); c.arc(x * w - r * .35, y * h - r * .35, r * .22, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${a + .2})`; c.fill();
      }
    },
  };

  function resize() {
    if (!canvas) return;
    const dpr = 1; // soft, blurry-by-nature light and bubbles: full device resolution would cost 4-9x the pixels for no visible gain
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (kind && SB.calm()) drawOnce();
  }
  function drawOnce() { c.clearRect(0, 0, w, h); kinds[kind].frame(c, state, w, h, 2); }
  let heldUntil = 0;
  function loop(ms) {
    if (!kind) return;
    if (performance.now() < heldUntil) { raf = requestAnimationFrame(loop); return; } // page is turning
    cam.x += (target.x - cam.x) * .05;
    cam.y += (target.y - cam.y) * .05;
    c.clearRect(0, 0, w, h);
    kinds[kind].frame(c, state, w, h, ms / 1000);
    raf = requestAnimationFrame(loop);
  }
  function run() {
    cancelAnimationFrame(raf);
    if (!kind || document.hidden) return;
    if (SB.calm()) drawOnce(); else raf = requestAnimationFrame(loop);
  }
  function aim(px = 0, py = 0) { target.x = target.page * .05 + px * .03; target.y = py * .5; }

  SB.backdrop = {
    register(name, def) { kinds[name] = def; },
    use(name) {
      if (!canvas) {
        canvas = document.getElementById('backdrop');
        if (!canvas) return;
        c = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', e => aim(e.clientX / w - .5, e.clientY / h - .5), { passive: true });
        document.addEventListener('visibilitychange', run);
      }
      const next = kinds[name] ? name : null;
      if (next === kind) return;
      kind = next;
      canvas.classList.toggle('on', !!kind);
      if (kind) state = kinds[kind].init(); else { cancelAnimationFrame(raf); c.clearRect(0, 0, w, h); }
      run();
    },
    setPage(i) { target.page = i; aim(); },
    hold(ms) { heldUntil = performance.now() + ms; },
    refresh: run, // after bedtime mode changes: keep moving, or settle into one still frame
  };
})(window.SB);
