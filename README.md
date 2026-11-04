# sophia-book

**Princess Sophia and the Noisy Shadow Demon**: a silly, sparkly picture book that Daddy has to read exactly the way it's written.

**Sophia and the Mermaid City**: book two, a splashy underwater quest. Collect the Ocarina and three Music Shells, then play the Gate Song to open Mermaid City.

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
js/engine/themes.js        world themes (CSS variables, incl. frosted-glass panels): sparkle-night, mermaid-deep, mermaid-lagoon
js/engine/backdrop.js      animated parallax backdrop behind the reader (ocean: caustic light + bubbles)
js/engine/audio.js         sound effects made in the browser; SB.audio.register() adds more
js/engine/fx.js            canvas effects over the art: sparkles, bubbles, glow; SB.fx.register() adds more
js/engine/items.js         treasure bag: tap-to-collect pickups, "You found…" toasts, bag panel
js/engine/ocarina.js       the playable Gate Song puzzle
js/engine/reader.js        page rendering, gestures, menu, prefetching (no book-specific code)
js/art/common.js           the cast (Sophia, Luna, Ruby, Grumbo), props, text helpers
js/art/ui.js               chapter headers, scene dividers, and the JSON story markup
js/art/kingdom.js          Sparkleton scenery
js/art/ocean.js            underwater scenery
js/art/sea-friends.js      Pip, Wigglebottom the octopus, the city gates, kelp, bubble vents, cave
js/art/treasures.js        treasure icons (Ocarina, Music Shells)
js/books/sparkle-swords.js        book 1, as data
js/books/mermaid-city.story.js    book 2's words and page structure, as plain JSON
js/books/mermaid-city.js          book 2's scene drawings, treasure icons and sounds
```

### Storybook look

Scenes get a hand-inked wobble baked into their shapes when a page is first drawn (`js/engine/sketch.js` nudges every point by a smooth noise field), so it costs nothing while characters animate. Turn it off per book or page with `"sketch": false`, or for everything by adding the class `no-sketch` to `<html>`. The live `#sketch-filter` is used only on small static UI pieces (page frame, button rings, ornaments). Paper grain, fibers and watercolor washes are generated from SVG noise in `css/reader.css` (`--tex-*`) and painted as static background layers with `background-blend-mode: multiply`.

### Keeping it smooth on phones

- Nothing expensive runs per frame: no live SVG filters on animated scenes, no full-screen blend overlays, and the frosted-glass blur is only used on mouse/trackpad devices.
- The next and previous pages are built after a turn finishes and wait, already painted and frozen, under the current page, so a turn only reveals a finished page (and a swipe peeks at the right one).
- The ocean backdrop renders at 1x resolution and pauses during page turns; canvas effects start after the turn.
- Pages that are waiting or turning show a bitmap snapshot of their scene (`js/engine/raster.js`), so a turn never waits for the phone to paint a big SVG tile by tile. Once a page settles, the live animated scene takes over and the snapshot fades out. The paper textures and painted-edge masks are also turned into PNGs once at startup.

Pictures can be code-drawn SVG scenes, image files, or both. To use a painted picture, give the page an `illustration`:

```json
"illustration": { "src": "img/mermaid-city/kelp.png", "webp": "img/mermaid-city/kelp.webp", "width": 1600, "height": 1000, "focus": "50% 40%", "frame": "vignette" }
```

`frame` is `vignette` (soft painted edges, the default), `oval`, `torn` (ragged bottom edge) or `bleed` (plain box). The full page format is in `schema/story.schema.json`.

Book 2's story text uses a small markup so it can live in JSON: `{name}`, `{sfx:glub|GLUB!}`, `{say:…}`, `{pip:…}`, `{shout:…}`, `{huge:…}`, `{whisper:…}`, `{b:…}`, and a paragraph of just `{divider}`. Pages can also have `chapter`, `pickup` and `ocarina` fields (documented at the top of the story file).

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
