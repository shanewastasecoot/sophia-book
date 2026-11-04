/* Sound effects made in the browser (no audio files). Books can add their own with SB.audio.register(). */
(function (SB) {
  let ac;
  function ctx() {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }
  function tone(f0, f1, d, type = 'sine', v = .3, t0 = 0, vib = 0) {
    const a = ctx(), t = a.currentTime + t0, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + d);
    if (vib) { const l = a.createOscillator(), lg = a.createGain(); l.frequency.value = vib; lg.gain.value = f0 * .12; l.connect(lg).connect(o.frequency); l.start(t); l.stop(t + d + .05); }
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = type === 'sawtooth' ? 900 : 8000;
    o.connect(f).connect(g).connect(a.destination); o.start(t); o.stop(t + d + .05);
  }
  function noise(d, f0, f1, v = .3, t0 = 0, type = 'bandpass') {
    const a = ctx(), t = a.currentTime + t0, len = Math.floor(a.sampleRate * d), b = a.createBuffer(1, len, a.sampleRate), ch = b.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    src.buffer = b; f.type = type; f.Q.value = 1.2; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    src.connect(f).connect(g).connect(a.destination); src.start(t);
  }

  const sounds = {
    boing: () => { tone(180, 720, .1, 'triangle', .35); tone(720, 260, .22, 'triangle', .3, .1); },
    twinkle: () => [1319, 1568, 1976, 2637].forEach((f, i) => tone(f, f, .18, 'sine', .14, i * .07)),
    swish: () => noise(.32, 500, 5000, .5),
    la: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, f * 1.003, i === 3 ? .5 : .2, 'triangle', .25, i * .16, i === 3 ? 6 : 0)),
    hum: () => { tone(220, 222, 1.2, 'sine', .2); tone(330, 331, 1.2, 'sine', .1); tone(440, 441, 1.2, 'sine', .06); },
    rumble: () => { noise(1.1, 140, 60, .7, 0, 'lowpass'); tone(55, 45, 1.1, 'sine', .3); },
    burp: () => tone(120, 70, .65, 'sawtooth', .45, 0, 22),
    chomp: () => { tone(320, 90, .09, 'square', .2); tone(280, 80, .09, 'square', .2, .12); },
    stomp: () => { tone(130, 38, .35, 'sine', .7); noise(.12, 300, 80, .4, 0, 'lowpass'); },
    roar: () => { tone(170, 85, .9, 'sawtooth', .4, 0, 14); noise(.9, 900, 300, .25); },
    toot: () => tone(96, 70, .75, 'sawtooth', .5, 0, 28),
    boom: () => [0, .22, .33].forEach(t => tone(150, 45, .3, 'sine', .7, t)),
    pop: () => { tone(380, 1400, .07, 'sine', .4); [1568, 2093].forEach((f, i) => tone(f, f, .15, 'sine', .1, .08 + i * .06)); },
    squeak: () => { tone(1500, 2700, .09, 'sine', .25); tone(2700, 1900, .1, 'sine', .22, .09); },
    ding: () => [1760, 1760].forEach((f, i) => tone(f, f * .99, .35, 'sine', .2, i * .22)),
    honk: () => { tone(85, 115, .55, 'sawtooth', .45, 0, 9); noise(.7, 3000, 6000, .2, .6, 'highpass'); },
  };

  SB.audio = {
    muted: SB.store.get('sb-muted', false),
    tone, noise,
    register(name, fn) { sounds[name] = fn; },
    play(name) {
      if (this.muted || !sounds[name]) return;
      try { sounds[name](); } catch (e) { /* audio blocked or unsupported: stay silent */ }
    },
    chime() {
      if (this.muted) return;
      try { const f = [1568, 1760, 2093, 2349][Math.floor(Math.random() * 4)]; tone(f, f, .2, 'sine', .12); } catch (e) {}
    },
    setMuted(m) { this.muted = m; SB.store.set('sb-muted', m); },
  };
})(window.SB);
