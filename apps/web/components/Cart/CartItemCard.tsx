import React from 'react';

function CartItemCard() {
	const [quantity, setQuantity] = React.useState(0);

	function handleQtyDec(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setQuantity((prevQty) => Math.max(0, prevQty - 1));
	}

	function handleQtyInc(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setQuantity((prevQty) => prevQty + 1);
	}

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
				<div>
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
				</div>
			</div>
			<div className='col-span-4 flex justify-center items-center'>
				<div className='flex justify-center items-center bg-green-700 text-white rounded-sm overflow-hidden'>
					<button
						className='w-10 h-full py-2 flex justify-center items-center cursor-pointer hover:bg-green-600 transition-colors'
						onClick={handleQtyDec}
						aria-label='Decrease quantity'
						disabled={quantity === 0}>
						-
					</button>
					<span className='px-2'>{quantity}</span>
					<button
						className='w-10 h-full py-2 flex justify-center items-center cursor-pointer hover:bg-green-600 transition-colors'
						onClick={handleQtyInc}
						aria-label='Increase quantity'>
						+
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartItemCard;
