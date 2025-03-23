'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@store/categoryStrore';

interface CategoryModal {
	id: number;
	name: string;
	image: string;
}

const GroceryCategories = () => {
	const [categories, setCategories] = useState<CategoryModal[] | null>(null);

	const { subCategories, fetchSubCategories } = useCategoryStore();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	// Pass categoryId as parameter to the function
	async function handleCategoryClick(categoryId: number, categoryName: string) {
		try {
			setLoading(true);
			const response = await fetchSubCategories(categoryId);
			const currentSubCategories = useCategoryStore.getState().subCategories;
			if (response?.success) {
				const formattedCatName = categoryName.replace(/\s+/g, '-');
				router.push(
					`/cn/${formattedCatName}/sc/${currentSubCategories[0]?.name.replace(/\s+/g, '-')}`
				);
			} else {
				setError('No subcategories found');
			}
		} catch (e: any) {
			setError(e.message || 'Failed to fetch subcategories');
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/categories'
				);
				if (response) setCategories(response.data.data);
			} catch (e: any) {
				console.error(e);
				setError(e.message || 'Failed to fetch categories');
			}
		};

		getCategories();
	}, []);

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4'>
				{categories &&
					categories.map((category) => (
						<div
							key={category.id}
							onClick={() => handleCategoryClick(category.id, category.name)}
							className='flex flex-col items-center h-full w-auto cursor-pointer hover:opacity-80 transition-opacity'>
							<div className='bg-gray-100 rounded-lg w-[128px] h-[188px]'>
								<img
									src={category.image}
									alt={category.name}
									className='w-fit h-fit object-contain mx-auto'
								/>
							</div>
						</div>
					))}
			</div>

			{loading && <p className='text-center mt-4'>Loading subcategories...</p>}
			{error && <p className='text-center mt-4 text-red-500'>{error}</p>}
		</div>
	);
};

export default GroceryCategories;
