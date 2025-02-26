import React from 'react';
import { X } from '@repo/ui/lucide-react';
import CartItemCard from './CartItemCard';

function CartButton({ onClose }: { onClose: () => void }) {
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
					<p className='text-blue-700 pr-3'>₹24</p>
				</div>
			</div>
			<div className='bg-gray-200 m-2 h-auto rounded-sm py-2'>
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
			</div>
		</div>
	);
}

export default CartButton;
