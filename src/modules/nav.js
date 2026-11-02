import { SECTIONS } from './render.js';

export function initNav(signal) {
  const header = document.querySelector('[data-header]');
  const menuBtn = document.querySelector('[data-action="toggle-menu"]');
  const links = [...document.querySelectorAll('.nav-link')];
  if (!header || !menuBtn) return;

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    header.toggleAttribute('data-menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? menuBtn.dataset.labelClose : menuBtn.dataset.labelOpen);
  }
  const isOpen = () => header.hasAttribute('data-menu-open');

  document.addEventListener(
    'click',
    (e) => {
      if (e.target.closest('[data-action="toggle-menu"]')) {
        setMenu(!isOpen());
      } else if (e.target.closest('.nav-link')) {
        setMenu(false);
      } else if (isOpen() && !e.target.closest('[data-header]')) {
        setMenu(false); 
      }
    },
    { signal },
  );

  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setMenu(false);
        menuBtn.focus();
      }
    },
    { signal },
  );

  const wide = window.matchMedia('(min-width: 768px)');
  wide.addEventListener('change', () => setMenu(false), { signal });

  /* ---------- Active section underline ---------- */
  const sections = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
  function setActive(id) {
    links.forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    const hero = document.getElementById('home');
    const heroObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(null),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    if (hero) heroObserver.observe(hero);
    signal.addEventListener('abort', () => {
      observer.disconnect();
      heroObserver.disconnect();
    });
  }

  /* ---------- Scroll progress bar + navbar shadow ---------- */
  const bar = document.querySelector('.scroll-progress span');
  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    if (bar) bar.style.transform = `scaleX(${progress})`;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true, signal },
  );
  window.addEventListener('resize', update, { passive: true, signal });
  update();
}
