# Student Portfolio

A fast, accessible one-page portfolio built with **Vite**, **vanilla JavaScript** and **Tailwind CSS v4**.
All of your content lives in **one file: `src/data.js`**. No backend, so it hosts free on GitHub Pages, Vercel or Netlify.

Features: aurora hero with a typing headline, light/dark mode (no flash), English/Tagalog switch, project filters with a detail dialog, certificate lightbox, count-up stats, timeline, a Formspree contact form, scroll progress bar, custom 404 page, and full SEO tags (Open Graph, Twitter card, JSON-LD, sitemap, robots.txt).

---

## 1. Run it on your computer

You need **Node.js 20.19 or newer** (check with `node -v`). Download it from https://nodejs.org if needed.

Open a terminal (on Windows: PowerShell or the VS Code terminal) in this folder and run:

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). The page reloads every time you save a file.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local preview while you edit |
| `npm run build` | Make the final site in the `dist/` folder |
| `npm run preview` | Preview the `dist/` build locally |

---

## 2. Edit your information (`src/data.js`)

Open `src/data.js` and search for **TODO**. Every placeholder is marked.

- **Plain text** can be a string: `title: 'Barangay Connect'`
- **Two languages**: `summary: { en: 'English text', tl: 'Tagalog text' }`. If `tl` is missing, English is shown.
- **Hide something**: set it to `''` (for example `demo: ''` hides the Live demo button, `phone: ''` hides the phone).
- **Add a project**: copy one `{ ... }` block in `projects`, paste it below, and change the values. Give it a unique `id`.
- **Filter buttons** are made automatically from each project's `category` list.
- **Featured projects** (`featured: true`) get a label and are shown first.
- **Stat cards** count projects and certificates automatically. The other numbers are yours to set.
- **English only?** Set `languages: ['en']` and the language button disappears.

You never need to edit the HTML. If you want to change layout, see `src/modules/render.js`. Colors and sizes are at the top of `src/style.css`.

---

## 3. Replace the images and resume

All files in `public/` are copied to your site as-is.

| File | Size that works best | Notes |
| --- | --- | --- |
| `public/images/profile.webp` | square, 560×560 or larger | Your photo |
| `public/images/projects/*.webp` | 1200×750 (16:10) | Screenshots. Other sizes are cropped to fit. |
| `public/images/certs/*.webp` | about 1200×848 | Scans or photos of certificates |
| `public/images/achievements/*.webp` | about 1200×848 | Optional |
| `public/resume.pdf` | any | Keep the name `resume.pdf`, or change `site.resume` in data.js |
| `public/og-image.png` | 1200×630 | The preview image when your link is shared |
| `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | | Browser tab icon. The SVG shows "AS"; open it in a text editor to change the letters. |

**Tips**
- Convert photos to WebP for free at https://squoosh.app (quality 75–80 is plenty).
- If you rename a file, update its path in `src/data.js`.
- Remove the "SAMPLE" certificates and use your real ones.
- To make a new link-preview image, edit a 1200×630 design in Canva or Figma and export as PNG.

---

## 4. Set up the contact form (Formspree, free)

1. Go to https://formspree.io and sign up.
2. Create a **New form**. Use the email where you want messages to arrive.
3. Copy the form endpoint, for example `https://formspree.io/f/xayzbcde`.
4. In `src/data.js`, paste only the last part:
   ```js
   formspreeId: 'xayzbcde',
   ```
5. Deploy, then send yourself a test message. The first time, Formspree asks you to confirm your email.

Until you add an ID, the form checks the fields and then tells visitors to email you directly. A hidden spam trap field (`_gotcha`) is already included.

---

## 5. Put it online for free

First set your real address in `src/data.js` (`site.url`, no slash at the end). It is used for SEO, the sitemap and link previews.

### Option A: GitHub Pages (auto-deploys on every push)

1. Create a GitHub account and a **new repository**, for example `portfolio`.
   - Name it `your-username.github.io` instead if you want the site at `https://your-username.github.io`.
