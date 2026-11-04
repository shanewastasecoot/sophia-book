/* Hand-inked wobble, baked into the drawing.
   A live SVG filter (#sketch-filter) re-runs on every animation frame, which made phones choppy.
   Instead, when a scene is first drawn we nudge every point of every shape by a smooth noise field,
   the same kind of warp feDisplacementMap does, so lines wobble like a pen but cost nothing to animate.
   Circles, ellipses and rects become paths, and long straight edges are split so they can bend.
   Works on our own generated SVG strings (double-quoted attributes, self-closing shapes). */
(function (SB) {
  const FREQ = 0.028, AMP = 2.4, SPLIT = 28; // noise frequency (per SVG unit), wobble size, max straight run

  // Smooth 2D value noise in [-1, 1].
  const hash = (x, y, s) => { let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967295 * 2 - 1; };
  const fade = t => t * t * (3 - 2 * t);
  function noise(x, y, s) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
    const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  }
  const warp = (x, y) => {
    const fx = x * FREQ, fy = y * FREQ;
    return [
      x + AMP * (noise(fx, fy, 1) + .5 * noise(fx * 2, fy * 2, 3)),
      y + AMP * (noise(fx, fy, 2) + .5 * noise(fx * 2, fy * 2, 4)),
    ];
  };
  const f = n => Math.round(n * 10) / 10;
  const pt = (x, y) => { const [a, b] = warp(x, y); return `${f(a)} ${f(b)}`; };

  /* Rewrite a path's d: make every command absolute, turn H/V into L, split long straight lines,
     and warp every point (arc radii and flags are kept). */
  const ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
  function path(d) {
    const tok = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g);
    if (!tok) return d;
    let i = 0, cmd = '', cx = 0, cy = 0, sx = 0, sy = 0, out = [];
    const num = () => parseFloat(tok[i++]);
    const line = (x, y) => {
      const n = Math.min(12, Math.ceil(Math.hypot(x - cx, y - cy) / SPLIT));
      for (let k = 1; k <= n; k++) out.push('L' + pt(cx + (x - cx) * k / n, cy + (y - cy) * k / n));
      cx = x; cy = y;
    };
    while (i < tok.length) {
      if (/[a-z]/i.test(tok[i])) cmd = tok[i++];
      const C = cmd.toUpperCase(), rel = cmd !== C, ox = rel ? cx : 0, oy = rel ? cy : 0;
      if (C === 'Z') { line(sx, sy); out.push('Z'); cx = sx; cy = sy; cmd = ''; continue; }
      if (!ARGS[C] || i + ARGS[C] > tok.length || /[a-z]/i.test(tok[i])) return d; // unexpected: leave as drawn
      if (C === 'M') { cx = num() + ox; cy = num() + oy; sx = cx; sy = cy; out.push('M' + pt(cx, cy)); cmd = rel ? 'l' : 'L'; }
      else if (C === 'L') { const x = num() + ox, y = num() + oy; line(x, y); }
      else if (C === 'H') line(num() + ox, cy);
      else if (C === 'V') line(cx, num() + oy);
      else if (C === 'A') {
        const rx = num(), ry = num(), rot = num(), la = num(), sw = num(), x = num() + ox, y = num() + oy;
        out.push(`A${rx} ${ry} ${rot} ${la} ${sw} ${pt(x, y)}`); cx = x; cy = y;
      } else {
        const pts = [];
        for (let k = 0; k < ARGS[C]; k += 2) pts.push([num() + ox, num() + oy]);
        out.push(C + pts.map(p => pt(p[0], p[1])).join(' '));
        [cx, cy] = pts[pts.length - 1];
      }
    }
    return out.join('');
  }

  const K = 0.5523; // circle-to-Bezier constant
  const ellipsePath = (cx, cy, rx, ry) =>
    `M${cx + rx} ${cy}C${cx + rx} ${cy + ry * K} ${cx + rx * K} ${cy + ry} ${cx} ${cy + ry}C${cx - rx * K} ${cy + ry} ${cx - rx} ${cy + ry * K} ${cx - rx} ${cy}` +
    `C${cx - rx} ${cy - ry * K} ${cx - rx * K} ${cy - ry} ${cx} ${cy - ry}C${cx + rx * K} ${cy - ry} ${cx + rx} ${cy - ry * K} ${cx + rx} ${cy}Z`;
  const rectPath = (x, y, w, h, r) => {
    r = Math.min(r || 0, w / 2, h / 2);
    if (!r) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
    return `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
  };

  const GEOM = { circle: ['cx', 'cy', 'r'], ellipse: ['cx', 'cy', 'rx', 'ry'], rect: ['x', 'y', 'width', 'height', 'rx', 'ry'] };
  function shape(tag, attrs) {
    const a = {}, rest = attrs.replace(/\s([\w-]+)="([^"]*)"/g, (m, k, v) => {
      if (GEOM[tag].includes(k)) { a[k] = parseFloat(v); return ''; }
      return m;
    });
    if (Object.values(a).some(Number.isNaN)) return null;  // e.g. width="100%"
    let d;
    if (tag === 'circle') { if ((a.r || 0) < 3.5) return null; d = ellipsePath(a.cx || 0, a.cy || 0, a.r, a.r); }
    else if (tag === 'ellipse') { if (Math.min(a.rx, a.ry) < 3) return null; d = ellipsePath(a.cx || 0, a.cy || 0, a.rx, a.ry); }
    else { if (a.width >= 780) return null; d = rectPath(a.x || 0, a.y || 0, a.width, a.height, a.rx ?? a.ry); }  // keep full-page backgrounds crisp
    return `<path d="${path(d)}"${rest}/>`;
  }

  SB.sketch = {
    apply(svg) {
      // paths first, then shapes (which become already-warped paths), so nothing is warped twice
      return svg
        .replace(/(<path\b[^>]*?\sd=")([^"]*)"/g, (m, head, d) => head + path(d) + '"')
        .replace(/<(circle|ellipse|rect)\b([^>]*?)\/>/g, (m, tag, attrs) => shape(tag, attrs) || m);
    },
  };
})(window.SB);
