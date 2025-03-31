import { create } from 'zustand';
import { SubCategory, Product, CartItem } from '@/types/type';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { stat } from 'fs';
import { clear } from 'console';

interface CategoryStore {
	subCategories: SubCategory[];
	setSubCategories: (subCategories: SubCategory[]) => void;
	fetchSubCategories: (
		categoryId: number
	) => Promise<{ success: boolean } | undefined>;
}

interface CartState {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;

	// Actions
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string | number) => void;
	updateQuantity: (productId: string | number, quantity: number) => void;
	clearCart: () => void;
	getItemQuantity: (productId: string | number) => number;
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

// export const useProducgStore = create<ProductStore>((set) => ({
// 	products: [],

// 	setProducts: (products) => set({ products }),
// 	fetchProducts: async (subCategoryId) => {
// 		try {
// 			const response = await fetch(
// 				`http://localhost:3000/api/products?subCategoryId=${subCategoryId}`
// 			);
// 			if (response.status !== 200) {
// 				throw new Error('Failed to fetch products');
// 			}
// 			const data = await response.json();
// 			set({ products: data.products });
// 			return {
// 				success: true,
// 			};
// 		} catch (error) {
// 			console.error('Failed to fetch products:', error);
// 		}
// 	},
// }));

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			totalItems: 0,
			totalPrice: 0,

			addToCart: async (product: Product) => {
				console.log('Product passed to addToCart:', product);
				const currentItems = get().items;
				const existingItem = currentItems.find(
					(item) => item.id === product.id
				);

				if (existingItem) {
					const updateItems = currentItems.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					);

					set((state) => ({
						items: updateItems,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}));
				} else {
					set((state) => ({
						items: [...state.items, { ...product, quantity: 1 }],
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}));
				}
				console.log(product.id);
				try {
					await axios.post('http://localhost:3000/api/cart', {
						productId: product.id,
						quantity: 1,
						action: 'add',
					});
				} catch (error: unknown) {
					if (axios.isAxiosError(error)) {
						console.error('Axios error:', error.message);
					} else {
						console.error('Unexpected error:', error);
					}
				}
			},

			removeFromCart: (productId) => {
				const currentItems = get().items;
				const itemToRemove = currentItems.find((item) => item.id === productId);

				if (!itemToRemove) return;

				if (itemToRemove.quantity > 1) {
					const updateItems = currentItems.map((item) =>
						item.id === productId
							? { ...item, quantity: item.quantity - 1 }
							: item
					);

					set((state) => ({
						items: updateItems,
						totalItems: state.totalItems - 1,
						totalPrice: state.totalPrice - itemToRemove.price,
					}));
				} else {
					set((state) => ({
						items: state.items.filter((item) => item.id !== productId),
						totalItems: state.totalItems - 1,
						totalPrice: (state.totalPrice = itemToRemove.price),
					}));
				}

				try {
					axios.post('http:localhost:3000/api/cart', {
						productId,
						quantity: 1,
						action: 'remove',
					});
				} catch (err: unknown) {
					console.log('Error syncing cart with server:', err);
				}
			},

			updateQuantity: (productId, quantity) => {
				const currentItems = get().items;
				const itemToUpdate = currentItems.find((item) => item.id === productId);

				if (!itemToUpdate) return;

				const quantityDiff = quantity - itemToUpdate.quantity;
				const priceDiff = itemToUpdate.price * quantityDiff;

				if (quantity <= 0) {
					set((state) => ({
						items: state.items.filter((item) => item.id !== productId),
						totalItems: state.totalItems - itemToUpdate.quantity,
						totalPrice:
							state.totalPrice - itemToUpdate.price * itemToUpdate.quantity,
					}));
				} else {
					const updateItems = currentItems.map((item) =>
						item.id === productId ? { ...item, quantity } : item
					);

					set((state) => ({
						items: updateItems,
						totalItems: state.totalItems + quantityDiff,
						totalPrice: state.totalItems + priceDiff,
					}));
				}

				try {
					axios.post('http:localhost:3000/api/cart', {
						productId,
						quantity,
						action: 'update',
					});
				} catch (err: unknown) {
					console.error('Error syncing cart with server:', err);
				}
			},
			clearCart: () => {
				set({ items: [], totalItems: 0, totalPrice: 0 });

				try {
					axios.post(
						'http://localhost:3000/api/cart',
						{
							action: 'clear',
						},
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);
				} catch (err: unknown) {
					console.error('Error syncing cart with server:', err);
				}
			},

			getItemQuantity: (productId) => {
				const item = get().items.find((item) => item.id === productId);
				return item ? item.quantity : 0;
			},
		}),
		{
			name: 'shopping-cart',
		}
	)
);
