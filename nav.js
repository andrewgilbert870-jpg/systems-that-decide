(function () {
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('header.nav');
  var drawer = document.getElementById('mobileNav');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('open');
    drawer.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    if (open) {
      var first = drawer.querySelector('a');
      if (first) first.focus();
    }
  });

  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      header.classList.remove('open');
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('open')) {
      header.classList.remove('open');
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.focus();
    }
  });
})();
