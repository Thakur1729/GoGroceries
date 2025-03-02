import React from 'react';

const GroceryCategories = () => {
	const categories = [
		{
			id: 2,
			name: 'Dairy, Bread & Eggs',
			image: 'https://placehold.co/200x200',
		},
		{
			id: 3,
			name: 'Fruits & Vegetables',
			image: 'https://placehold.co/200x200',
		},
		{
			id: 4,
			name: 'Cold Drinks & Juices',
			image: 'https://placehold.co/200x200',
		},
		{ id: 5, name: 'Snacks & Munchies', image: 'https://placehold.co/200x200' },
		{
			id: 6,
			name: 'Breakfast & Instant Food',
			image: 'https://placehold.co/200x200',
		},
		{ id: 7, name: 'Sweet Tooth', image: 'https://placehold.co/200x200' },
		{ id: 8, name: 'Bakery & Biscuits', image: 'https://placehold.co/200x200' },
		{
			id: 9,
			name: 'Tea, Coffee & Health Drink',
			image: 'https://placehold.co/200x200',
		},
		{ id: 10, name: 'Atta, Rice & Dal', image: 'https://placehold.co/200x200' },
		{
			id: 11,
			name: 'Masala, Oil & More',
			image: 'https://placehold.co/200x200',
		},
		{ id: 12, name: 'Sauces & Spreads', image: 'https://placehold.co/200x200' },
		{
			id: 14,
			name: 'Organic & Healthy Living',
			image: 'https://placehold.co/200x200',
		},
		{ id: 15, name: 'Baby Care', image: 'https://placehold.co/200x200' },
		{
			id: 16,
			name: 'Pharma & Wellness',
			image: 'https://placehold.co/200x200',
		},
		{
			id: 17,
			name: 'Cleaning Essentials',
			image: 'https://placehold.co/200x200',
		},
		{ id: 18, name: 'Home & Office', image: 'https://placehold.co/200x200' },
		{ id: 19, name: 'Personal Care', image: 'https://placehold.co/200x200' },
		{ id: 20, name: 'Pet Care', image: 'https://placehold.co/200x200' },
	];

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4'>
				{categories.map((category) => (
					<div key={category.id} className='flex flex-col items-center'>
						<div className='bg-gray-100 rounded-lg p-4 mb-2 w-full'>
							<img
								src={category.image}
								alt={category.name}
								className='w-full h-24 object-contain mx-auto'
							/>
						</div>
						<p className='text-center text-sm font-medium'>{category.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default GroceryCategories;
