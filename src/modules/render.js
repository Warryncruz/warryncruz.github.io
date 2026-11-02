import { t, tList, format } from './i18n.js';
import { esc, asset, slug } from './utils.js';
import { icon } from './icons.js';

export const SECTIONS = ['about', 'journey', 'projects', 'skills', 'certificates', 'contact'];

function extLink(href, inner, className, data, lang) {
  return `<a class="${className}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${inner}<span class="sr-only"> ${esc(t(data.ui.projects.opensNewTab, lang))}</span></a>`;
}

function sectionHead(id, title, lede) {
  return `
    <div class="section-head reveal">
      <h2 id="${id}-title" class="section-title"><span class="gradient-text">${esc(title)}</span></h2>
      ${lede ? `<p class="section-lede">${esc(lede)}</p>` : ''}
    </div>`;
}

/* ---------------- Header / navbar ---------------- */
export function renderHeader(data, lang) {
  const { ui, profile, site } = data;
  const links = SECTIONS.map(
    (id) => `<li><a class="nav-link" href="#${id}" data-section="${id}">${esc(t(ui.nav[id], lang))}</a></li>`,
  ).join('');

  const langButton =
    site.languages.length > 1
      ? `<button type="button" class="icon-btn lang-btn" data-action="toggle-lang" lang="${lang === 'en' ? 'tl' : 'en'}">
           ${icon('language')}<span class="lang-btn-text">${lang === 'en' ? 'TL' : 'EN'}</span>
           <span class="sr-only">${esc(t(ui.langSwitch, lang))}</span>
         </button>`
      : '';

  return `
  <a class="skip-link" href="#main">${esc(t(ui.skip, lang))}</a>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>
  <header class="site-header" data-header>
    <nav class="nav container" aria-label="Primary">
      <a class="brand" href="#home" aria-label="${esc(profile.name)}, home">
        <span class="brand-mark" aria-hidden="true">${esc(profile.initials)}</span>
        <span class="brand-name">${esc(profile.name)}</span>
      </a>
      <ul class="nav-links" id="nav-menu">${links}</ul>
      <div class="nav-actions">
        ${langButton}
        <button type="button" class="icon-btn theme-btn" data-action="toggle-theme"
          data-label-dark="${esc(t(ui.themeToDark, lang))}" data-label-light="${esc(t(ui.themeToLight, lang))}"
          aria-label="${esc(t(ui.themeToDark, lang))}">
          <span class="theme-icon-sun">${icon('sun')}</span><span class="theme-icon-moon">${icon('moon')}</span>
        </button>
        <button type="button" class="icon-btn menu-btn" data-action="toggle-menu" aria-controls="nav-menu" aria-expanded="false"
          data-label-open="${esc(t(ui.menuOpen, lang))}" data-label-close="${esc(t(ui.menuClose, lang))}"
          aria-label="${esc(t(ui.menuOpen, lang))}">
          <span class="menu-icon-open">${icon('menu')}</span><span class="menu-icon-close">${icon('close')}</span>
        </button>
      </div>
    </nav>
  </header>`;
}

