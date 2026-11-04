/* World themes. Each one is a full set of CSS custom properties (see css/reader.css for what they style)
   plus an optional animated `backdrop` behind the whole reader (see js/engine/backdrop.js).
   A book picks a default theme; any page can override it with `theme: '<id>'`.
   Every theme starts from SPARKLE so switching themes never leaves a stale variable behind. */
(function (SB) {
  const SPARKLE = {
    '--app-bg-1': '#1b1240', '--app-bg-2': '#2e1a68', '--star': '#ffffff55', '--chrome-ink': '#ffffff',
    '--paper': '#fbf3e4', '--ink': '#3a2440', '--muted': '#7a6584',
    // storybook texture: pencil line color, paper grain and watercolor wash strength (0..1)
    '--ink-line': '#3a1d4fb0', '--chrome-line': '#ffffffa6', '--grain': '.55', '--wash': '.45',
    '--accent': '#ff4fa3', '--accent-shadow': '#b81f6e',
    '--accent-2': '#8a3fd1', '--accent-2-shadow': '#5a2193',
    '--accent-3': '#ff7a1a', '--accent-3-shadow': '#b85a07',
    '--btn': '#ffc83d', '--btn-ink': '#2a1640', '--btn-shadow': '#c08a0a', '--btn-glow': '0 0 0 transparent',
    '--glow': '#ff4fa333',
    // panels: warm watercolor paper here, frosted glass in the ocean themes
    '--panel': '#fbf3e4', '--panel-strong': '#fbf3e4', '--panel-blur': '0px', '--panel-border': '#ffffff22',
    '--bar-bg': 'transparent', '--chip': '#0000000f',
    '--text-glow': 'none',
    // sound-word pills (always white text)
    '--sfx-1': '#ff4fa3', '--sfx-1-shadow': '#b81f6e',
    '--sfx-2': '#8a3fd1', '--sfx-2-shadow': '#5a2193',
    '--sfx-3': '#ff7a1a', '--sfx-3-shadow': '#b85a07',
    '--sfx-tiny': '#4fb8ff', '--sfx-tiny-shadow': '#2373a8',
  };

  SB.registerTheme('sparkle-night', {
    label: 'Sparkleton at night',
    metaColor: '#1b1240',
    vars: SPARKLE,
  });

  // Mermaid City: deep navy water, glowing cyan and magenta, frosted-glass panels.
  const DEEP = {
    ...SPARKLE,
    '--app-bg-1': '#020c1f', '--app-bg-2': '#053a4a', '--star': '#5ff2ff1f', '--chrome-ink': '#e4fbff',
    '--paper': '#061e34', '--ink': '#e4fbff', '--muted': '#8fc6d1',
    '--ink-line': '#9ff6ff99', '--chrome-line': '#9ff6ff99', '--grain': '.3', '--wash': '.3',
    '--accent': '#ff5fd2', '--accent-shadow': '#9c2a7e',
    '--accent-2': '#5ff2ff', '--accent-2-shadow': '#1a8fa3',
    '--accent-3': '#ffc06b', '--accent-3-shadow': '#b9772a',
    '--btn': '#5ff2ff', '--btn-ink': '#03203a', '--btn-shadow': '#1a8fa3', '--btn-glow': '0 0 22px #5ff2ff80',
    '--glow': '#5ff2ff40',
    '--panel': '#061e349e', '--panel-strong': '#061e34e0', '--panel-blur': '16px', '--panel-border': '#5ff2ff40',
    '--bar-bg': '#04162a73', '--chip': '#ffffff17',
    '--text-glow': '0 0 14px currentColor',
    '--sfx-1': '#c42a96', '--sfx-1-shadow': '#7a1a5e',
    '--sfx-2': '#0d8a9e', '--sfx-2-shadow': '#06505c',
    '--sfx-3': '#6b46d6', '--sfx-3-shadow': '#3f2690',
    '--sfx-tiny': '#2b7fd6', '--sfx-tiny-shadow': '#174d86',
  };
  SB.registerTheme('mermaid-deep', {
    label: 'Mermaid City, deep water',
    metaColor: '#020c1f',
    backdrop: 'ocean',
    vars: DEEP,
  });

  // Shallower reef water: same glow, lighter teal ground.
  SB.registerTheme('mermaid-lagoon', {
    label: 'Mermaid City, reef lagoon',
    metaColor: '#063247',
    backdrop: 'ocean',
    vars: {
      ...DEEP,
      '--app-bg-1': '#063247', '--app-bg-2': '#0b7f8f', '--star': '#ffffff26',
      '--panel': '#0a3b52a6', '--panel-strong': '#0a3b52e6', '--bar-bg': '#06324773',
      '--glow': '#7dfcd94d',
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
    SB.backdrop?.use(t.backdrop || null);
  };
})(window.SB);
