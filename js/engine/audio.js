/* Sound effects. A recorded file at sounds/<name>.mp3 (or .m4a) plays when there is one; otherwise the sound
   is made in the browser. Books can add made-in-browser sounds with SB.audio.register(). Files are looked up
   when a page that uses them is built (prepare), so dropping a new file in sounds/ is all it takes. */
(function (SB) {
  let ac, master, soften;
  // Every sound goes through one volume knob and one tone filter, so bedtime mode can make them all quiet and soft.
  const LEVEL = { day: { gain: 1, cutoff: 18000 }, bedtime: { gain: .35, cutoff: 2200 } };
  function out(a) {
    if (!master) {
      master = a.createGain(); soften = a.createBiquadFilter(); soften.type = 'lowpass';
      master.connect(soften).connect(a.destination);
      applyLevel();
    }
    return master;
  }
  function applyLevel() {
    if (!master) return;
    const l = SB.bedtime ? LEVEL.bedtime : LEVEL.day;
    master.gain.value = l.gain; soften.frequency.value = l.cutoff;
  }
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
    o.connect(f).connect(g).connect(out(a)); o.start(t); o.stop(t + d + .05);
  }
  function noise(d, f0, f1, v = .3, t0 = 0, type = 'bandpass') {
    const a = ctx(), t = a.currentTime + t0, len = Math.floor(a.sampleRate * d), b = a.createBuffer(1, len, a.sampleRate), ch = b.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    src.buffer = b; f.type = type; f.Q.value = 1.2; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    src.connect(f).connect(g).connect(out(a)); src.start(t);
  }

  const sounds = {
    boing: () => { tone(180, 720, .1, 'triangle', .35); tone(720, 260, .22, 'triangle', .3, .1); },
    twinkle: () => [1319, 1568, 1976, 2637].forEach((f, i) => tone(f, f, .18, 'sine', .14, i * .07)),
    tweet: () => [0, .16].forEach(t => { tone(2400, 3400, .07, 'sine', .16, t); tone(3400, 2600, .06, 'sine', .14, t + .07); }),
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

  /* ---------- Recorded sound files ---------- */
  const EXTS = ['mp3', 'm4a'];
  const files = {};   // name -> { state: 'loading' | 'ready' | 'none', buf, gain }
  let decoder;        // decoding needs no tap first, unlike playing
  function decode(data) {
    decoder = decoder || new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 1, 44100);
    return new Promise((ok, no) => decoder.decodeAudioData(data, ok, no));
  }
  // Look up a sound's file once; returns a promise that settles when it's known. A file that wasn't there is
  // looked for again after a minute (it may have just been uploaded), and the browser always checks with the
  // server instead of reusing an old "not found".
  function prepare(name) {
    if (!name || location.protocol === 'file:' || !window.fetch) return Promise.resolve();
    const known = files[name];
    if (known && (known.state !== 'none' || Date.now() - known.at < 60000)) return known.ready;
    const entry = files[name] = { state: 'loading' };
    entry.ready = (async () => {
      for (const ext of EXTS) {
        try {
          const r = await fetch(`sounds/${name}.${ext}`, { cache: 'no-cache' });
          if (!r.ok) continue;
          const buf = await decode(await r.arrayBuffer());
          // even out loudness: downloaded and recorded files come in all volumes
          let peak = 0;
          for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c); for (let i = 0; i < d.length; i += 4) peak = Math.max(peak, Math.abs(d[i])); }
          Object.assign(entry, { state: 'ready', buf, gain: Math.min(3, .8 / (peak || 1)) });
          return;
        } catch (e) { /* not there, or not playable here: try the next kind */ }
      }
      Object.assign(entry, { state: 'none', at: Date.now() });
    })();
    return entry.ready;
  }
  function playFile(f) {
    const a = ctx(), src = a.createBufferSource(), g = a.createGain();
    src.buffer = f.buf; g.gain.value = f.gain;
    src.connect(g).connect(out(a)); src.start();
  }

  SB.audio = {
    muted: SB.store.get('sb-muted', false),
    tone, noise, prepare,
    hasFile: name => files[name]?.state === 'ready',
    register(name, fn) { sounds[name] = fn; },
    play(name) {
      if (this.muted) return;
      const f = files[name];
      const built = () => { try { sounds[name]?.(); } catch (e) { /* audio blocked or unsupported: stay silent */ } };
      const file = () => { try { playFile(f); } catch (e) { built(); } };
      try { ctx(); } catch (e) { return; } // wake the speaker during the tap itself
      if (f?.state === 'ready') return file();
      if (f?.state === 'loading') {
        // the recording is still on its way: wait a moment for it rather than play the old built-in sound
        let settled = false;
        const giveUp = setTimeout(() => { settled = true; built(); }, 500);
        f.ready.then(() => { if (settled) return; settled = true; clearTimeout(giveUp); f.state === 'ready' ? file() : built(); });
        return;
      }
      built();
      if (!f) prepare(name); // a sound no page asked for yet: have it ready next time
    },
    chime() {
      if (this.muted) return;
      try { const f = [1568, 1760, 2093, 2349][Math.floor(Math.random() * 4)]; tone(f, f, .2, 'sine', .12); } catch (e) {}
    },
    setMuted(m) { this.muted = m; SB.store.set('sb-muted', m); },
    applyLevel,
  };
})(window.SB);
