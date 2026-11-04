/* World themes. Each one is a set of CSS custom properties (see css/reader.css for what they style).
   A book picks a default theme; any page can override it with `theme: '<id>'`. */
(function (SB) {
  const base = {
    '--star': '#ffffff55',
    '--chrome-ink': '#ffffff',
  };

  SB.registerTheme('sparkle-night', {
    label: 'Sparkleton at night',
    metaColor: '#1b1240',
    vars: {
      ...base,
      '--app-bg-1': '#1b1240', '--app-bg-2': '#2e1a68',
      '--paper': '#fff8fd', '--ink': '#2a1640', '--muted': '#7d6a99',
      '--accent': '#ff4fa3', '--accent-shadow': '#b81f6e',
      '--accent-2': '#8a3fd1', '--accent-2-shadow': '#5a2193',
      '--accent-3': '#ff7a1a', '--accent-3-shadow': '#b85a07',
      '--btn': '#ffc83d', '--btn-ink': '#2a1640', '--btn-shadow': '#c08a0a',
      '--glow': '#ff4fa333',
    },
  });

  // Mermaid City: deep water, soft teals, bioluminescent mint glow.
  SB.registerTheme('mermaid-deep', {
    label: 'Mermaid City, deep water',
    metaColor: '#03182b',
    vars: {
      ...base,
      '--star': '#7dfcd933',
      '--app-bg-1': '#03182b', '--app-bg-2': '#06485f',
      '--paper': '#f2fffd', '--ink': '#0c3140', '--muted': '#4f7d86',
      '--accent': '#ff6fa8', '--accent-shadow': '#b83c6d',
      '--accent-2': '#1597a5', '--accent-2-shadow': '#0b5f69',
      '--accent-3': '#ff8a3d', '--accent-3-shadow': '#b8571a',
      '--btn': '#7dfcd9', '--btn-ink': '#0c3140', '--btn-shadow': '#2aa58c',
      '--glow': '#7dfcd940',
    },
  });

  // Shallower, sunlit lagoon for daytime pages in the sequel.
  SB.registerTheme('mermaid-lagoon', {
    label: 'Mermaid City, sunny lagoon',
    metaColor: '#0b6e86',
    vars: {
      ...base,
      '--star': '#ffffff40',
      '--app-bg-1': '#0b6e86', '--app-bg-2': '#18a7b5',
      '--paper': '#fbfffe', '--ink': '#0c3140', '--muted': '#4f7d86',
      '--accent': '#ff6fa8', '--accent-shadow': '#b83c6d',
      '--accent-2': '#0e7f8c', '--accent-2-shadow': '#095862',
      '--accent-3': '#ff8a3d', '--accent-3-shadow': '#b8571a',
      '--btn': '#ffe27a', '--btn-ink': '#0c3140', '--btn-shadow': '#c9a52a',
      '--glow': '#ffffff40',
    },
  });

  let current = null;
  SB.applyTheme = function (id) {
    const t = SB.themes[id] || SB.themes['sparkle-night'];
    if (current === t) return;
    current = t;
    const root = document.documentElement;
    for (const [k, v] of Object.entries(t.vars)) root.style.setProperty(k, v);
    root.dataset.world = id;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && t.metaColor) meta.content = t.metaColor;
  };
})(window.SB);
