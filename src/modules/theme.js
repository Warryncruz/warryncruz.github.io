const KEY = 'theme';
const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function savedTheme() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function currentTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function syncToggle() {
  const btn = document.querySelector('[data-action="toggle-theme"]');
  if (!btn) return;
  const label = currentTheme() === 'dark' ? btn.dataset.labelLight : btn.dataset.labelDark;
  btn.setAttribute('aria-label', label);
}

export function applyTheme(theme, { animate = false } = {}) {
  if (animate) {
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 350);
  }
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#090B1A' : '#F6F7FB');
  syncToggle();
}

export function watchSystemTheme() {
  systemDark.addEventListener('change', (e) => {
    if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light', { animate: true });
  });
}

export function initThemeToggle(signal) {
  syncToggle();
  document.addEventListener(
    'click',
    (e) => {
      if (!e.target.closest('[data-action="toggle-theme"]')) return;
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, next);
      } catch {
      }
      applyTheme(next, { animate: true });
    },
    { signal },
  );
}
