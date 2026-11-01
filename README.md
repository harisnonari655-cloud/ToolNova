# ToolNova – Global All-in-One Online Tools Platform
> **Tagline:** "Powerful Tools. Smarter Work."

ToolNova is a production-grade, privacy-first SaaS platform providing **30+ free high-performance tools** spanning AI Writing, Search Engine Optimization (SEO), client-side Image Manipulation, PDF Document Workflows, and Developer Code Utilities.

---

## 🌟 Key Highlights & Engineering Features

- **100% Client-Side File Privacy**: Images, PDFs, and code transformations execute inside browser memory using HTML5 Canvas, Web Cryptography API, and `pdf-lib`. Files are never uploaded to remote servers.
- **Server-Side Gemini 4 Argon High Thinking**: AI writing tools are securely routed through Express server endpoints using Google Gemini 4 Argon with `ThinkingLevel.HIGH` reasoning.
- **Production AdSense Architecture**: Configurable `VITE_ADSENSE_PUB_ID` with non-intrusive placeholders and zero script loading when unconfigured.
- **Honest Premium System**: Clear Free vs. Pro comparison with "Coming Soon" payment status (no fake subscription activations or simulated charges).
- **SEO & International Visibility**: Dynamic XML Sitemap (`/sitemap.xml`), Robots.txt (`/robots.txt`), OpenGraph social cards, Schema.org `WebApplication` structured data, and dedicated landing pages for all 30 tools.
- **Mobile-First Responsive Design**: Optimized across mobile phones (Android / iOS), tablets, and desktops with smooth dark/light mode foundations.

---

## 🛠️ Complete Directory of All 30 Tools

### Category A: AI Writing Tools (Server-Side Gemini 4 Argon)
1. **AI Humanizer** (`/tools/ai-humanizer`) — Converts robotic, detectable AI drafts into natural, authentic human prose.
2. **AI Text Rewriter** (`/tools/ai-text-rewriter`) — Paraphrases text to enhance flow, vocabulary richness, and readability.
3. **AI Paragraph Generator** (`/tools/ai-paragraph-generator`) — Generates well-structured, cohesive paragraphs on any prompt.
4. **AI Email Writer** (`/tools/ai-email-writer`) — Drafts polished business emails, follow-ups, and sales outreach.
5. **AI Essay Writer** (`/tools/ai-essay-writer`) — Formulates structured academic essays with thesis and argument depth.
6. **AI Text Summarizer** (`/tools/ai-text-summarizer`) — Condenses reports and transcripts into executive summaries and bullets.

### Category B: SEO Tools
7. **Meta Tag Generator** (`/tools/meta-tag-generator`) — Generates HTML meta, OpenGraph, and Twitter tags with HTML download.
8. **Meta Description Checker** (`/tools/meta-description-checker`) — Audits 140–160 char limits, pixel width (~960px), and CTA power words.
9. **Keyword Density Checker** (`/tools/keyword-density-checker`) — Analyzes word frequency, density percentage, and stop words.
10. **Robots.txt Generator** (`/tools/robots-txt-generator`) — Builds crawler directives for Googlebot, Bingbot, and AI scrapers.
11. **XML Sitemap Generator** (`/tools/xml-sitemap-generator`) — Generates valid `sitemap.xml` with priority and change frequencies.
12. **SERP Snippet Preview** (`/tools/serp-snippet-preview`) — Simulates Google Desktop & Mobile search card rendering.

### Category C: Image Tools (100% Client-Side)
13. **Image Compressor** (`/tools/image-compressor`) — Re-compresses JPEG, PNG, and WebP using browser canvas with live savings readout.
14. **Image Resizer** (`/tools/image-resizer`) — Resizes to exact pixels with aspect-ratio locking and social media presets.
15. **JPG to PNG Converter** (`/tools/jpg-to-png-converter`) — Converts JPEG to lossless PNG in local memory.
16. **PNG to WebP Converter** (`/tools/png-to-webp-converter`) — Converts raster images to modern Google WebP (up to 70% smaller).
17. **Image Cropper** (`/tools/image-cropper`) — Crops images to 1:1, 16:9, 4:3, or custom dimensions.

### Category D: PDF Tools (Client-Side `pdf-lib`)
18. **PDF Merger** (`/tools/pdf-merger`) — Combines multiple PDF files into one continuous document.
19. **PDF Splitter** (`/tools/pdf-splitter`) — Extracts page ranges (e.g. `1-3, 5`) into a new PDF.
20. **PDF Compressor** (`/tools/pdf-compressor`) — Stream compression and unreferenced object cleanup.
21. **PDF to Image** (`/tools/pdf-to-image`) — Exports PDF pages into high-DPI PNG graphics.
22. **Image to PDF** (`/tools/image-to-pdf`) — Compiles photos into a multi-page PDF document.