/* ---------------- 1. Hero ---------------- */
function renderHero(data, lang, base) {
  const { profile, ui, site } = data;
  const phrases = tList(profile.headlines, lang);
  const availability = t(profile.availability, lang);

  return `
  <section id="home" class="hero" aria-labelledby="hero-title">
    <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="dot-grid" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        ${availability ? `<p class="badge hero-in" style="--i:0"><span class="badge-dot" aria-hidden="true"></span>${esc(availability)}</p>` : ''}
        <h1 id="hero-title" class="hero-title hero-in" style="--i:1">
          <span class="hero-greeting">${esc(t(ui.hero.greeting, lang))}</span>
          <span class="gradient-text hero-name">${esc(profile.name)}</span>
        </h1>
        <p class="typer hero-in" style="--i:2">
          <span class="sr-only">${esc(phrases.join(' '))}</span>
          <span class="typer-visible" aria-hidden="true"><span class="typer-text" data-phrases="${esc(JSON.stringify(phrases))}">${esc(phrases[0] || '')}</span><span class="typer-caret"></span></span>
        </p>
        <p class="hero-sub hero-in" style="--i:3">
          ${esc(t(profile.yearLevel, lang))} ${esc(profile.course)}, ${esc(profile.school)}.
          ${esc(t(profile.title, lang))}.
        </p>
        <div class="hero-actions hero-in" style="--i:4">
          <a class="btn btn-primary" href="#projects">${esc(t(ui.hero.viewProjects, lang))}</a>
          <a class="btn btn-ghost" href="#contact">${esc(t(ui.hero.contact, lang))}</a>
          <a class="btn btn-ghost" href="${esc(asset(site.resume, base))}" download>${icon('download')}${esc(t(ui.hero.resume, lang))}</a>
        </div>
      </div>
      <div class="hero-photo hero-in" style="--i:2">
        <div class="photo-float">
          <div class="halo" aria-hidden="true"></div>
          <img src="${esc(asset(profile.photo, base))}" alt="${esc(t(profile.photoAlt, lang))}"
               width="560" height="560" fetchpriority="high" decoding="async">
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------------- 2. About ---------------- */
function renderAbout(data, lang) {
  const { profile, ui, stats } = data;
  const paragraphs = tList(profile.bio, lang)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('');

  const facts = [
    [ui.about.studying, `${t(profile.course, lang)}, ${t(profile.yearLevel, lang)}`],
    [ui.about.school, t(profile.school, lang)],
    [ui.about.basedIn, t(profile.location, lang)],
    [ui.about.lookingFor, t(profile.lookingFor, lang)],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<div><dt>${esc(t(label, lang))}</dt><dd>${esc(value)}</dd></div>`)
    .join('');

  const statCards = stats
    .map(
      (s, i) => `
      <li class="stat glass spotlight lift reveal" style="--i:${i}">
        <span class="stat-value"><span class="count" data-to="${Number(s.value) || 0}">${Number(s.value) || 0}</span>${esc(s.suffix || '')}</span>
        <span class="stat-label">${esc(t(s.label, lang))}</span>
      </li>`,
    )
    .join('');

  return `
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container">
      ${sectionHead('about', t(ui.about.title, lang), t(ui.about.lede, lang))}
      <div class="about-grid">
        <div class="about-bio reveal">${paragraphs}</div>
        <dl class="about-facts glass reveal" style="--i:1">${facts}</dl>
      </div>
      <ul class="stats-grid" role="list">${statCards}</ul>
    </div>
  </section>`;
}

/* ---------------- 3. Education and journey (timeline) ---------------- */
function renderJourney(data, lang) {
  const { timeline, ui } = data;
  const items = timeline
    .map(
      (item, i) => `
      <li class="tl-item reveal" style="--i:${i}">
        <span class="tl-dot ${item.current ? 'is-current' : ''}" aria-hidden="true"></span>
        <div class="tl-card glass spotlight">
          <div class="tl-meta">
            <span class="tag tag-${esc(item.type)}">${esc(t(ui.journey.types[item.type] || item.type, lang))}</span>
            <span class="tl-date">${esc(t(item.date, lang))}</span>
          </div>
          <h3 class="tl-title">${esc(t(item.title, lang))}</h3>
          ${item.org ? `<p class="tl-org">${esc(t(item.org, lang))}</p>` : ''}
          ${item.description ? `<p class="tl-desc">${esc(t(item.description, lang))}</p>` : ''}
        </div>
      </li>`,
    )
    .join('');

  return `
  <section id="journey" class="section" aria-labelledby="journey-title">
    <div class="container">
      ${sectionHead('journey', t(ui.journey.title, lang), t(ui.journey.lede, lang))}
      <ol class="timeline" role="list">${items}</ol>
    </div>
  </section>`;
}

