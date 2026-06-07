// site.js — shared header injection for mysticscards.space
// Add a new page to the nav by editing NAV only. No other file needs touching.
(function () {
  'use strict';

  // ── Nav links — edit here to add/rename pages ────────────────────
  var NAV = [
    { href: 'quadration.html', label: 'Card of Life'  },
    { href: 'calculator.html', label: 'Calculator'    },
    { href: 'iching.html',     label: 'I Ching'       },
  ];
  // ────────────────────────────────────────────────────────────────

  var page = window.location.pathname.split('/').pop() || 'index.html';

  var navHtml = NAV.map(function (l) {
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
})();
