export interface Product {
	id: string;
	name: string;
	price: number;
	inStock: boolean;
	onSale: boolean;
	supplierCost: number;
}

export type PublicProduct = Omit<Product, "supplierCost">;

export type ProductFormDraft = Partial<ProductFormData>;

// Input values are always strings, so the form keeps price as a string
// and only converts it to a number after validation passes.
export interface ProductFormData {
	name: string;
	price: string;
}

export type ProductFormErrors = Partial<Record<keyof ProductFormData, string>>;
