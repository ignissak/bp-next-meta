This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Used Libraries

- React + Next.js
- TypeScript
- Shadcn/ui for UI components
- Zod for schema validation
- Prisma for database access
- Legendapp/state for global state management

## Docker

### Building

For building you have to turn on database service:

```bash
docker compose up database -d
```

Then if you run the whole compose the image should build itself:

```bash
docker compose up -d
```