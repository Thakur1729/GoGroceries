'use client';
import React from 'react';
import { SubcategoryNavigation } from '@components/Porduct/subcategory-navigation';
import { ProductListing } from '@components/Porduct/product-listing';
import { useCategoryStore } from '@store/categoryStrore';
import { SubCategory } from '@/types/type';

function page() {
	const subCategories = useCategoryStore(
		(state) => state.subCategories as SubCategory[]
	);

	const allProducts = subCategories.flatMap((category) => category.products);

	return (
		<main className='flex min-h-screen'>
			<SubcategoryNavigation categories={subCategories} />
			<ProductListing title='Buy Milk Online' products={allProducts} />
		</main>
	);
}

export default page;