/* ---------------- 4. Projects ---------------- */
export function sortedProjects(projects) {
  return [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

function projectActions(p, data, lang) {
  const { ui } = data;
  return [
    p.demo ? extLink(p.demo, `${icon('external')}${esc(t(ui.projects.demo, lang))}`, 'btn btn-small btn-primary', data, lang) : '',
    p.code ? extLink(p.code, `${icon('code')}${esc(t(ui.projects.code, lang))}`, 'btn btn-small btn-ghost', data, lang) : '',
  ].join('');
}

function renderProjects(data, lang, base) {
  const { projects, ui } = data;
  const list = sortedProjects(projects);
  const categories = [...new Set(list.flatMap((p) => p.category || []))];

  const filters = [`<button type="button" class="chip-btn" data-filter="all" aria-pressed="true">${esc(t(ui.projects.all, lang))}</button>`]
    .concat(categories.map((c) => `<button type="button" class="chip-btn" data-filter="${esc(slug(c))}" aria-pressed="false">${esc(c)}</button>`))
    .join('');

  const cards = list
    .map((p, i) => {
      const cats = (p.category || []).map(slug).join(' ');
      return `
      <li class="project-card glass spotlight lift reveal" style="--i:${i % 3}" data-categories="${esc(cats)}">
        <figure class="project-media">
          <img src="${esc(asset(p.image, base))}" alt="${esc(t(p.imageAlt, lang))}" width="1200" height="750" loading="lazy" decoding="async">
          ${p.featured ? `<span class="featured-label">${esc(t(ui.projects.featured, lang))}</span>` : ''}
        </figure>
        <div class="project-body">
          <p class="project-meta">${esc((p.category || []).join(', '))}${p.year ? `, ${esc(p.year)}` : ''}</p>
          <h3 class="project-title">${esc(p.title)}</h3>
          <p class="project-summary">${esc(t(p.summary, lang))}</p>
          <ul class="tech-list" role="list" aria-label="${esc(t(ui.projects.built, lang))}">
            ${(p.tech || []).map((x) => `<li>${esc(x)}</li>`).join('')}
          </ul>
          <div class="project-actions">
            <button type="button" class="btn btn-small btn-soft" data-project="${esc(p.id)}" aria-haspopup="dialog">
              ${icon('info')}${esc(t(ui.projects.details, lang))}<span class="sr-only">: ${esc(p.title)}</span>
            </button>
            ${projectActions(p, data, lang)}
          </div>
        </div>
      </li>`;
    })
    .join('');

  return `
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      ${sectionHead('projects', t(ui.projects.title, lang), t(ui.projects.lede, lang))}
      ${categories.length > 1 ? `<div class="filters reveal" role="group" aria-label="${esc(t(ui.projects.filterLabel, lang))}">${filters}</div>` : ''}
      <p class="sr-only" role="status" data-project-status></p>
      <ul class="projects-grid" role="list">${cards}</ul>
    </div>
  </section>`;
}

export function renderProjectDetail(p, data, lang, base) {
  const { ui } = data;
  const learned = tList(p.learned, lang);
  return `
    <img class="dialog-media" src="${esc(asset(p.image, base))}" alt="${esc(t(p.imageAlt, lang))}" width="1200" height="750">
    <div class="dialog-body">
      <p class="project-meta">${esc((p.category || []).join(', '))}${p.year ? `, ${esc(p.year)}` : ''}</p>
      <h2 id="project-dialog-title" class="dialog-title">${esc(p.title)}</h2>
      <p class="dialog-text">${esc(t(p.description || p.summary, lang))}</p>
      <dl class="dialog-facts">
        ${p.role ? `<div><dt>${esc(t(ui.projects.role, lang))}</dt><dd>${esc(t(p.role, lang))}</dd></div>` : ''}
        <div><dt>${esc(t(ui.projects.built, lang))}</dt><dd><ul class="tech-list" role="list">${(p.tech || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></dd></div>
      </dl>
      ${
        learned.length
          ? `<h3 class="dialog-subtitle">${esc(t(ui.projects.learned, lang))}</h3>
             <ul class="learned-list">${learned.map((l) => `<li>${icon('check')}<span>${esc(l)}</span></li>`).join('')}</ul>`
          : ''
      }
      <div class="project-actions">${projectActions(p, data, lang)}</div>
    </div>`;
}

/* ---------------- 5. Skills ---------------- */
function renderSkills(data, lang) {
  const { skills, ui } = data;
  const groups = skills
    .map(
      (g, i) => `
      <div class="skill-group glass spotlight reveal" style="--i:${i}">
        <h3 class="skill-title">${esc(t(g.group, lang))}</h3>
        <ul class="skill-chips" role="list">${g.items.map((s) => `<li class="skill-chip">${esc(t(s, lang))}</li>`).join('')}</ul>
      </div>`,
    )
    .join('');

  return `
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="container">
      ${sectionHead('skills', t(ui.skills.title, lang), t(ui.skills.lede, lang))}
      <div class="skills-grid">${groups}</div>
    </div>
  </section>`;
}

/* ---------------- 6. Certifications and achievements ---------------- */
function renderCertificates(data, lang, base) {
  const { certifications, achievements, ui } = data;

  const certCards = certifications
    .map((c, i) => {
      const title = t(c.title, lang);
      return `
      <li class="cert-card glass spotlight lift reveal" style="--i:${i % 4}">
        <button type="button" class="cert-thumb" data-lightbox="${esc(asset(c.image, base))}" data-caption="${esc(`${title}, ${t(c.issuer, lang)}`)}">
          <img src="${esc(asset(c.image, base))}" alt="" width="1200" height="848" loading="lazy" decoding="async">
          <span class="cert-zoom" aria-hidden="true">${icon('expand')}</span>
          <span class="sr-only">${esc(t(ui.certificates.enlarge, lang))} ${esc(title)}</span>
        </button>
        <div class="cert-body">
          <h3 class="cert-title">${esc(title)}</h3>
          <p class="cert-issuer">${esc(t(c.issuer, lang))}${c.date ? `, ${esc(t(c.date, lang))}` : ''}</p>
          ${c.url ? extLink(c.url, `${esc(t(ui.certificates.verify, lang))}${icon('external')}`, 'text-link', data, lang) : ''}
        </div>
      </li>`;
    })
    .join('');

  const achievementCards = achievements
    .map((a, i) => {
      const title = t(a.title, lang);
      const thumb = a.image
        ? `<button type="button" class="ach-thumb" data-lightbox="${esc(asset(a.image, base))}" data-caption="${esc(title)}">
             <img src="${esc(asset(a.image, base))}" alt="" width="1200" height="848" loading="lazy" decoding="async">
             <span class="sr-only">${esc(t(ui.certificates.enlarge, lang))} ${esc(title)}</span>
           </button>`
        : '';
      return `
      <li class="ach-card glass spotlight lift reveal" style="--i:${i % 3}">
        ${thumb}
        <div>
          <h4 class="ach-title">${esc(title)}</h4>
          <p class="ach-meta">${esc(t(a.org, lang))}${a.date ? `, ${esc(t(a.date, lang))}` : ''}</p>
          ${a.description ? `<p class="ach-desc">${esc(t(a.description, lang))}</p>` : ''}
        </div>
      </li>`;
    })
    .join('');

  return `
  <section id="certificates" class="section" aria-labelledby="certificates-title">
    <div class="container">
      ${sectionHead('certificates', t(ui.certificates.title, lang), t(ui.certificates.lede, lang))}
      <ul class="cert-grid" role="list">${certCards}</ul>
      ${
        achievements.length
          ? `<h3 class="sub-title reveal">${esc(t(ui.certificates.achievementsTitle, lang))}</h3>
             <ul class="ach-grid" role="list">${achievementCards}</ul>`
          : ''
      }
    </div>
  </section>`;
}

/* ---------------- 7. Contact ---------------- */
function renderContact(data, lang) {
  const { profile, ui, site } = data;
  const socials = profile.socials
    .map((s) => extLink(s.url, `${icon(s.icon)}<span>${esc(s.label)}</span>`, 'social-link', data, lang))
    .join('');

  return `
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="container contact-grid">
      <div class="contact-info">
        ${sectionHead('contact', t(ui.contact.title, lang), t(ui.contact.lede, lang))}
        <div class="email-row reveal">
          <a class="email-link" href="mailto:${esc(profile.email)}">${icon('mail')}<span>${esc(profile.email)}</span></a>
          <button type="button" class="icon-btn" data-action="copy-email" data-email="${esc(profile.email)}" aria-label="${esc(t(ui.contact.copyEmail, lang))}">
            <span class="copy-icon">${icon('copy')}</span><span class="copied-icon">${icon('check')}</span>
          </button>
          <span class="copy-status" role="status" aria-live="polite"></span>
        </div>
        ${profile.phone ? `<p class="reveal"><a class="email-link" href="tel:${esc(profile.phone.replace(/\s+/g, ''))}">${icon('phone')}<span>${esc(profile.phone)}</span></a></p>` : ''}
        <h3 class="sub-title small reveal">${esc(t(ui.contact.elsewhere, lang))}</h3>
        <div class="socials reveal">${socials}</div>
      </div>

      <form class="contact-form glass reveal" style="--i:1" data-contact-form novalidate
            action="${site.formspreeId ? `https://formspree.io/f/${esc(site.formspreeId)}` : `mailto:${esc(profile.email)}`}" method="POST">
        <div class="field">
          <label for="cf-name">${esc(t(ui.contact.name, lang))}</label>
          <input id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-error">
          <p class="field-error" id="cf-name-error" data-error-for="name" data-message="${esc(t(ui.contact.errName, lang))}"></p>
        </div>
        <div class="field">
          <label for="cf-email">${esc(t(ui.contact.email, lang))}</label>
          <input id="cf-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="cf-email-error">
          <p class="field-error" id="cf-email-error" data-error-for="email" data-message="${esc(t(ui.contact.errEmail, lang))}"></p>
        </div>
        <div class="field">
          <label for="cf-message">${esc(t(ui.contact.message, lang))}</label>
          <textarea id="cf-message" name="message" rows="5" required minlength="10" aria-describedby="cf-message-error"></textarea>
          <p class="field-error" id="cf-message-error" data-error-for="message" data-message="${esc(t(ui.contact.errMessage, lang))}"></p>
        </div>
        <!-- Spam trap: humans never see or fill this field. -->
        <div class="hp" aria-hidden="true">
          <label for="cf-company">Company</label>
          <input id="cf-company" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
        </div>
        <button type="submit" class="btn btn-primary btn-block" data-label="${esc(t(ui.contact.send, lang))}" data-sending="${esc(t(ui.contact.sending, lang))}">
          ${esc(t(ui.contact.send, lang))}
        </button>
        <p class="form-status" role="status" aria-live="polite" data-form-status
           data-sent="${esc(t(ui.contact.sent, lang))}" data-failed="${esc(t(ui.contact.failed, lang))}"
           data-not-configured="${esc(t(ui.contact.notConfigured, lang))}"></p>
      </form>
    </div>
  </section>`;
}

/* ---------------- 8. Footer ---------------- */
export function renderFooter(data, lang) {
  const { profile, ui } = data;
  return `
    <div class="container footer-inner">
      <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(profile.name)}. ${esc(t(ui.footer.built, lang))}</p>
      <a class="btn btn-small btn-ghost" href="#home" data-action="to-top">${icon('arrowUp')}${esc(t(ui.footer.top, lang))}</a>
    </div>`;
}

/* ---------------- Dialogs (project details + image lightbox) ---------------- */
export function renderDialogs(data, lang) {
  const { ui } = data;
  return `
  <dialog class="dialog project-dialog" id="project-dialog" aria-labelledby="project-dialog-title">
    <button type="button" class="icon-btn dialog-close" data-action="close-dialog" aria-label="${esc(t(ui.projects.close, lang))}">${icon('close')}</button>
    <div class="dialog-content" data-dialog-content></div>
  </dialog>
  <dialog class="dialog lightbox" id="lightbox" aria-label="${esc(t(ui.certificates.title, lang))}">
    <button type="button" class="icon-btn dialog-close" data-action="close-dialog" aria-label="${esc(t(ui.projects.close, lang))}">${icon('close')}</button>
    <figure class="lightbox-figure">
      <img data-lightbox-img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="">
      <figcaption data-lightbox-caption></figcaption>
    </figure>
    <button type="button" class="icon-btn lightbox-nav prev" data-action="lightbox-prev" aria-label="${esc(t(ui.certificates.prev, lang))}">${icon('chevronLeft')}</button>
    <button type="button" class="icon-btn lightbox-nav next" data-action="lightbox-next" aria-label="${esc(t(ui.certificates.next, lang))}">${icon('chevronRight')}</button>
  </dialog>`;
}

/* ---------------- The whole page ---------------- */
export function renderMain(data, lang, base = '/') {
  return [
    renderHero(data, lang, base),
    renderAbout(data, lang),
    renderJourney(data, lang),
    renderProjects(data, lang, base),
    renderSkills(data, lang),
    renderCertificates(data, lang, base),
    renderContact(data, lang),
  ].join('\n');
}

export function renderPage(data, lang, base = '/') {
  return {
    header: renderHeader(data, lang),
    main: renderMain(data, lang, base),
    footer: renderFooter(data, lang),
    dialogs: renderDialogs(data, lang),
  };
}
