# Paintings

Put a painting here and that page shows it instead of its drawing. Pages without a painting keep their drawing.

- Book 1 (Shadow Demon): `img/sparkle-swords/<page>.png`
- Book 2 (Mermaid City): `img/mermaid-city/<page>.png`

`.webp` and `.jpg` work too. Page names:

- sparkle-swords: cover, rule, sophia, band, shield, burp, grumbo, chomp, showtime, toot, sword, wiggle, pop, squeak, friend, end
- mermaid-city: cover, splash, pip, gates, squish, lock, kelp, bubbles, cave, octopus, why, hide, wigglebottom, song, open, party, end

Wide pictures (16:9) fit best; the edges are softened and slightly cropped. The prompts for every page are in the "Sophia Book Picture Prompts" page.

## Menu thumbnails

The Pages menu shows small copies from `img/<book>/thumb/<page>.webp` (360 x 225, cropped 8:5), so it never has to
decode the full paintings. A page without a thumbnail falls back to its full painting. When you add or replace a
painting, make its thumbnail too (Claude does this when shrinking new paintings).