### Category E: Developer Tools
23. **JSON Formatter** (`/tools/json-formatter`) — Pretty prints with 2-space, 4-space, or compact minification.
24. **JSON Validator** (`/tools/json-validator`) — RFC 8259 syntax validation with detailed error indicators.
25. **Base64 Encoder/Decoder** (`/tools/base64-encoder-decoder`) — Encodes/decodes UTF-8 and URL-safe Base64 strings.
26. **URL Encoder/Decoder** (`/tools/url-encoder-decoder`) — Percent-encodes/decodes web query parameters and full URLs.
27. **HTML Minifier** (`/tools/html-minifier`) — Strips superfluous whitespace and comments from HTML.
28. **CSS Minifier** (`/tools/css-minifier`) — Compresses stylesheets, calculating exact byte reductions.
29. **JavaScript Minifier** (`/tools/javascript-minifier`) — Minifies client-side JS scripts safely.
30. **UUID Generator** (`/tools/uuid-generator`) — Generates cryptographically secure v4 UUIDs individually or in bulk.

---

## 📄 Main Website Pages Included (18 Pages)
1. `/` — Home (Hero, instant search, recents, 5 categories, popular tools, architecture highlights, FAQs)
2. `/all-tools` — Full searchable directory of all 30 tools with category filters
3. `/ai-writing-tools` — Category A landing page
4. `/seo-tools` — Category B landing page
5. `/image-tools` — Category C landing page
6. `/pdf-tools` — Category D landing page
7. `/developer-tools` — Category E landing page
8. `/tools/:toolId` — Individual dedicated SEO tool pages for each of the 30 tools
9. `/about-us` — The ToolNova mission and engineering philosophy
10. `/contact-us` — Feedback and tool request interface
11. `/privacy-policy` — Zero-file upload policy and ephemeral AI processing documentation
12. `/terms-of-service` — Fair usage terms
13. `/cookie-policy` — Storage and analytics transparency
14. `/affiliate-disclosure` — FTC compliant disclosure
15. `/pricing` — Free vs Pro tier comparison and daily quota usage indicator
16. `/premium` — Pro perks breakdown
17. `/faq` — Comprehensive knowledge base
18. `404` — Custom error page with recovery links

---

## 💻 Local Development Instructions

### 1. Prerequisites
- Node.js version 18 or higher
- npm version 9 or higher

### 2. Installation
```bash
git clone https://github.com/your-username/toolnova.git
cd toolnova
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate environment variables:
```env
# Optional Gemini API key for live AI generation
GEMINI_API_KEY="your-gemini-api-key"

# Optional Google AdSense Publisher ID
VITE_ADSENSE_PUB_ID=""

# Optional Custom Deployment Domain
APP_URL="http://localhost:3000"
```
*(Note: All image, PDF, SEO, and developer tools run 100% locally without requiring any API keys!)*

### 4. Running the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 GitHub & Vercel Deployment Instructions

### 1. Uploading the Project to GitHub
1. Initialize git if not already tracked:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ToolNova 30-tool production platform"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `toolnova`.
3. Add remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/toolnova.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploying to Vercel
1. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your `toolnova` repository from GitHub.
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variables:
   - `GEMINI_API_KEY`: *(Optional)* Your Gemini API Key from Google AI Studio.
   - `APP_URL`: Your Vercel domain (e.g. `https://toolnova.vercel.app`).
   - `VITE_ADSENSE_PUB_ID`: *(Optional)* Your Google AdSense publisher ID.
5. Click **"Deploy"**. Your live platform is online in under 60 seconds!

### 3. Connecting a Custom Domain (e.g. toolnova.app)
1. In your Vercel project dashboard, go to **Settings > Domains**.
2. Enter your custom domain (e.g., `toolnova.app` or `www.toolnova.app`).
3. Add the provided DNS `A` or `CNAME` records in your domain registrar (Cloudflare, Namecheap, Google Domains).
4. Vercel automatically issues an SSL certificate within minutes.

### 4. Updating the Deployed Website
Every time you push new commits to your GitHub `main` branch:
```bash
git add .
git commit -m "update: add feature"
git push origin main
```
Vercel automatically triggers an atomic preview build and deploys with zero downtime.

---

## 🧪 Production Quality Checklist

- [x] All 30 tools exist and execute real transformations (no dummy animations)
- [x] Gemini 4 Argon High-Thinking server-side integration configured
- [x] Client-side image canvas processing tested for JPG, PNG, and WebP
- [x] PDF merge, split, compress, and render tested via `pdf-lib`
- [x] Developer tools (JSON, Base64, URL, Minifiers, UUID) validated
- [x] SEO dynamic sitemap (`/sitemap.xml`) and robots (`/robots.txt`) active
- [x] Schema.org `WebApplication` structured data embedded
- [x] Light / Dark mode responsive typography and layout
- [x] Zero API key leaks in client bundle
