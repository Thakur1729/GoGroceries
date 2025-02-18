import Image from 'next/image';
import React from 'react';

function ItemCard() {
	return (
		<div className='relative flex flex-col bg-white p-4 m-4 rounded-lg shadow-md h-auto w-auto'>
			<div>
				<div className='bg-blue-700 absolute left-8 w-9 h-8 px-1 pt-1.5 text-white'>
					25%
				</div>
				<Image
					src={'/item.avif'}
					alt='banner for latest sales'
					width={250}
					height={120}
					className='rounded-lg'
				/>
			</div>
			<span className='mt-0.5 font-semibold text-xs p-0.5 shadow w-fit'>
				15 MINS
			</span>
			<div className='flex flex-wrap w-64'>
				<h3 className='my-2 line-clamp-2 text-sm font-semibold'>
					Pear Beauty - South Africa (Nashpati)
				</h3>
			</div>
			<div className='flex justify-between mt-4'>
				<p className='ml-2 font-semibold flex flex-col text-sm'>
					<span>₹76</span>
					<span className='text-gray-600'>₹86</span>
					<div className='border-gray-500 border-b-2 -translate-y-2.5 '></div>
				</p>
				<button className='bg-green-200 text-green px-3 py-0.5 w-20 h-10 rounded-lg border-green border-2'>
					ADD
				</button>
			</div>
		</div>
	);
}

export default ItemCard;
