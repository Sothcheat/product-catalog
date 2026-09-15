import type { Product } from '../utils/types.ts'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <li className="card">
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      {product.inStock ? <span className="badge badge-in-stock">In stock</span> : <span className="badge badge-sold-out">Sold out</span>}
    </li>
  )
}

export default ProductCard
