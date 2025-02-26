import React from 'react';

const ItemCard = ({
	title,
	price,
	quantity,
	deliveryTime,
	imageUrl,
}: {
	title: string;
	price: string;
	quantity: string;
	deliveryTime: string;
	imageUrl?: string;
}) => (
	<div className='min-w-[200px] p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2'>
		<img
			src={imageUrl || 'https://placehold.co/200x200'}
			alt={title}
			className='w-full h-40 object-contain mb-2'
		/>
		<div className='text-sm text-gray-500'>{deliveryTime}</div>
		<h3 className='font-medium text-gray-900 leading-tight'>{title}</h3>
		<div className='text-sm text-gray-600'>{quantity}</div>
		<div className='flex justify-between mt-auto items-center'>
			<p className='ml-2 font-semibold flex flex-col text-sm'>
				<span>₹76</span>
				<span className='text-gray-600'>₹86</span>
				<span className='border-gray-500 border-b-2 -translate-y-2.5 '></span>
			</p>
			<button className='px-4 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50 text-sm font-medium'>
				ADD
			</button>
		</div>
	</div>
);
export default ItemCard;
