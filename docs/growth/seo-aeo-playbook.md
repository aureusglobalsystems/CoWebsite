# SEO / AEO Growth Playbook — Aureus Global Systems

What the website now does on its own, and the steps that need a person (accounts, listings, publishing).

---

## 1. What's built into the site

| Area | What it does | Where |
|---|---|---|
| Service landing pages | One page per service, each aimed at the phrases buyers search | `/services/*` — content in `lib/services.ts`, `lib/inference-content.ts` |
| Page titles & descriptions | Every route has its own title, description and canonical URL | `app/*/layout.tsx`, `generateMetadata` in dynamic routes |
| Structured data | Organization + WebSite sitewide; Service, FAQPage and BreadcrumbList on service pages; BlogPosting on articles; Article on case studies | `app/layout.tsx`, page files |
| AEO ("In short" blocks) | Each service page opens with a 45–70 word, answer-first definition that AI assistants can quote | `answer` field in `lib/services.ts` |
| `/llms.txt` | Plain-text summary of the company, services, case studies and articles for AI crawlers | `app/llms.txt/route.ts` |
| Sitemap & robots | Generated from the same data, so new pages are included automatically | `app/sitemap.ts`, `app/robots.ts` |
| Share images | Branded 1200×630 preview cards for LinkedIn / X / Slack | `opengraph-image.tsx` files |
| Case study pages | One indexable page per case study | `/case-studies/[slug]`, data in `lib/case-studies.ts` |
| Insights | Article section; three launch articles | `/insights`, data in `lib/posts.ts` |
| Lead capture | Free offer on every service page, "Hire engineers" path everywhere, contact form preselects the service | `components/service/*`, `app/contact/page.tsx` |
| Analytics events | `cta_click`, `hire_engineers_click`, `lead_magnet_click`, `book_call_click`, `generate_lead` | `lib/analytics.ts` |
| Speed | 3D scenes load after the page paints and only when on screen | `components/ui/LazyCanvas.tsx` |

---

## 2. Vercel environment variables (Project → Settings → Environment Variables)

All are optional — the site works without them; each one switches a feature on.

| Variable | Example | Turns on |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aureusglobalsystems.com` | Canonical URLs, sitemap, structured data. **Set this to the exact live domain** (with `www.` if the site redirects to www). |
| `NEXT_PUBLIC_GTM_ID` | `GTM-T7R8N782` (already the default) | Google Tag Manager container on every page. Set to `off` to disable. |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Direct GA4 install — **only used if Tag Manager is turned off**. With Tag Manager, add GA4 inside the container instead. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | the `content` value from Search Console's HTML-tag method | Search Console ownership |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | the `content` value from Bing's meta-tag method | Bing Webmaster Tools (also feeds ChatGPT search and Copilot) |
| `NEXT_PUBLIC_BOOKING_URL` | `https://calendly.com/aureus/30min` | "Book a 30-min call" buttons on every service page |

Redeploy after adding them.

---

## 3. One-time setup (≈1 hour)

1. **Google Search Console** — add the domain property, verify (DNS or the env var above), submit `https://<domain>/sitemap.xml`. Then use *URL Inspection → Request indexing* on the six service pages.
2. **Bing Webmaster Tools** — import from Search Console (one click), submit the sitemap. Bing powers ChatGPT search, Copilot and DuckDuckGo, so it matters for AEO.
3. **Google Analytics 4 via Tag Manager** (container `GTM-T7R8N782` is installed on every page):
   - In Tag Manager add a **Google tag** with your GA4 measurement ID (`G-…`), trigger *Initialization – All Pages*.
   - The site pushes these events to the dataLayer: `generate_lead` (contact form sent), `cta_click`, `hire_engineers_click`, `lead_magnet_click`, `book_call_click`, with parameters such as `service` and `location`. For each one, add a *Custom Event* trigger with that exact name and a **GA4 Event** tag that forwards it (add `service` / `location` as event parameters).
   - Publish the container, then in GA4 *Admin → Events* mark `generate_lead` as a **key event**.
4. **Google Business Profile** — create a profile for the company (service-area business), category "Software company" / "Computer consultant", link to the site.

---

## 4. Listings & backlinks (do these in the first month)

Each listing is a trusted backlink and a place buyers search directly.

- **Clutch.co**, **GoodFirms**, **DesignRush**, **TechBehemoths** — create company profiles under *Data engineering / AI development / BI*. Clutch rewards verified client reviews: ask 3–5 past clients for a review.
- **Databricks Partner directory** and **Snowflake Partner Network** — apply if eligible (only claim partner status on the site once approved).
- **LinkedIn company page** — fill the "Services" section with the six services, link each to its page.
- **Crunchbase** and **G2 (services)** — basic company profiles.

Copy you can paste into any profile:

> **Short (≈160 chars):** Aureus Global Systems is a data & AI engineering company. Databricks, Snowflake, AI/ML, LLM inference and BI — delivered as projects or by our engineers.
>
> **Long:** Aureus Global Systems (AGS) is a data & AI engineering company based in India with global delivery. We design, build and run data platforms on Databricks and Snowflake, production AI/ML and LLM applications, self-hosted LLM inference, and analytics & BI. Clients engage us for end-to-end projects (fixed-price or managed teams) or hire our senior data, AI and ML engineers into their own teams.

---

## 5. Content plan (keeps rankings growing)

Publish **2 articles a month** in `lib/posts.ts` (same format as the existing three). Each article should answer one question buyers actually type, open with a 2–3 sentence answer, and link to one service page. Suggested next topics:

1. How much does a Databricks migration cost? (what drives it, engagement models — no invented prices)
2. RAG vs fine-tuning: which does your use case need?
3. Snowflake cost optimization checklist: 12 things to check
4. Power BI semantic models: how to build one people trust
5. How to hire a data engineering team in India (staff augmentation vs agency vs freelancers)
6. Quantization explained: INT4, FP8, AWQ and GPTQ for LLM inference
7. Unity Catalog migration: a step-by-step plan
8. MLOps on Databricks: from notebook to production

**Repurpose every article** into a LinkedIn post and a short carousel — that's where B2B buyers will first see it.

## 6. Case studies

Case studies are the strongest proof for both people and search engines. For each new engagement, add an entry to `lib/case-studies.ts` (it gets its own page, share image and sitemap entry automatically). Use real numbers the client has approved; name the client where permitted.

## 7. Measure monthly

- Search Console → *Performance*: impressions and clicks per service page, and the queries they rank for. Rewrite titles/FAQs toward queries that show impressions but few clicks.
- GA4 → key events by landing page: which service pages produce enquiries.
- Ask each new lead "how did you find us?" — AI assistants (ChatGPT, Perplexity, Gemini) are now a real source; track it.
