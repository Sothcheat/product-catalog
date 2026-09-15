import { useState } from 'react'
import { initialProducts } from './products.ts'
import type { Product, ProductFormData, ProductFormErrors } from './utils/types.ts'
import { validateProduct } from './utils/validateProduct.ts'
import ProductCard from './components/ProductCard.tsx';

function App() {

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [form, setForm] = useState<ProductFormData>({name: '', price: ''});
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const visibleProducts = inStockOnly ? products.filter(p => p.inStock) : products;
  const saleCount = visibleProducts.filter(p => p.onSale).length

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value
    }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = validateProduct(form)
    setErrors(result)

    if (Object.keys(result).length > 0) return

    const newProduct: Product = {
        id: crypto.randomUUID(),
        price: Number(form.price),
        name: form.name.trim(),
        inStock: true,
        onSale: false
    }

    setProducts((prev) => [...prev, newProduct])
    setForm({name: '', price: ''})
  }

  return (
    <main className="app">
      <h1>Product Catalog</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
        <label htmlFor="name">
            Name: <input id="name" type="text" name="name" value={form.name} onChange={handleChange}/>
        </label>
            {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="field">
        <label htmlFor="price">
            Price: <input id="price" type="text" name="price" value={form.price} onChange={handleChange} />
        </label>
            {errors.price && <p className="error">{errors.price}</p>}
            </div>
        <button type="submit">Add</button>
      </form>
      <div className="toolbar">
        <span className="count">{visibleProducts.length} products</span>

        <label htmlFor="inStockOnly">
            <input id="inStockOnly" type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}/>
            In stock only
        </label>
        {saleCount > 0 && <span className="sale-counter">{saleCount} on sale</span>}
      </div>

      <ul className="grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </main>
  )
}

export default App
