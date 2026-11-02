import './style.css';
import data from './data.js';
import { t, getLang, saveLang } from './modules/i18n.js';
import { renderPage } from './modules/render.js';
import { applyTheme, currentTheme, initThemeToggle, watchSystemTheme } from './modules/theme.js';
import { initNav } from './modules/nav.js';
import { initAnimations } from './modules/animations.js';
import { initProjects } from './modules/projects.js';
import { initLightbox } from './modules/lightbox.js';
import { initContact } from './modules/contact.js';

const BASE = import.meta.env.BASE_URL; 
const root = document.documentElement;
let lang = getLang(data.site);
let controller = null;

function mount(nextLang) {
  const html = renderPage(data, nextLang, BASE);
  document.getElementById('app-header').innerHTML = html.header;
  document.getElementById('main').innerHTML = html.main;
  document.getElementById('app-footer').innerHTML = html.footer;
  document.getElementById('app-dialogs').innerHTML = html.dialogs;
  root.lang = nextLang;
  document.title = `${data.profile.name} | ${t(data.profile.title, nextLang)}`;
}

function boot() {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  initThemeToggle(signal);
  initNav(signal);
  initAnimations(signal);
  initProjects(data, lang, BASE, signal);
  initLightbox(signal);
  initContact(data, lang, t, signal);

  document.addEventListener(
    'click',
    (e) => {
      if (!e.target.closest('[data-action="toggle-lang"]')) return;
      lang = lang === 'en' ? 'tl' : 'en';
      saveLang(lang);
      mount(lang);
      boot();
      document.querySelector('[data-action="toggle-lang"]')?.focus();
    },
    { signal },
  );
}

if (lang !== data.site.defaultLang) mount(lang);
root.classList.remove('i18n-pending');

applyTheme(currentTheme());
watchSystemTheme();
boot();
