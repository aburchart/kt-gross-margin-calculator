# DNS cutover — kcbookworks.net

The site is developed on Vercel preview/production URLs. Canonical `SITE_URL` in code is already `https://kcbookworks.net`. Attach the domain when the site is ready to launch — **do not change live DNS while still developing**.

## Prerequisites

1. Confirm you own `kcbookworks.net`
2. Vercel project Root Directory is `apps/web`
3. Install command: `pnpm install` (see `apps/web/vercel.json`)

## Attach domain in Vercel

1. Vercel → Project → **Settings → Domains**
2. Add `kcbookworks.net` and `www.kcbookworks.net`
3. Follow Vercel’s prompts for apex vs www (prefer apex primary, www redirect)

## DNS records (typical)

Use the exact values Vercel shows in the Domains UI (they can vary by account). Common pattern:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | `@`  | `76.76.21.21` (Vercel)   |
| CNAME | `www`| `cname.vercel-dns.com`   |

Some registrars support ALIAS/ANAME for apex instead of A.

## After DNS propagates

1. Wait for SSL certificates to show **Valid** in Vercel
2. Visit `https://kcbookworks.net` and confirm the site loads
3. Update Google Business Profile website URL to `https://kcbookworks.net` ([GBP](https://share.google/GbHLCmGsxL6142pZu))
4. Update Facebook page website link if needed ([Facebook](https://www.facebook.com/ktbookworks/))
5. Optional: if you also own `kcbookworks.com`, add a 301 redirect to `.net` in Vercel
6. Submit sitemap / re-verify Search Console for the new host

## Not done in this repo change

- No live DNS edits
- No Vercel domain attach via API (requires login)
- Phone number and hours still omitted from NAP until Kari provides them
