/* Turns vector graphics into ready-made bitmaps, once, ahead of time.
   Phones paint big SVG scenes and noise-filter textures tile by tile, and a page turn can't start until
   those tiles are done, so turns looked blocky or skipped the flip. A bitmap is just uploaded and moved.
   - bakeTextures(): paper grain / fibers / watercolor and the painted-edge masks become PNGs at startup.
   - snapshot(): a page's scene becomes an ImageBitmap that the reader shows while pages wait and turn. */
(function (SB) {
  const fontFamilies = 'family=Grandstander:wght@600;800;900';
  let fontCSS = null;

  // Scene words use Grandstander. An SVG drawn as an image can't load web fonts, so embed the font itself.
  function fonts() {
    if (fontCSS) return fontCSS;
    fontCSS = (async () => {
      try {
        const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 5000);
        const css = await (await fetch(`https://fonts.googleapis.com/css2?${fontFamilies}&display=block`, { signal: ctrl.signal })).text();
        // Google serves one block per alphabet subset per weight; keep the basic Latin ones.
        const blocks = css.split('@font-face').filter(b => /U\+0000-00FF/.test(b));
        const faces = await Promise.all(blocks.map(async b => {
          const url = (b.match(/url\((https:[^)]+\.woff2)\)/) || [])[1], weight = (b.match(/font-weight:\s*(\d+)/) || [])[1];
          if (!url) return '';
          const buf = new Uint8Array(await (await fetch(url, { signal: ctrl.signal })).arrayBuffer());
          let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
          return `@font-face{font-family:'Grandstander';font-weight:${weight};src:url(data:font/woff2;base64,${btoa(bin)}) format('woff2')}`;
        }));
        return faces.join('');
      } catch (e) { return ''; } // offline: scene words fall back to a system font in snapshots
    })();
    return fontCSS;
  }

  async function svgImage(svg) {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally { setTimeout(() => URL.revokeObjectURL(url), 0); }
  }

  /* ---------- Textures and masks: data-URI SVG noise -> PNG, once ---------- */
  const TEXTURES = { '--tex-grain': 2, '--tex-fibers': 2, '--tex-wash': 1, '--mask-vignette': 1.25, '--mask-oval': 1.25, '--mask-torn': 1.25 };
  async function bakeTextures() {
    const root = document.documentElement, cs = getComputedStyle(root);
    await Promise.all(Object.entries(TEXTURES).map(async ([name, scale]) => {
      try {
        const m = cs.getPropertyValue(name).match(/url\("(data:image\/svg\+xml,.*?)"\)/);
        if (!m) return;
        const svg = decodeURIComponent(m[1].slice('data:image/svg+xml,'.length));
        // only the outer <svg> tag is resized; shapes inside keep their own width/height
        const open = svg.match(/^<svg[^>]*>/)[0];
        const vb = open.match(/viewBox='0 0 (\d+) (\d+)'/), wh = open.match(/width='(\d+)' height='(\d+)'/);
        const bw = vb ? +vb[1] : +wh[1], bh = vb ? +vb[2] : +wh[2];
        const w = Math.round(bw * scale), h = Math.round(bh * scale);
        // explicit pixel size (and a viewBox so the noise pattern scales rather than changes)
        const tag = open.replace(/ width='\d+' height='\d+'/, '')
          .replace('<svg ', `<svg width='${w}' height='${h}' ${vb ? '' : `viewBox='0 0 ${bw} ${bh}' `}`);
        const src = tag + svg.slice(open.length);
        const img = await svgImage(src);
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        const blob = await new Promise(r => c.toBlob(r, 'image/png'));
        if (blob) root.style.setProperty(name, `url(${URL.createObjectURL(blob)})`);
      } catch (e) { /* keep the SVG version */ }
    }));
  }

  // Inline SVG in a page forgives a repeated attribute (the first one wins); an SVG image refuses to load.
  // Some drawing helpers add e.g. a second stroke-width, so keep the first of each, as the page does.
  const dedupe = svg => svg.replace(/<([a-zA-Z][\w:-]*)(\s[^<>]*?)?(\/?)>/g, (m, tag, attrs = '', end) => {
    if (!attrs) return m;
    const seen = new Set();
    const kept = attrs.replace(/\s([\w:-]+)="[^"]*"/g, (a, name) => seen.has(name) ? '' : (seen.add(name), a));
    return `<${tag}${kept}${end}>`;
  });

  /* ---------- Scene snapshots: a page's art as a bitmap at the picture's on-screen pixel size ---------- */
  const snaps = new Map(), MAX = 8; // a few pages around the reader; older ones are released
  function snapshot(key, svgBody, w, h) {
    const k = `${key}@${w}x${h}`;
    if (snaps.has(k)) { const v = snaps.get(k); snaps.delete(k); snaps.set(k, v); return v; }
    const p = (async () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">` +
        `<defs><style>${await fonts()}</style>${SB.art.defs}</defs>${dedupe(svgBody)}</svg>`;
      const img = await svgImage(svg);
      return 'createImageBitmap' in window ? createImageBitmap(img) : img;
    })().catch(() => null);
    snaps.set(k, p);
    // forget the oldest; don't close() it, a page on screen may still be drawing from it (the GC frees it)
    while (snaps.size > MAX) snaps.delete(snaps.keys().next().value);
    return p;
  }
  const peek = (key, w, h) => snaps.get(`${key}@${w}x${h}`);

  SB.raster = { bakeTextures, snapshot, peek, fonts };
})(window.SB);
