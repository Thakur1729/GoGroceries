import { Product } from '@/types/type';
import React from 'react';
import { useCartStore } from '@/store/categoryStrore';

const ItemCard = ({
	product,
	deliveryTime = '10min',
}: {
	product: Product;
	deliveryTime?: string;
}) => {
	const { addToCart, removeFromCart, getItemQuantity } = useCartStore();
	const quantity = getItemQuantity(product.id);

	return (
		<div className='min-w-[200px] p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2'>
			<img
				src={product.image[0]?.imageLink || 'https://placehold.co/600x400/png'}
				alt={product.image[0]?.alt || product.prodName}
				className='w-full h-40 object-contain mb-2'
			/>
			<div className='text-sm text-gray-500'>{deliveryTime}</div>
			<h3 className='font-medium text-gray-900 leading-tight'>
				{product.prodName}
			</h3>
			<div className='flex justify-between mt-auto items-center'>
				<p className='ml-2 font-semibold flex flex-col text-sm'>
					<span>₹{product.price}</span>
					<span className='text-gray-600'>₹{product.mrp}</span>
					<span className='border-gray-500 border-b-2 -translate-y-2.5'></span>
				</p>

				{quantity === 0 ? (
					<button
						className='px-4 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50 text-sm font-medium'
						onClick={() => addToCart(product)}>
						ADD
					</button>
				) : (
					<div className='flex items-center bg-green-600 text-white rounded h-8'>
						<button
							className='px-2 h-full flex items-center justify-center font-bold text-lg'
							onClick={() => removeFromCart(product.id)}>
							-
						</button>
						<span className='px-3'>{quantity}</span>
						<button
							className='px-2 h-full flex items-center justify-center font-bold text-lg'
							onClick={() => addToCart(product)}>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemCard;
