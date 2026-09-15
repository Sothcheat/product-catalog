import type { Product } from './utils/types.ts'

export const initialProducts: Product[] = [
  { id: 'p1', name: 'Mechanical Keyboard', price: 89, inStock: true, onSale: false },
  { id: 'p2', name: 'Wireless Mouse', price: 29, inStock: true, onSale: false },
  { id: 'p3', name: 'USB-C Hub', price: 45, inStock: false, onSale: true },
  { id: 'p4', name: '27" Monitor', price: 249, inStock: true, onSale: false },
  { id: 'p5', name: 'Noise-Cancelling Headphones', price: 179, inStock: false, onSale: true },
  { id: 'p6', name: 'Laptop Stand', price: 39, inStock: true, onSale: false },
]
