import type { ProductFormDraft, ProductFormErrors } from "./types.ts";

export function validateProduct(form: ProductFormDraft): ProductFormErrors {
	const errors: ProductFormErrors = {};

	const nameText = form.name?.trim() ?? "";

	if (nameText === "") {
		errors.name = "Name is required.";
	}

	const priceText = form.price?.trim() ?? "";
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
