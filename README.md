# Rayhan Hameed — Cinematic Portfolio

Welcome to the source code of **Rayhan Hameed’s cinematic & magical portfolio website**. This repository contains a fully-static site built with vanilla **HTML + CSS + JavaScript**—no frameworks, build tools or databases required.

The design draws inspiration from Marvel Studios title sequences, the Hogwarts archives and Stark Industries holographic UI.  It emphasises visual polish, smooth animation and accessibility while staying deploy-ready for **GitHub Pages** or **Replit** with zero additional configuration.

---

## 🗂 Repository Structure

```text
├── index.html          ⟵ main entry point
├── style.css           ⟵ global theme & responsive layout
├── script.js           ⟵ interactivity, animations, theme + audio logic
├── 404.html            ⟵ custom “Lost in the Multiverse” error page
├── assets/             ⟵ all static assets live here
│   ├── images/         ⟵ .jpg / .png hero imagery, icons, QR codes, etc.
│   ├── audio/          ⟵ intro.mp3 & other SFX (muted-by-default)
│   ├── resume.pdf      ⟵ downloadable résumé (rename as needed)
│   └── blog/           ⟵ optional markdown or JSON blog data
├── .nojekyll           ⟵ bypasses Jekyll build on GitHub Pages
└── README.md           ⟵ you are here ✅
```

> **Tip — Keeping `assets/` tidy**  
> Add sub-folders such as `gifs/`, `icons/`, `models/` or `fonts/` if your custom content grows.

---

## 🚀 Quick Start (Local Preview)

1. **Clone** the repository  
   ```bash
   git clone https://github.com/your-username/rayhan-portfolio.git
   cd rayhan-portfolio
   ```
2. **Serve** the site locally — choose any method you like:
   - **VS Code Live Server** extension *(one-click)*
   - Python 3 built-in server  
     ```bash
     python -m http.server 5500
     ```
3. Visit `http://localhost:5500` in your browser — you should see the cinematic intro splash.

> **JavaScript is required** for animations & audio.  With JS disabled the site still shows basic content but without motion.

---

## 🌐 Deploying to GitHub Pages

GitHub Pages natively hosts static files, so deployment is as simple as pushing to *main* and flipping a switch.

| Step | Action |
|------|--------|
| 1 | Create a **public repository** on GitHub (e.g. `rayhan-portfolio`). |
| 2 | Push/commit all project files — keep the root exactly as shown above. |
| 3 | Navigate to **Settings → Pages**. |
| 4 | **Source** → select **Branch = `main`** and **Folder = `/root`**. Click **Save**. |
| 5 | Wait ~60 seconds for the workflow to finish (check the *Actions* tab). |
| 6 | Your site will be live at `https://<username>.github.io/rayhan-portfolio/` (auto HTTPS). |

### Custom Domains (Optional)
1. Add your domain (e.g. `portfolio.your-domain.com`) in **Settings → Pages**.
2. Create **CNAME** (or ALIAS) DNS records pointing to `<username>.github.io`.
3. When the DNS check is green, tick **Enforce HTTPS** for free TLS via Let’s Encrypt.

> Using `A` records?  Replace them with GitHub’s four IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

### Why the `.nojekyll` file?
GitHub Pages ordinarily runs Jekyll; adding `.nojekyll` tells the platform to **skip any processing** and serve the files exactly as-is (important because our `assets/` folder may contain underscored paths that Jekyll would otherwise ignore).

---

## ⚡ Deploying on Replit

1. Click **"Import from GitHub"** in Replit, select your repo.
2. Replit auto-detects static sites; press **Run** to preview.
3. Under *Workspace → Webview → Open in New tab* you’ll receive a shareable HTTPS URL.
4. Add a `replit.nix` or `.replit` file *only if* you need custom build commands — otherwise static hosting just works.

---

## 🔄 Replacing Demo Assets

| Replace This | With Your Own | Location |
|--------------|--------------|----------|
| `./assets/images/profile.jpg` | Professional headshot | `assets/images/` |
| `./assets/audio/intro.mp3` | 5-second cinematic sting | `assets/audio/` |
| `./assets/resume.pdf` | Updated résumé | `assets/` |
| Project thumbnails | 16:9 JPG/PNG ≤ 500 KB | `assets/images/projects/` |
| Blog articles | Markdown/JSON | `assets/blog/` |

**File naming best practice:** stick to lowercase, kebab-case, no spaces.

---

## ✨ Customization Cheatsheet

| Element | Location | How to customise |
|---------|----------|------------------|
| **Colour palette & fonts** | `:root` tokens in `style.css` | Adjust variables `--clr-*`, `--ff-*` |
| **Animation timing** | `style.css` → `--transition-*` vars | Change durations globally |
| **Intro sequence** | `script.js` → `initializeSplashScreen()` | Re-order or replace layer animations |
| **Navigation items** | `index.html` nav `<ul>` | Add/remove `<li><a>` anchors |
| **Skills radar nodes** | `script.js` → `initializeSkillsRadar()` | Extend the `skills[]` array |

---

## ♿ Accessibility & SEO Highlights

* Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)  
* ARIA labels for interactive controls (theme + audio toggles, modals)  
* `prefers-reduced-motion` media query disables intense effects  
* Viewport-friendly, responsive, WCAG-AA colour contrast  
* `<meta>` description, Open Graph tags, favicons and lazy-loaded images

---

## 🐞 Troubleshooting

| Issue | Fix |
|-------|-----|
| **Blank page on GitHub Pages** | Ensure you committed **index.html** at root and `.nojekyll` file is present. |
| **Mixed-content warnings** | All asset URLs must be **relative** (`./assets/...`) or `https://` absolute paths. |
| **Custom domain not secure** | Wait for DNS to propagate, then re-check *Enforce HTTPS*. |
| **Animations jitter on mobile** | Heavy GPU filters? Reduce or disable in `prefers-reduced-motion` branch of CSS. |

---

## 📄 License

This project is released under the **MIT License**.  Feel free to remix, adapt and share — attribution appreciated.

---

> **May your code be magical and your deployments be legendary.**
