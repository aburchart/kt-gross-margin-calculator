# KC Book Works

Monorepo for the [KC Book Works](https://kcbookworks.net) marketing site and retail calculators.

## Layout

```
apps/web                 Next.js site (marketing + /tools)
packages/calculators     Shared calculator math (@kc-book-works/calculators)
packages/calculator-ui   Shared calculator UI (@kc-book-works/calculator-ui)
docs/                    Content briefs and notes
```

## Develop

Requires [pnpm](https://pnpm.io) 9+ (via Corepack: `corepack enable`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description                         |
|----------------|-------------------------------------|
| `pnpm dev`     | Start the web app (Turborepo)       |
| `pnpm build`   | Production build all packages/apps  |
| `pnpm start`   | Serve production build              |
| `pnpm lint`    | Lint workspaces                     |

## Deploy (Vercel)

1. **Root Directory:** `apps/web`
2. **Install Command:** `pnpm install`
3. **Build Command:** `cd ../.. && pnpm build --filter=web` (or leave default if Vercel detects the monorepo)
4. Rename the Vercel project to `kc-book-works` if it still says `kt-gross-margin-calculator`

See [docs/dns-cutover.md](docs/dns-cutover.md) for attaching `kcbookworks.net` when ready.
