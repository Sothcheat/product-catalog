import type { ProductFormData, ProductFormErrors } from "./types.ts";

// Pure function: reads the form data, returns an errors object.
// It never touches React state. The caller decides what to do with the result
// (for example, setErrors(result)). An empty object means the form is valid.
export function validateProduct(form: ProductFormData): ProductFormErrors {
	const errors: ProductFormErrors = {};

	if (form.name.trim() === "") {
		errors.name = "Name is required.";
	}

	const priceText = form.price.trim();
	const price = Number(priceText);

	// Check for empty first: Number('') is 0, which would slip through.
	if (priceText === "") {
		errors.price = "Price is required.";
	} else if (!Number.isFinite(price)) {
		errors.price = "Price must be a number.";
	} else if (price < 0) {
		errors.price = "Price cannot be negative.";
	}

	return errors;
}
