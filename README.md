This app is a demo of using [CipherStash](https://cipherstash.com) to replace a [Prisma](https://prisma.io) `User` model in a `Next.js` app.

## Secure User

We use a `CollectionAPI<User>` class (from [@cipherstash/stashjs-adapter](https://www.npmjs.com/package/@cipherstash/stashjs-adapter)) to store users fully encrypted with searchable encryption. It is intended to look as close to the original `User` model created by Prisma as possible to minimize migration effort. It even uses the same type (`import { User } from "prisma/client"`).

CipherStash collections use UUIDs but `CollectionAPI<User>` maps the integer IDs from Prisma into UUIDs so other parts of the application don't need to be changed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
