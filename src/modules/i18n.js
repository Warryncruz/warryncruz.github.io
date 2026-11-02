const STORAGE_KEY = 'lang';

export function t(value, lang = 'en') {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map((v) => t(v, lang));
  if (typeof value === 'object') {
    if (lang in value) return value[lang];
    if ('en' in value) return value.en;
  }
  return '';
}

export function tList(value, lang = 'en') {
  const out = t(value, lang);
  if (Array.isArray(out)) return out;
  return out ? [out] : [];
}

export function format(text, vars = {}) {
  return String(text).replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`));
}

export function getLang(site) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && site.languages.includes(saved)) return saved;
  } catch {
  }
  return site.defaultLang;
}

export function saveLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
  }
}
