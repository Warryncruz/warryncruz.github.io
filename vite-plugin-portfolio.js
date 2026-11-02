import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function freshImport(root, relPath) {
  const url = pathToFileURL(path.resolve(root, relPath)).href;
  return import(`${url}?t=${Date.now()}`);
}

function escAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const trimSlash = (url) => String(url || '').replace(/\/+$/, '');

function headTags(data, t, base, { notFound = false } = {}) {
  const { site, profile, ui } = data;
  const lang = site.defaultLang;
  const siteUrl = trimSlash(site.url);
  const role = t(profile.title, lang);
  const title = notFound ? `${t(ui.notFound.title, lang)} | ${profile.name}` : `${profile.name} | ${role}`;
  const description = notFound
    ? t(ui.notFound.body, lang)
    : `${profile.name}: ${t(profile.yearLevel, lang)} ${profile.course} student at ${profile.school}. ${role}. ${t(profile.availability, lang)}.`
        .replace(/\.\./g, '.')
        .slice(0, 300);
  const ogImage = `${siteUrl}/${site.ogImage}`;
  const favicon = (file) => `${base}${file}`;

  const tags = [
    `<title>${escAttr(title)}</title>`,
    `<meta name="description" content="${escAttr(description)}">`,
    `<meta name="author" content="${escAttr(profile.name)}">`,
    `<meta name="theme-color" content="#F6F7FB">`,
    `<link rel="icon" href="${favicon('favicon.png')}" type="image/png">`,
    `<link rel="apple-touch-icon" href="${favicon('favicon.png')}">`,
  ];

  if (notFound) {
    tags.push('<meta name="robots" content="noindex">');
    return tags.join('\n    ');
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${siteUrl}/`,
    image: `${siteUrl}/${profile.photo}`,
    jobTitle: role,
    description,
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.school },
    knowsAbout: data.skills.flatMap((g) => g.items.map((s) => t(s, lang))).slice(0, 20),
    sameAs: profile.socials.map((s) => s.url),
    ...(profile.email ? { email: `mailto:${profile.email}` } : {}),
  };
  const jsonLd = JSON.stringify(personSchema).replace(/</g, '\\u003c');

  tags.push(
    `<link rel="canonical" href="${escAttr(siteUrl)}/">`,
    `<meta property="og:type" content="profile">`,
    `<meta property="og:site_name" content="${escAttr(profile.name)}">`,
    `<meta property="og:title" content="${escAttr(title)}">`,
    `<meta property="og:description" content="${escAttr(description)}">`,
    `<meta property="og:url" content="${escAttr(siteUrl)}/">`,
    `<meta property="og:image" content="${escAttr(ogImage)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escAttr(`${profile.name}, ${role}`)}">`,
    `<meta property="og:locale" content="${lang === 'tl' ? 'tl_PH' : 'en_US'}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escAttr(title)}">`,
    `<meta name="twitter:description" content="${escAttr(description)}">`,
    `<meta name="twitter:image" content="${escAttr(ogImage)}">`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  );
  return tags.join('\n    ');
}

function bootScript(site) {
  const langs = JSON.stringify(site.languages);
  const def = JSON.stringify(site.defaultLang);
  return `<script>
    (function () {
      var d = document.documentElement, theme, lang;
      d.classList.add('js');
      try { theme = localStorage.getItem('theme'); lang = localStorage.getItem('lang'); } catch (e) {}
      if (theme !== 'light' && theme !== 'dark') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      d.setAttribute('data-theme', theme);
      d.style.colorScheme = theme;
      if (lang && lang !== ${def} && ${langs}.indexOf(lang) > -1) {
        d.classList.add('i18n-pending');
        setTimeout(function () { d.classList.remove('i18n-pending'); }, 2500);
      }
    })();
  </script>`;
}

function notFoundBody(data, t, base) {
  const { ui, profile } = data;
  const lang = data.site.defaultLang;
  return `
    <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="dot-grid" aria-hidden="true"></div>
    <div class="container nf-inner">
      <p class="nf-code gradient-text" aria-hidden="true">404</p>
      <h1 class="nf-title">${escAttr(t(ui.notFound.title, lang))}</h1>
      <p class="nf-text">${escAttr(t(ui.notFound.body, lang))}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${base}">${escAttr(t(ui.notFound.home, lang))}</a>
        <a class="btn btn-ghost" href="${base}#contact">${escAttr(t(ui.nav.contact, lang))}</a>
      </div>
      <p class="nf-sign">${escAttr(profile.name)}</p>
    </div>`;
}

export default function portfolio() {
  let root = process.cwd();
  let base = '/';

  return {
    name: 'portfolio-site',

    configResolved(config) {
      root = config.root;
      base = config.base;
    },

    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        const { default: data } = await freshImport(root, 'src/data.js');
        const { renderPage } = await freshImport(root, 'src/modules/render.js');
        const { t } = await freshImport(root, 'src/modules/i18n.js');
        const lang = data.site.defaultLang;
        const isNotFound = (ctx.filename || ctx.path || '').replace(/\\/g, '/').endsWith('404.html');

        let out = html
          .replace('<!--head:boot-->', bootScript(data.site))
          .replace('<!--head:meta-->', headTags(data, t, base, { notFound: isNotFound }))
          .replace('<!--html:lang-->', lang);

        if (isNotFound) {
          return out.replace('<!--ssr:404-->', notFoundBody(data, t, base));
        }

        const page = renderPage(data, lang, base);
        return out
          .replace('<!--ssr:header-->', page.header)
          .replace('<!--ssr:main-->', page.main)
          .replace('<!--ssr:footer-->', page.footer)
          .replace('<!--ssr:dialogs-->', page.dialogs);
      },
    },

    async generateBundle() {
      const { default: data } = await freshImport(root, 'src/data.js');
      const siteUrl = trimSlash(data.site.url);
      if (/your-username/.test(siteUrl)) {
        this.warn('site.url in src/data.js is still the placeholder. Update it so SEO tags and sitemap.xml point to your real site.');
      }
      const today = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export { headTags, bootScript, notFoundBody };
