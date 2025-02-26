import React from 'react';

const ProductCategoriesBanner = () => {
	const categories = [
		{
			id: 1,
			title: 'Pharmacy at your doorstep!',
			subtitle: 'Cough syrups, pain relief sprays & more',
			buttonText: 'Order Now',
			bgColor:
				'https://t4.ftcdn.net/jpg/04/58/20/29/360_F_458202955_4djRKZYmv7u3Ap6hRAQz5hfxZmR4Q0AD.jpg',
			textColor: 'text-black',
		},
		{
			id: 2,
			title: 'Pet Care supplies in minutes',
			subtitle: 'Food, treats, toys & more',
			buttonText: 'Order Now',
			bgColor:
				'https://as1.ftcdn.net/v2/jpg/06/21/04/62/1000_F_621046234_5o3yVtMaEKBqwQuqVYvK6hjHzifyY0qy.jpg',
			textColor: 'text-[#3C3CA3]',
		},
		{
			id: 3,
			title: 'No time for a diaper run?',
			subtitle: 'Get baby care essentials in minutes',
			buttonText: 'Order Now',
			bgColor:
				'https://as1.ftcdn.net/v2/jpg/01/64/51/72/1000_F_164517233_FCFEkJWxxezWOa9zz1W9fjcA12CTtPIz.jpg',
			textColor: 'text-white',
		},
	];

	return (
		<div className='flex flex-wrap gap-4 max-w-7xl mx-20'>
			{categories.map((category) => (
				<div
					key={category.id}
					style={{
						backgroundImage: `url(${category.bgColor})`,
						backgroundSize: 'cover', // Changed from 'cover' to 'contain'
						backgroundRepeat: 'no-repeat', // Added to prevent repeating of the image
						backgroundPosition: 'center', // Added to center the image within the container
					}}
					className={`relative overflow-hidden rounded-lg ${category.textColor} w-full md:w-80 h-56 p-6 flex flex-col justify-between`}>
					<div>
						<h2 className='text-2xl font-bold mb-2 tracking-tighter'>
							{category.title}
						</h2>
						<p className='text-lg'>{category.subtitle}</p>
					</div>

					<button
						className={`mt-4 w-32 py-2 px-4 rounded-full ${category.id === 1 ? 'bg-white text-teal-500' : category.id === 2 ? 'bg-[#3C3CA3] text-white' : 'bg-[#D6D402] text-white'} font-medium`}>
						{category.buttonText}
					</button>
				</div>
			))}
		</div>
	);
};

export default ProductCategoriesBanner;
