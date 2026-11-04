# sophia-book

**Princess Sophia and the Noisy Shadow Demon**: a silly, sparkly picture book that Daddy has to read exactly the way it's written. Book two, **Sophia's Mermaid City Adventure**, is started.

It runs as a plain website with no build step. Turn on GitHub Pages (Settings → Pages → deploy from `main`, root folder), or open `index.html` straight from disk.

## Reading it

- Swipe left or right on the page, tap the big arrows, or use the arrow keys.
- Tap the colored sound words to hear them, and tap the picture for a sparkle.
- The ☰ button opens the Pages menu, with picture thumbnails and a switcher for each book.
- The speaker button turns sound off and on (it remembers your choice).
- The address links to the exact page, e.g. `#sparkle-swords/grumbo`.

## How it's organized

```
index.html                 app shell; lists every script in load order
css/reader.css             layout, page turns, Pages menu, text styles (colors come from themes)
js/engine/core.js          window.SB namespace, registerBook / registerTheme
js/engine/themes.js        world themes (CSS variables): sparkle-night, mermaid-deep, mermaid-lagoon
js/engine/audio.js         sound effects made in the browser; SB.audio.register() adds more
js/engine/fx.js            canvas effects over the art: sparkles, bubbles, glow; SB.fx.register() adds more
js/engine/reader.js        page rendering, gestures, menu, prefetching (no book-specific code)
js/art/common.js           the cast (Sophia, Luna, Ruby, Grumbo), props, text helpers
js/art/kingdom.js          Sparkleton scenery
js/art/ocean.js            Mermaid City scenery
js/books/sparkle-swords.js book 1, as data
js/books/mermaid-city.js   book 2, a starter with two pages
```

Scripts are plain `<script defer>` files that add to `window.SB`, so the book also works when opened from disk (ES modules would not).

## Adding pages or a book

Each page is an object in a book's `pages` array:

```js
{
  id: 'grumbo',              // used in the URL
  title: 'Grumbo',           // shown in the Pages menu
  theme: 'mermaid-lagoon',   // optional: overrides the book's theme for this page
  fx: 'bubbles',             // optional: 'sparkles' | 'bubbles' | 'glow'
  images: [{ src: 'img/x.webp', alt: '' }], // optional raster layers, lazy-loaded
  alt: 'What the picture shows, for screen readers',
  art: () => A.water('deep') + A.princess({ ...SOPHIA, mermaid: true }),  // SVG in an 800x500 box
  text: `<p>Words to read aloud, with ${sfx('bubble', 'BLUB!')} sound buttons.</p>`,
}
```

To add a book, copy `js/books/mermaid-city.js`, change its `id`, `order`, `title` and `pages`, and add a `<script defer>` line for it in `index.html` before `reader.js`. New colors go in `js/engine/themes.js`; new scenery goes in `js/art/`.

A page's art is drawn only when that page (or the page next to it) is about to be shown, then cached. Menu thumbnails are drawn as they scroll into view.
