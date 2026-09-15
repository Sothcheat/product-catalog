# Interactive Mini App: Product Catalog

A small product catalog built with React, TypeScript and Vite.

- Renders a product grid from an array with `.map()` and stable `id` keys
- Shows an "X products" count and an "In stock" / "Sold out" badge on each product
- "In stock only" filter, plus a red sale counter that only appears when there are sale items
- Controlled "Add product" form (name + price) with inline validation errors

**Repo:** _https://github.com/Sothcheat/product-catalog.git_

## Run it

```bash
pnpm install
pnpm dev
```

## Type check

```bash
npx tsc --noEmit -p tsconfig.app.json
```

## What tsc flagged

When I deliberately set a product's `price` to the string `'29'`, tsc flagged `error TS2322: Type 'string' is not assignable to type 'number'`, because the `Product` interface declares `price` as a `number`.
