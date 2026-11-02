import { prefersReducedMotion } from './utils.js';

function initReveal(signal) {
  const items = [...document.querySelectorAll('.reveal:not(.is-visible)')];
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => observer.observe(el));
  signal.addEventListener('abort', () => observer.disconnect());
}

/* ---------- Count-up numbers in the About stat cards ---------- */
function initCounters(signal) {
  const counters = [...document.querySelectorAll('.count[data-to]')];
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return; 

  const animate = (el) => {
    const target = Number(el.dataset.to) || 0;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); 
      el.textContent = String(Math.round(target * eased));
      if (p < 1 && !signal.aborted) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) el.textContent = '0';
    observer.observe(el);
  });
  signal.addEventListener('abort', () => observer.disconnect());
}

/* ---------- Typing headline in the hero ---------- */
function initTyper(signal) {
  const el = document.querySelector('.typer-text');
  if (!el) return;
  let phrases = [];
  try {
    phrases = JSON.parse(el.dataset.phrases || '[]');
  } catch {
  }
  if (phrases.length < 2 || prefersReducedMotion()) return;

  let phrase = 0;
  let chars = phrases[0].length;
  let deleting = true;
  let timer;

  const tick = () => {
    if (signal.aborted) return;
    if (deleting) {
      chars -= 1;
      if (chars <= 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
      }
    } else {
      chars += 1;
    }
    el.textContent = phrases[phrase].slice(0, Math.max(chars, 0)) || '​';

    let delay = deleting ? 35 : 70;
    if (!deleting && chars >= phrases[phrase].length) {
      deleting = true;
      delay = 2200; 
    }
    if (deleting && chars <= 0) delay = 300;
    timer = window.setTimeout(tick, delay);
  };

  timer = window.setTimeout(tick, 2600); 
  signal.addEventListener('abort', () => window.clearTimeout(timer));
}

/* ---------- Mouse-follow spotlight glow on .spotlight cards ---------- */
function initSpotlight(signal) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let frame = 0;
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = e.target.closest?.('.spotlight');
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    },
    { passive: true, signal },
  );
}

export function initAnimations(signal) {
  initReveal(signal);
  initCounters(signal);
  initTyper(signal);
  initSpotlight(signal);
}
