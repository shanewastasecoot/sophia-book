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
  SB.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
})();
