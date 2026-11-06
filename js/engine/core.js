/* Shared namespace. Every other script adds to window.SB, so plain <script defer> tags work
   both on GitHub Pages and when index.html is opened straight from disk (ES modules don't). */
(function () {
  const SB = window.SB = {
    books: [],
    themes: {},

    /** Add a book. See js/books/sparkle-swords.js for the shape. */
    registerBook(book) {
      if (!book || !book.id || !Array.isArray(book.pages)) throw new Error('registerBook needs an id and pages');
      book.order = book.order ?? SB.books.length;
      SB.books.push(book);
      SB.books.sort((a, b) => a.order - b.order);
      return book;
    },
    getBook(id) { return SB.books.find(b => b.id === id); },

    /** Add a world theme: a set of CSS custom properties applied to the whole reader. */
    registerTheme(id, theme) { SB.themes[id] = theme; },
  };

  SB.prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Bedtime mode (the moon button): dimmer, warmer pages, quiet soft sounds, nothing bouncing or sparkling.
  SB.bedtime = false;
  // Decorative motion (backdrop drift, sparkles, bobbing) stays still in bedtime mode or with reduced motion.
  SB.calm = () => SB.bedtime || SB.prefersReducedMotion();
  /* ---------- Who's reading aloud ----------
     Page text can say {Reader} ("Daddy" or "Mommy"), {he}/{He} and {his}/{His} for that grown-up,
     and {reader-choice} for the Daddy / Mommy switch. They're filled in each time a page is drawn. */
  SB.READERS = {
    daddy: { Reader: 'Daddy', he: 'he', He: 'He', his: 'his', His: 'His' },
    mommy: { Reader: 'Mommy', he: 'she', He: 'She', his: 'her', His: 'Her' },
  };
  SB.reader = 'daddy';
  SB.words = str => {
    if (!str || !str.includes('{')) return str;
    const r = SB.READERS[SB.reader] || SB.READERS.daddy;
    return str
      .replace(/\{reader-choice\}/g, () => `<div class="reader-choice" role="group" aria-label="Who's reading?"><span class="reader-q">Who's reading?</span>` +
        Object.entries(SB.READERS).map(([id, w]) => `<button type="button" class="reader-btn" data-action="reader" data-reader="${id}" aria-pressed="${id === SB.reader}">${w.Reader}</button>`).join('') + `</div>`)
      .replace(/\{(Reader|he|He|his|His)\}/g, (m, k) => r[k]);
  };
  SB.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
})();
