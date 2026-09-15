export interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
  onSale: boolean
}

// Input values are always strings, so the form keeps price as a string
// and only converts it to a number after validation passes.
export interface ProductFormData {
  name: string
  price: string
}

export interface ProductFormErrors {
  name?: string
  price?: string
}
