// Product interface
export interface Product {
	id: number;
	prodName: string;
	prodDescription: string;
	discount: number;
	price: number;
	mrp: number;
	stock: number;
	image: any[];
	unit: string;
	subcategoryId: number;
	createdAt: string;
	updatedAt: string;
}

// SubCategory interface with products
export interface SubCategory {
	id: number;
	name: string;
	image: string;
	categoryId: number;
	products: Product[];
}

export interface SubCategoryResponse {
	subCategories: SubCategory[];
	status: number;
}

export interface CartItem extends Product {
	quantity: number;
}
