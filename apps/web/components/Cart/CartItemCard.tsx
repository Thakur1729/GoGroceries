import React from 'react';

function CartItemCard() {
	return (
		<div className='grid grid-cols-12 gap-2 my-2 font-semibold h-auto'>
			<div className='col-span-3 flex justify-center items-center'>
				<img
					src='https://placehold.co/100x100'
					alt='product'
					className='object-contain w-18 h-12'
				/>
			</div>
			<div className='col-span-5'>
				<p>
					<span className='text-sm font-semibold'>Product Name</span>
					<br />
					<span className='text-xs text-gray-600'>148 g</span>
					<br />
					<div className='flex flex-row items-center'>
						<span className='text-xs'>₹100</span>
						<div className='flex flex-row items-center justify-center'>
							<span className='text-xs ml-1 text-gray-600'>₹50</span>
							<span className='border-gray-900 border-b-2 w-5 -translate-x-5 translate-y-[1px]'></span>
						</div>
					</div>
				</p>
			</div>
			<div className='col-span-4 flex justify-center items-center'>
				<button className='flex justify-center items-center bg-green-700 text-white p-2 rounded-sm gap-4 cursor-pointer'>
					<span className='m-auto p-auto'>-</span>
					<span className='m-auto p-auto'>1</span>
					<span className='m-auto p-auto'>+</span>
				</button>
			</div>
		</div>
	);
}

export default CartItemCard;
