'use client';
import React, { useState } from 'react';

function CartItemCard({
	products,
	removeFromCart,
	updateQuantity,
}: {
	products: any;
	removeFromCart: any;
	updateQuantity: any;
}) {
	const textRef = React.useRef<HTMLSpanElement>(null);
	const [lineWidth, setLineWidth] = useState(0);

	React.useEffect(() => {
		if (textRef.current) {
			setLineWidth(textRef.current.offsetWidth);
		}
	}, [products.mrp]);

	return (
		<div className='grid grid-cols-12 gap-2 my-2 font-semibold h-auto'>
			<div className='col-span-3 flex justify-center items-center'>
				<img
					src={
						products.image[0]?.imageLink || 'https://placehold.co/600x400/png'
					}
					alt={products.prodName}
					className='object-contain w-18 h-12'
				/>
			</div>
			<div className='col-span-5'>
				<div>
					<span className='text-sm font-semibold'>{products.prodName}</span>
					<br />
					<span className='text-xs text-gray-600'>{products.unit}</span>
					<br />
					<div className='flex flex-row items-center'>
						<span className='text-xs'>{products.price}</span>
						<div className='flex flex-row items-center justify-center'>
							<span ref={textRef} className='text-xs ml-1 text-gray-600'>
								{products.mrp}
							</span>
							<span
								className='border-gray-900 border-b-2 translate-x-0.5'
								style={{
									width: `${lineWidth}px`,
									position: 'absolute',
								}}></span>
						</div>
					</div>
				</div>
			</div>
			<div className='col-span-4 flex justify-center items-center'>
				<div className='flex justify-center items-center bg-green-700 text-white rounded-sm overflow-hidden'>
					<button
						className='w-10 h-full py-2 flex justify-center items-center cursor-pointer hover:bg-green-600 transition-colors'
						// onClick={handleQtyDec}
						aria-label='Decrease quantity'
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							e.stopPropagation();
							removeFromCart(products.id);
							return;
						}}
						disabled={products.quantity === 0}>
						-
					</button>
					<span className='px-2'>{products.quantity}</span>
					<button
						className='w-10 h-full py-2 flex justify-center items-center cursor-pointer hover:bg-green-600 transition-colors'
						// onClick={handleQtyInc}
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							e.stopPropagation();
							updateQuantity(products.id, products.quantity + 1);
							return;
						}}
						aria-label='Increase quantity'>
						+
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartItemCard;
