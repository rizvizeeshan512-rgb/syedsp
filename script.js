(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('open', open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('open');
      }
    });
  }
  const page = document.body.dataset.page;
  const current = document.querySelector(`.main-nav a[href="${page === 'home' ? 'index' : page}.html"]`);
  if (current) current.setAttribute('aria-current', 'page');
  const backdrop = document.querySelector('.hero-image');
  const dots = [...document.querySelectorAll('.hero-dot')];
  if (!backdrop || dots.length < 2) return;
  let active = 0, timer;
  const show = index => {
    active = index;
    backdrop.classList.remove('slide-1', 'slide-2');
    if (index) backdrop.classList.add(`slide-${index}`);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };
  const start = () => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      timer = setInterval(() => show((active + 1) % dots.length), 6500);
  };
  dots.forEach(dot => dot.addEventListener('click', () => {
    clearInterval(timer); show(Number(dot.dataset.slide)); start();
  }));
  start();
})();
