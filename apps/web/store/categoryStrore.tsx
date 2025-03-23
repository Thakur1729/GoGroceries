import { create } from 'zustand';
import { SubCategory } from '@/types/type';

interface CategoryStore {
	subCategories: SubCategory[];
	setSubCategories: (subCategories: SubCategory[]) => void;
	fetchSubCategories: (
		categoryId: number
	) => Promise<{ success: boolean } | undefined>;
}

interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
}

interface ProductStore {
	products: Product[];
	setProducts: (products: Product[]) => void;
	fetchProducts: (
		subCategoryId: number
	) => Promise<{ success: boolean } | undefined>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
	subCategories: [],

	setSubCategories: (subCategories) => set({ subCategories }),
	fetchSubCategories: async (categoryId) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/categories/subcategory?categoryId=${categoryId}`
			);
			if (response.status !== 200) {
				throw new Error('Failed to fetch subcategories');
			}
			const data = await response.json();
			set({ subCategories: data.subCategories });
			return {
				success: true,
			};
		} catch (error) {
			console.error('Failed to fetch subcategories:', error);
		}
	},
}));

export const useProducgStore = create<ProductStore>((set) => ({
	products: [],

	setProducts: (products) => set({ products }),
	fetchProducts: async (subCategoryId) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products?subCategoryId=${subCategoryId}`
			);
			if (response.status !== 200) {
				throw new Error('Failed to fetch products');
			}
			const data = await response.json();
			set({ products: data.products });
			return {
				success: true,
			};
		} catch (error) {
			console.error('Failed to fetch products:', error);
		}
	},
}));
