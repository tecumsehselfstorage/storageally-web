# StorageAlly — Web

Landing page + password-gated demo placeholder for **storageally.ai**.

Stack: Next.js 14 (App Router) · React 18 · Airtable waitlist · Vercel hosting · Cloudflare DNS.

---

## What's in this repo

```
storageally-web/
├── app/
│   ├── layout.jsx              ← root layout, fonts, metadata
│   ├── globals.css             ← shared styles
│   ├── page.jsx                ← landing page (this is what storageally.ai shows)
│   ├── app/
│   │   └── page.jsx            ← password-gated demo placeholder at /app
│   └── api/
│       └── waitlist/
│           └── route.js        ← POST endpoint that writes to Airtable
├── package.json
├── next.config.js
├── .env.example                ← copy to .env.local for local dev
└── .gitignore
```

---

## Step-by-step deployment

### 1. Prep Airtable (5 min)

1. Go to airtable.com → create a new base called `StorageAlly`.
2. Rename the default table to `Waitlist`.
3. Add these fields (exact names, case-sensitive):
   - `Name` (single line text)
   - `Email` (email)
   - `Facility` (single line text)
   - `Units` (single line text)
4. Create a Personal Access Token: airtable.com → Developer Hub → Personal access tokens → Create token. Give it `data.records:write` scope and add your StorageAlly base.
5. Save the token somewhere safe — you'll paste it into Vercel in step 4.
6. Grab the base ID: open your base, look at the URL — it's the string starting with `app...` (e.g. `appAbCdEfGhIjKlMn`).

### 2. Push to GitHub (5 min)

From a terminal, inside the unzipped `storageally-web/` folder:

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create storageally-web --public --source=. --push
```

Don't have `gh` CLI? Create the repo manually at github.com/new, then:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/storageally-web.git
git push -u origin main
```

### 3. Deploy to Vercel (5 min)

1. Go to vercel.com → Add New Project.
2. Import the `storageally-web` repo from GitHub.
3. Framework preset should auto-detect as **Next.js**. Don't change anything.
4. **Before clicking Deploy**, expand "Environment Variables" and add:

   | Name                        | Value                                         |
   | --------------------------- | --------------------------------------------- |
   | `AIRTABLE_API_KEY`          | your Airtable personal access token           |
   | `AIRTABLE_BASE_ID`          | `appXXXXXXXXXXXXXX` (your base ID)            |
   | `AIRTABLE_TABLE_NAME`       | `Waitlist`                                    |
   | `NEXT_PUBLIC_APP_PASSWORD`  | whatever you want for the /app gate (e.g. `tecumseh2026`) |

5. Click Deploy. You'll get a temporary URL like `storageally-web.vercel.app` in 60 seconds.
6. Visit the URL, submit the waitlist form with your own email — confirm a row appears in Airtable. If not, check Vercel → Project → Logs.

### 4. Point storageally.ai at Vercel (10 min, then up to 30 min DNS propagation)

1. In Vercel → your project → **Settings → Domains** → Add `storageally.ai` and `www.storageally.ai`.
2. Vercel will show you DNS records you need to add.
3. Go to Cloudflare → DNS → storageally.ai zone.
4. Add the records Vercel tells you. Typically:
   - `A` record, name `@`, value `76.76.21.21`
   - `CNAME` record, name `www`, value `cname.vercel-dns.com`
5. **Critical: set proxy status to "DNS only" (gray cloud), NOT "Proxied" (orange cloud).** Vercel handles SSL; if Cloudflare proxies, you'll get SSL loops.
6. Wait 5–30 min. Vercel provisions SSL automatically.
7. Visit storageally.ai. If it loads, you're live.

### 5. Verify everything works

- Homepage loads at storageally.ai ✓
- Submitting the waitlist form adds a row to Airtable ✓
- `storageally.ai/app` shows the password gate ✓
- Entering the password you set unlocks the placeholder ✓

---

## Local development (optional)

```bash
npm install
cp .env.example .env.local
# edit .env.local with your real Airtable keys
npm run dev
```

Visit http://localhost:3000.

---

## Making changes after launch

Every `git push` to the main branch auto-deploys on Vercel within a minute. No CLI needed.

---

## What's next

- Swap the `/app` placeholder for the real six-tab StorageAlly product demo.
- Add voice AI features as they roll out (missed-call text-back → voicemail triage → live receptionist).
- Wire up Stripe when ready to accept payments.

Questions? Ask StorageAlly (the AI) in the Claude Project.
