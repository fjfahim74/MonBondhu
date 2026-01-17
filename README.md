# মনবন্ধু (MonBondhu)

একটি Next.js (App Router) + TypeScript + Tailwind CSS ভিত্তিক অ্যাপ স্টার্টার—বাংলাভাষী ব্যবহারকারীদের জন্য মানসিক সুস্বাস্থ্য ও কমিউনিটি হেলথ সহায়তা কেন্দ্রিক ডেমো।

## Features
- Next.js App Router, strict TypeScript
- Tailwind CSS with custom theme and typography plugin
- Dark mode toggle with persistence
- Mock blog (static index + dynamic route)
- API route with Zod validation (`/api/contact`)
- Jest + Testing Library setup
- ESLint + Prettier

## Requirements
- Node.js 18+
- npm (or your preferred package manager)

## Install and run (Windows PowerShell)
```powershell
# Install dependencies
npm install

# Run the dev server
npm run dev

# Lint, test, type-check
npm run lint
npm test
npm run type-check

# Build and start
npm run build
npm start
```

## Project structure (high level)
- `src/app` — App Router pages and API routes
- `src/components` — Reusable UI components
- `src/lib` — Utilities (zod validation, mock posts, mood store)
- `content/posts` — Placeholder content (can be replaced later)

## Testing
- Jest + React Testing Library configured via `jest.config.cjs`
- Add more tests under `src/**/__tests__`

## Notes
- Husky is configured via the `prepare` script, but installation requires running `npm install` once. If you want the pre-commit hook, run `npx husky install` after install.
- Replace placeholder content and colors as needed.

## Deployment
- Works out-of-the-box on Vercel or any Node hosting that supports Next.js. Build with `npm run build` and run with `npm start`.

---

Brand
- নাম: মনবন্ধু
- ভাষা: বাংলা (প্রাথমিক), ইংরেজি (ঐচ্ছিক)

Privacy & Safety
- ব্যক্তিগত ডাটা (মুড লগ) ডিভাইসে থাকে
- ক্রাইসিস কন্টাক্ট দৃশ্যমান; “চিকিৎসা পরামর্শ নয়” ডিসক্লেইমার আছে
