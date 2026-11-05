/* Canvas effect layer drawn on top of a page's SVG art (pointer-events off).
   A page asks for one with `fx: 'sparkles' | 'bubbles' | 'glow'`. Add more with SB.fx.register().
   Particles use 0..1 coordinates so resizing never needs a re-init. Only the visible page animates. */
(function (SB) {
  const registry = {};
  let running = null;

  function star(c, x, y, r) {
    c.beginPath();
    c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r);
    c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fill();
  }
  const rand = (a, b) => a + Math.random() * (b - a);

  registry.sparkles = {
    init: s => { s.p = Array.from({ length: 16 }, () => ({ x: rand(.03, .97), y: rand(.03, .7), ph: rand(0, 6.3), sp: rand(.8, 2), r: rand(4, 9), c: ['#fff6c9', '#ffd65a', '#ffffff', '#ffb3e6'][Math.floor(rand(0, 4))] })); },
    frame(c, s, w, h, t) {
      for (const p of s.p) {
        const a = (Math.sin(t * p.sp + p.ph) + 1) / 2;
        c.globalAlpha = a * a; c.fillStyle = p.c;
        star(c, p.x * w, p.y * h, p.r * (.6 + .4 * a) * (w / 800));
      }
      c.globalAlpha = 1;
    },
  };

  registry.bubbles = {
    init: s => { s.p = Array.from({ length: 22 }, () => ({ x: rand(0, 1), y0: rand(0, 1.2), r: rand(3, 11), sp: rand(.04, .12), wb: rand(1, 2.5), ph: rand(0, 6.3) })); },
    frame(c, s, w, h, t) {
      const k = w / 800;
      for (const p of s.p) {
        const y = ((p.y0 - t * p.sp) % 1.2 + 1.2) % 1.2 - .1;
        const x = p.x + Math.sin(t * p.wb + p.ph) * .012;
        const r = p.r * k;
        c.beginPath(); c.arc(x * w, y * h, r, 0, Math.PI * 2);
        c.fillStyle = 'rgba(190,245,255,.14)'; c.fill();
        c.lineWidth = Math.max(1, 1.6 * k); c.strokeStyle = 'rgba(255,255,255,.65)'; c.stroke();
        c.beginPath(); c.arc(x * w - r * .35, y * h - r * .35, r * .25, 0, Math.PI * 2);
        c.fillStyle = 'rgba(255,255,255,.8)'; c.fill();
      }
    },
  };

  // A soft glowing dot, painted once per color and then stamped (much cheaper than a gradient per dot per frame).
  const sprites = {};
  function glowSprite(rgb) {
    if (sprites[rgb]) return sprites[rgb];
    const s = document.createElement('canvas'); s.width = s.height = 64;
    const g = s.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(${rgb},1)`); gr.addColorStop(.35, `rgba(${rgb},.45)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return (sprites[rgb] = s);
  }
  registry.glow = {
    init: s => { s.p = Array.from({ length: 26 }, () => ({ x: rand(0, 1), y: rand(.05, .95), r: rand(6, 16), ph: rand(0, 6.3), sp: rand(.15, .4), c: ['125,252,217', '95,242,255', '180,140,255'][Math.floor(rand(0, 3))] })); },
    frame(c, s, w, h, t) {
      const k = w / 800;
      for (const p of s.p) {
        const x = (p.x + Math.sin(t * p.sp + p.ph) * .03) * w, y = (p.y + Math.cos(t * p.sp * .8 + p.ph) * .03) * h;
        const size = p.r * k * 4.8;
        c.globalAlpha = .35 + .45 * (Math.sin(t * 1.3 + p.ph) + 1) / 2;
        c.drawImage(glowSprite(p.c), x - size / 2, y - size / 2, size, size);
      }
      c.globalAlpha = 1;
    },
  };

  function stop() { if (running) { running.stop(); running = null; } }

  function start(canvas, name) {
    stop();
    const def = registry[name];
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!def || SB.calm()) { c.clearRect(0, 0, canvas.width, canvas.height); return; } // no sparkles at bedtime
    const state = {}; def.init(state);
    let w = 0, h = 0, raf = 0, alive = true;
    const size = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr)); canvas.height = Math.max(1, Math.round(h * dpr));
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (SB.prefersReducedMotion()) { c.clearRect(0, 0, w, h); def.frame(c, state, w, h, 1.2); }
    };
    size();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(size) : null;
    ro?.observe(canvas);
    if (!SB.prefersReducedMotion()) {
      const loop = ms => {
        if (!alive) return;
        c.clearRect(0, 0, w, h);
        def.frame(c, state, w, h, ms / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    running = { stop() { alive = false; cancelAnimationFrame(raf); ro?.disconnect(); } };
  }

  SB.fx = { register(name, def) { registry[name] = def; }, start, stop };
})(window.SB);
