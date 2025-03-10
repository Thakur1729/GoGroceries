'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getEnabledCategories } from 'trace_events';

interface CategoryModal {
	id: number;
	name: string;
	image: string;
}

const GroceryCategories = () => {
	const [categories, setCategories] = useState<CategoryModal[] | null>(null);

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/categories'
				);
				if (response) setCategories(response.data.data);
			} catch (e: any) {
				console.error(e);
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
							className='flex flex-col items-center h-full w-auto'>
							<div className='bg-gray-100 rounded-lg w-[128px] h-[188px]'>
								<img
									src={category.image}
									alt={category.name}
									className='w-fit h-fit object-contain mx-auto'
								/>
							</div>
							{/* <p className='text-center text-sm font-medium'>{category.name}</p> */}
						</div>
					))}
			</div>
		</div>
	);
};

export default GroceryCategories;
