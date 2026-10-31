// Restaurante Magalhães — interações partilhadas
document.documentElement.classList.add('js');

// Cabeçalho: sólido ao rolar
var cab = document.getElementById('cabecalho');
function aoRolar() { cab.classList.toggle('solido', window.scrollY > 40); }
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

// Menu móvel
var btnMenu = document.getElementById('btnMenu');
var btnFechar = document.getElementById('btnFechar');
var menu = document.getElementById('menuMovel');
function abrirMenu() {
  menu.hidden = false;
  btnMenu.setAttribute('aria-expanded', 'true');
  cab.classList.add('solido');
  btnFechar.focus();
}
function fecharMenu() {
  menu.hidden = true;
  btnMenu.setAttribute('aria-expanded', 'false');
  aoRolar();
  btnMenu.focus();
}
if (btnMenu) {
  btnMenu.addEventListener('click', abrirMenu);
  btnFechar.addEventListener('click', fecharMenu);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.hidden = true; }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) fecharMenu(); });
}

// Animações de entrada (respeita prefers-reduced-motion)
var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var alvos = document.querySelectorAll('.reveal');
if (!reduz && 'IntersectionObserver' in window && alvos.length) {
  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  alvos.forEach(function (el) { io.observe(el); });
} else {
  alvos.forEach(function (el) { el.classList.add('visivel'); });
}
