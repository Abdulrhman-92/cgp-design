/**
 * post/js/post.js — "The Dossier" page behaviors (single-post layout only).
 * 1. Reading progress: fixed top hairline (scaleX) + rail % text.
 * 2. Scrollspy: highlight the INDEX entry for the section in view.
 * No dependencies; rAF-throttled; passive listeners.
 */
(function () {
  'use strict';

  var bar = document.getElementById('post-progress-fill');
  var pct = document.getElementById('post-progress-pct');
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('[data-post-toc] a'));
  var sections = tocLinks
    .map(function (a) { return document.getElementById((a.getAttribute('href') || '').slice(1)); })
    .filter(Boolean);
  var ticking = false;

  function updateProgress() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
    if (pct) pct.textContent = Math.round(p * 100) + '%';
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // Scrollspy — the section crossing the upper third of the viewport wins.
  if ('IntersectionObserver' in window && tocLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();