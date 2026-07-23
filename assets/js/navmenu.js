/* Vanilla mobile nav toggle — independent of jQuery/Bootstrap JS.
   Toggles .pf-open on the navbar collapse. */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var toggler = document.querySelector('#navbar .navbar-toggler');
    var collapse = document.querySelector('#navbar .navbar-collapse');
    if (!toggler || !collapse) return;
    toggler.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      collapse.classList.toggle('pf-open');
    });
    collapse.querySelectorAll('.nav-link').forEach(function (a) {
      a.addEventListener('click', function () { collapse.classList.remove('pf-open'); });
    });
    document.addEventListener('click', function (e) {
      if (collapse.classList.contains('pf-open') && !collapse.contains(e.target) && !toggler.contains(e.target)) {
        collapse.classList.remove('pf-open');
      }
    });
  });
})();
