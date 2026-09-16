# Debugging Journal

One entry per bug. The bugs were planted on the `bugs` branch in commit `bf55877`. `main` stays clean.

---

## Bug 1: Crash

- **Symptom:** The page loaded blank with nothing rendered, not even the form.
- **Tool:** Console tab (Firefox DevTools)
- **What it showed:** `Uncaught TypeError: can't access property "filter", visibleProducts is null`, thrown in `App` at `App.tsx:33` (`visibleProducts.filter(...)`). `visibleProducts` comes straight from `products` when the "In stock only" filter is off, so the `products` state was `null` on the first render. Tracing it back led to line 7, where the list state started as `null as unknown as Product[]`. The cast hid the `null` from TypeScript, so tsc passed.
- **Fix:** Restored the initial state to an empty array: `useState<Product[]>([])`. The first render now filters and maps over `[]`, and the fetched products replace it once they arrive.

---

## Bug 2: Silent wrong value

- **Symptom:** Typing in the Price box did nothing because the input stayed empty. Submitting showed "Price is required." even though I had typed a price. No error appeared in the console.
- **Tool:** React DevTools (Components tab)
- **What it showed:** I selected `App` and expanded hook 3 (the `form` state) while typing "Microphone" as the name and `6` as the price. The state was `{ name: "Microphone", prce: "6", price: "" }`. My price went into an extra `prce` key while `price` stayed `""`. `handleChange` saves values with `[name]: value`, so the key comes from the input's `name` prop, and the price `<input>` had `name="prce"` (line 78). The input displays `form.price`, which never changed, so the box looked empty. tsc missed it because `name` is a plain `string`.
- **Fix:** Corrected the prop to `name="price"`. In the Components tab, typing now updates `price` and no `prce` key appears.

---

## Bug 3: Network failure

- **Symptom:** The product grid was replaced by the message `HTTP error! status 404`. In React DevTools, `App`'s hook 5 (`loadError`) held the same string.
- **Tool:** Network tab
- **What it showed:** The products request came back with status **404**. Its request URL was `/prodcuts.json`, with the letters swapped, but the file in `public/` is `products.json`.
- **Fix:** Corrected the URL in the `fetch` call on line 16 to `/products.json`. The request returned 200 and all 6 products loaded.
