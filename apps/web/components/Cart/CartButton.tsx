import React, { useEffect } from 'react';
import { X } from '@repo/ui/lucide-react';
import CartItemCard from './CartItemCard';
// import BillDetails from './BillDetails';
import { useCartStore } from '@/store/categoryStrore';

function CartButton({ onClose }: { onClose: () => void }) {
	const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
		useCartStore();

	if (items.length === 0) {
		return (
			<div className='absolute right-0 bg-white w-96 h-dvh overflow-y-scroll'>
				<div className='h-15'>
					<div className='absolute right-4 top-5'>
						<X onClick={onClose} />
					</div>
					<p className='absolute left-4 top-5 text-lg font-bold'>My Cart</p>
				</div>

				<div className='flex justify-center items-center bg-gray-200 m-2 h-auto rounded-sm py-2 text-5xl'>
					<div>No Item is added</div>
				</div>
			</div>
		);
	}
	console.log(items);
	return (
		<div className='absolute right-0 bg-white w-96 h-dvh overflow-y-scroll'>
			<div className='h-15'>
				<div className='absolute right-4 top-5'>
					<X onClick={onClose} />
				</div>
				<p className='absolute left-4 top-5 text-lg font-bold'>My Cart</p>
			</div>
			<div className='bg-gray-50 p-1 overflow-y-auto'>
				<div className='flex justify-between items-center p-4 bg-blue-200 m-3 rounded-3xl font-semibold h-10'>
					<p className='text-blue-700 pl-3'>Your total saving</p>
					<p className='text-blue-700 pr-3'>{totalItems % 25}</p>
				</div>
			</div>
			<div className='bg-gray-200 m-2 h-auto rounded-sm py-2'>
				{items &&
					items.map((item) => {
						return (
							<CartItemCard
								key={item.id}
								products={item}
								updateQuantity={updateQuantity}
								removeFromCart={removeFromCart}
							/>
						);
					})}
			</div>
			<div className='mt-4 pt-4 border-t'>
				<div className='flex justify-between items-center mb-4'>
					<span className='font-medium'>Subtotal:</span>
					<span className='font-semibold'>₹{totalPrice.toFixed(2)}</span>
				</div>

				<button className='w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium'>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}

export default CartButton;
