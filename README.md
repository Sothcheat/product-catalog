# Interactive Mini App: Product Catalog

A small product catalog built with React, TypeScript and Vite. It is fully typed and was debugged with browser DevTools.

**Repo:** https://github.com/Sothcheat/product-catalog

## Features

- Loads products from `public/products.json` with `fetch`, and shows an error message if the request fails
- Renders a product grid with `.map()` and stable `id` keys
- Shows an "X products" count and an "In stock" / "Sold out" badge on each product
- "In stock only" filter, plus a red sale counter that only appears when there are sale items
- Controlled "Add product" form (name + price) with inline validation errors

## Run it

```bash
pnpm install
pnpm dev
```

## Checks

```bash
npx tsc --noEmit -p tsconfig.app.json   # type check (strict mode)
pnpm lint                               # Biome lint + format check
```

## Types

- `"strict": true` is on, so there is no implicit `any` and no `any` anywhere in `src`.
- Every component has a props interface. Handlers use `React.ChangeEvent`, and the list state is `useState<Product[]>`.
- The fetched JSON is annotated as `Product[]`, because `res.json()` returns `any`.
- Types are derived instead of repeated (see [`src/utils/types.ts`](src/utils/types.ts)):
  - `PublicProduct = Omit<Product, "supplierCost">`: `ProductCard` never receives the internal cost field.
  - `ProductFormDraft = Partial<ProductFormData>`: the validator accepts half-filled forms and uses `?.` with `??` on every optional field.
  - `ProductFormErrors = Partial<Record<keyof ProductFormData, string>>`: the errors type always matches the form fields.

## What tsc flagged

When I deliberately set a product's `price` to the string `'29'`, tsc flagged `error TS2322: Type 'string' is not assignable to type 'number'`, because the `Product` interface declares `price` as a `number`.

## Debugging

Three bugs were planted in commit `bf55877` and fixed one per commit. The full journal (symptom → tool → what it showed → fix) is in [DEBUGGING.md](DEBUGGING.md).

| Bug | Type | Tool that caught it |
|---|---|---|
| `products` state started as `null` | Crash | Console |
| Price input had `name="prce"` | Silent wrong value | React DevTools (Components tab) |
| Fetch URL was `/prodcuts.json` | Network failure | Network tab |

The Console caught the crash because it threw an error, React DevTools caught the `prce` typo by showing the `form` state, and the Network tab caught the 404 on `/prodcuts.json`. The Console alone wasn't enough because bugs 2 and 3 threw no errors: one silently saved the price under the wrong key, and the other only showed a vague "status 404" without the URL that was wrong.