2. Upload this project to it (in this folder):
   ```bash
   git init
   git add .
   git commit -m "My portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab. When "Deploy to GitHub Pages" turns green, your site is live at
   `https://your-username.github.io/portfolio/`.
5. Set `site.url` in `src/data.js` to that address (without the last slash), then commit and push again.

The workflow in `.github/workflows/deploy.yml` sets the base path for you: `/portfolio/` for a normal repo, `/` for a `username.github.io` repo. If you add a **custom domain**, open the workflow and replace the `BASE_PATH:` line with `BASE_PATH: /`.

To test a GitHub Pages build locally on Windows PowerShell:
```powershell
$env:BASE_PATH="/portfolio/"; npm run build; npm run preview
```

### Option B: Vercel

1. Push the project to GitHub (steps 1–2 above).
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, and import the repo.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Leave `BASE_PATH` unset.
4. Click **Deploy**. You'll get an address like `https://portfolio-yourname.vercel.app`.
5. Set `site.url` to that address and push again. Every push redeploys automatically.

Netlify works the same way: import the repo, build command `npm run build`, publish directory `dist`.

---

## 6. Customize in 5 minutes

- [ ] `src/data.js`: name, initials, course, year, school, career goal
- [ ] `src/data.js`: bio paragraphs and the hero typing phrases
- [ ] `src/data.js`: email and social links
- [ ] Replace `public/images/profile.webp` with your photo
- [ ] Replace `public/resume.pdf` with your resume
- [ ] Update or delete the sample projects, timeline items and certificates
- [ ] Add your Formspree ID
- [ ] Set `site.url` to your live address
- [ ] Change the letters in `public/favicon.svg`
- [ ] Optional: pick a different accent by changing `--brand-1`, `--brand-2`, `--accent` and the gradient colors at the top of `src/style.css`

---

## 7. Project structure

```
├── .github/workflows/deploy.yml   GitHub Pages auto-deploy
├── public/                        Images, resume, icons (copied as-is)
├── src/
│   ├── data.js                    ← ALL YOUR CONTENT
│   ├── style.css                  Design tokens + all styles
│   ├── main.js                    Starts everything
│   ├── 404.js                     Script for the 404 page
│   └── modules/
│       ├── render.js              Turns data.js into HTML
│       ├── i18n.js                English/Tagalog helper
│       ├── theme.js               Light/dark mode
│       ├── nav.js                 Navbar, mobile menu, progress bar
│       ├── animations.js          Reveal, count-up, typing, spotlight
│       ├── projects.js            Filters + project detail dialog
│       ├── lightbox.js            Image lightbox + dialog helpers
│       ├── contact.js             Form validation + Formspree
│       ├── icons.js               Inline SVG icons
│       └── utils.js               Small helpers
├── index.html                     Page shell (filled from data.js)
├── 404.html                       "Page not found" page
├── vite-plugin-portfolio.js       Prerenders the page, SEO tags, sitemap, robots.txt
└── vite.config.js                 Vite settings (BASE_PATH)
```

**How it works:** when you run `npm run dev` or `npm run build`, `vite-plugin-portfolio.js` reads `data.js` and writes the full page into the HTML. Search engines and visitors without JavaScript see everything. The JavaScript then adds the interactions, and re-renders the page if a visitor picks Tagalog.

---

## 8. Known limitations

- **Lighthouse 90+** is the target and the site is built for it (prerendered HTML, WebP images with sizes, lazy loading, no libraries, small CSS/JS). The final score depends on your real images: keep each one under ~150 KB. Google Fonts is the main external request; if Performance dips, self-host the fonts.
- **Language** is a client-side switch on one URL. Search engines index the default language only. Meta tags and the 404 page use the default language.
- **The resume link** uses the `download` attribute, which some mobile browsers ignore (they open the PDF instead).
- **The contact form** depends on Formspree's free plan (50 submissions a month at the time of writing). Check their current limits.
- **Glass effects** (`backdrop-filter`) are lighter in very old browsers; cards still look fine, just less blurred.
- **Copy-email** needs HTTPS or localhost (all the hosts above use HTTPS).
- **`sitemap.xml` / `robots.txt`** are created only by `npm run build`, not in dev.
