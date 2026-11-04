/* Treasure icons for the treasure bag, pickups and toasts. Each draws in a 100 x 100 box. */
(function (SB) {
  const { OL } = SB.art;
  const st = `stroke="${OL}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;

  const aura = c => `<circle cx="50" cy="52" r="34" fill="${c}" opacity=".35" filter="url(#glow)"/>`;

  // A scallop shell with a music note on it. One per color.
  const musicShell = (c, rib) => () => aura(c) +
    `<path d="M50 84L18 64Q12 26 50 16Q88 26 82 64Z" fill="${c}" ${st}/>
     <path d="M50 84L30 26M50 84V18M50 84L70 26M50 84L22 46M50 84L78 46" stroke="${rib}" stroke-width="3" stroke-linecap="round"/>
     <path d="M42 86h16l-3 8h-10Z" fill="${c}" ${st}/>
     <g fill="#fff" stroke="${OL}" stroke-width="2.5"><ellipse cx="44" cy="58" rx="7" ry="5.5" transform="rotate(-20 44 58)"/><path d="M50 57V34l10 4v6l-10 -4" stroke-linejoin="round"/></g>`;

  // A shell-shaped ocarina with finger holes and a mouthpiece.
  const ocarina = () => aura('#5ff2ff') +
    `<path d="M74 40l14 -8 4 8-14 8Z" fill="#7fd6d0" ${st}/>
     <path d="M20 58Q16 30 46 28Q80 26 80 52Q80 78 50 80Q24 82 20 58Z" fill="#7fd6d0" ${st}/>
     <path d="M30 44q14 -10 34 -6" stroke="#ffffff99" stroke-width="4" fill="none" stroke-linecap="round"/>
     <g fill="${OL}"><circle cx="38" cy="56" r="4.5"/><circle cx="52" cy="52" r="4.5"/><circle cx="64" cy="60" r="4.5"/><circle cx="46" cy="68" r="3.5"/></g>
     <path d="M30 70q4 6 12 7" stroke="#ff7ac1" stroke-width="3" fill="none" stroke-linecap="round"/>`;

  SB.art.treasure = {
    ocarina,
    shellPink: musicShell('#ff7ac1', '#c94a8c'),
    shellBlue: musicShell('#5fc8ff', '#2d8fc4'),
    shellGold: musicShell('#ffd34d', '#c99a1a'),
  };
})(window.SB);
