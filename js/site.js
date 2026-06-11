// site.js — shared header injection for mysticscards.space
// Add a new page to the nav by editing NAV only. No other file needs touching.
(function () {
  'use strict';

  // ── Nav links — edit here to add/rename pages ────────────────────
  var NAV = [
    { href: 'cardsoflife.html', label: 'Cards of Life' },
    { href: 'iching.html',      label: 'I Ching'       },
    { href: 'astrology.html',   label: 'Astrology'     },
    { heading: 'Tools' },
    { href: 'calculator.html',  label: 'Calculator'    },
    { href: 'quadrations.html', label: 'Quadrations'   },
    { href: 'hexagrams.html',   label: 'Hexagrams'     },
  ];
  // ────────────────────────────────────────────────────────────────

  var page = window.location.pathname.split('/').pop() || 'index.html';

  var navHtml = NAV.map(function (l) {
    if (l.heading) {
      return '<span class="nav-heading">' + l.heading + '</span>';
    }
    return '<a href="' + l.href + '"' +
      (page === l.href ? ' class="active"' : '') + '>' +
      l.label + '</a>';
  }).join('');

  var headerHtml =
    '<header class="site-header" id="siteHeader">' +
      '<div class="sh-inner">' +
        '<a href="index.html" class="sh-logo">mysticscards<span class="suit">.space</span></a>' +
        '<button class="burger" id="burgerBtn" aria-label="Menu" ' +
            'aria-expanded="false" aria-controls="shNav">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<nav class="sh-nav" id="shNav">' + navHtml + '</nav>' +
      '</div>' +
    '</header>';

  // Inject synchronously — header appears before any page content
  document.currentScript.insertAdjacentHTML('beforebegin', headerHtml);

  // Wire burger (elements exist now — injected above)
  var btn = document.getElementById('burgerBtn');
  var nav = document.getElementById('shNav');

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav on any click inside it (covers page links and any extra
  // buttons a page appends to #shNav after this script runs)
  nav.addEventListener('click', function () {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', function () {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  // Scroll shadow on the sticky header (.site-header.scrolled in site.css)
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Offline support — register the service worker (sw.js at site root).
  // Works on https and localhost; silently skipped elsewhere (e.g. file://).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* no-op */ });
    });
  }

  // ── Backup: export / import the site's saved data ─────────────────
  // One backup file covers every store (saved charts + saved readings),
  // whichever page it is exported from. Import MERGES by entry id, so
  // restoring an old file never deletes newer saves.
  var BACKUP_KEYS = ['astro_births_v1', 'iching_readings'];

  window.MCBackup = {
    export: function () {
      var out = { site: 'mysticscards.space', version: 1, exported: new Date().toISOString(), data: {} };
      BACKUP_KEYS.forEach(function (k) {
        try {
          var v = JSON.parse(localStorage.getItem(k));
          if (v) out.data[k] = v;
        } catch (e) {}
      });
      var stamp = out.exported.slice(0, 10).replace(/-/g, '');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' }));
      a.download = 'mysticscards-backup-' + stamp + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    },

    // import(file, done) → done(addedCount) or done(-1) on a bad file
    import: function (file, done) {
      var reader = new FileReader();
      reader.onload = function () {
        var added = 0;
        try {
          var parsed = JSON.parse(reader.result);
          var data = parsed && parsed.data ? parsed.data : null;
          if (!data) { done(-1); return; }
          BACKUP_KEYS.forEach(function (k) {
            var incoming = data[k];
            if (!Array.isArray(incoming)) return;
            var current = [];
            try { current = JSON.parse(localStorage.getItem(k)) || []; } catch (e) {}
            var have = {};
            current.forEach(function (x) { have[x.id] = true; });
            incoming.forEach(function (x) {
              if (x && x.id != null && !have[x.id]) { current.push(x); added++; }
            });
            try { localStorage.setItem(k, JSON.stringify(current)); } catch (e) {}
          });
          done(added);
        } catch (e) { done(-1); }
      };
      reader.onerror = function () { done(-1); };
      reader.readAsText(file);
    }
  };
})();
