# Ross AI

AI-powered contract review. Upload a PDF contract and get a plain English summary and key obligations in seconds — powered by GPT-4o.

---

## Setup

### 1. Get an OpenAI API key

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Add at least **$5 in credits** (you'll spend pennies per analysis)
3. Go to **API keys** and create a new key

### 2. Add your key to the project

Copy the example env file and add your real API key:

```bash
# macOS / Linux
cp .env.example .env.local

# Windows (PowerShell)
copy .env.example .env.local
```

Then open `.env.local` and replace the placeholder with your key:

```
OPENAI_API_KEY=sk-proj-...your-real-key...
```

`.env.local` must be a **file** in the project root (same folder as `package.json`), not a folder. It is in `.gitignore` and will never be committed.

**Important:** restart the dev server after creating or editing `.env.local` (`Ctrl+C`, then `npm run dev`). Next.js only loads env files on startup — you should see `Environments: .env.local` in the terminal when it worked.

### 3. Run the dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How it works

1. You land on the homepage — a Harvey-inspired dark hero page.
2. Click **Analyze a Contract** to go to the analysis tool.
3. Drop or upload a PDF contract (text-based, up to 10MB).
4. Click **Analyze Contract** — the app sends your PDF to a Next.js API route.
5. The server extracts the text with `pdf-parse`, then sends it to GPT-4o.
6. GPT-4o streams the response back, and you see the Summary and Key Obligations appear word-by-word in real time.

---

## What this teaches you

| Concept | Where |
|---|---|
| Prompt engineering | `lib/prompts.ts` |
| PDF text extraction | `app/api/review/route.ts` |
| OpenAI streaming API | `app/api/review/route.ts` |
| Server-side API calls (key stays safe) | `app/api/review/route.ts` |
| Streaming response parsing on the client | `app/analyze/page.tsx` |
| Tailwind v4 theming | `app/globals.css` |

---

## Project structure

```
ross-ai/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── analyze/
│   │   └── page.tsx              # Upload + analysis screen
│   └── api/
│       └── review/
│           └── route.ts          # OpenAI streaming API route
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── FeatureSection.tsx
│   ├── PitchSection.tsx
│   ├── UploadZone.tsx
│   ├── ResultsPanel.tsx
│   ├── ErrorModal.tsx
│   └── Footer.tsx
├── lib/
│   └── prompts.ts                # GPT-4o legal analysis prompt
└── .env.local                    # Your OpenAI API key (not committed)
```

---

## Notes

- Contracts are truncated to ~15,000 characters to keep API costs low.
- Only text-based PDFs are supported. Scanned documents (image PDFs) will not work.
- This is a proof-of-concept. **Not legal advice.**
