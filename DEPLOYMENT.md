# Deploying ROSHAN — free, fast, offline-first

ROSHAN is a **100% static, offline-first PWA**. `npm run build` emits a plain
`out/` folder (HTML + JS + audio). There is **no server runtime** — so any
static host works, there are **no cold starts**, and nothing to maintain.

---

## Option 1 — GitHub Pages (free, zero maintenance)

The deploy workflow is ready in this repo at
**`docs/github-pages-workflow.yml.example`** — it builds the site (base path
`/ROSHAN` handled automatically) and publishes it on **every push to `main`**.

**One-time setup (owner only, ~2 minutes):**
1. On GitHub: open `docs/github-pages-workflow.yml.example`, copy its contents.
2. **Add file → Create new file** → name it `.github/workflows/deploy.yml` →
   paste → **Commit**. (The web editor uses your login, so no token scope is
   needed. Alternatively regenerate the PAT with the `workflow` permission and
   push the file normally.)
3. **Settings → Pages** → *Build and deployment* → **Source: GitHub Actions**
4. Open **Actions** and let *Deploy to GitHub Pages* run green.
5. Live at: **https://saqibmehdi123.github.io/ROSHAN/**

Every future `git push` to `main` redeploys automatically.

## Option 2 — Cloudflare Pages (fastest inside Pakistan)

Cloudflare has edge PoPs in Karachi/Lahore/Islamabad + **unlimited free
bandwidth** — the best raw speed for Pakistani schools.

1. Sign up at https://dash.cloudflare.com → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git** → select `SaqibMehdi123/ROSHAN`
2. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `22`
   - (Leave `NEXT_PUBLIC_BASE_PATH` **unset** — the app sits at the domain root)
3. Deploy → live at `https://<project-name>.pages.dev`
4. Every `git push` to `main` redeploys automatically.

## Option 3 — Vercel / Netlify

**Vercel:** https://vercel.com/new → Import `SaqibMehdi123/ROSHAN` → it
auto-detects Next.js → **Deploy**. Done.

**Netlify:** *Add new site → Import an existing project* → build command
`npm run build`, publish directory `out`, env `NODE_VERSION=22`
(or zero-setup: drag the local `out/` folder onto https://app.netlify.com/drop).

---

## Why there is no lag (architecture)

- **Static files on a CDN** — no compute, no cold start, no database hops.
- The **service worker precaches the app shell** on first visit.
- Urdu narration audio (~75 MB total) is **cached on first play**, per clip —
  never downloaded upfront.
- After a child has used a lesson once, it runs **100% offline and instant**,
  immune to power and internet cuts. This is what makes it usable in real
  time in a village classroom.

## Bonus — school LAN with zero internet

Serve the build from the teacher PC:
`npx serve out -l 80` → devices open `http://<teacher-pc-ip>`.
(The offline service worker needs HTTPS, so use this where the teacher PC
is always on; the internet-hosted version keeps its offline superpower.)
