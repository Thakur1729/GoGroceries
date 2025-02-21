'use client';

import React from 'react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@repo/ui/lucide-react';
import ItemCard from './ItemCard';

const ProductSlider = () => {
	const scrollRef = useRef<HTMLDivElement | null>(null);

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const scrollAmount = direction === 'left' ? -400 : 400;
			scrollRef.current.scrollBy({
				left: scrollAmount,
				behavior: 'smooth',
			} as ScrollToOptions);
		}
	};

	const products = [
		{
			title: 'Dollar Pre-rolled Rolling Paper by Bongchie',
			price: '60',
			quantity: '3 packs',
			deliveryTime: '9 MINS',
		},
		{
			title: 'Perfect Rolled Cones (Natural) - Bongchie',
			price: '45',
			quantity: '3 pack',
			deliveryTime: '9 MINS',
		},
		{
			title: 'Ultimate Rolling Paper with Filter Tips',
			price: '90',
			quantity: '1 pack (32 pieces)',
			deliveryTime: '9 MINS',
		},
		{
			title: 'Brown Rolling Paper Cones - Stash Pro',
			price: '90',
			quantity: '6 pieces',
			deliveryTime: '9 MINS',
		},
		{
			title: 'Brown Rolling Paper (Small) - Stash Pro',
			price: '45',
			quantity: '1 pack (40 pieces)',
			deliveryTime: '9 MINS',
		},
		{
			title: 'Brown Ripper Rolling Paper 32 Leaves',
			price: '120',
			quantity: '1 pack (64 pieces)',
			deliveryTime: '9 MINS',
		},
	];

	return (
		<div className='relative max-w-7xl mx-auto'>
			<div className='flex items-center'>
				<button
					onClick={() => scroll('left')}
					className={`absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 ${scrollRef.current}`}>
					<ChevronLeft className='w-6 h-6' />
				</button>

				<div
					ref={scrollRef}
					className='flex gap-4 overflow-x-auto py-4 px-8 scroll-smooth no-scrollbar'
					style={{
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
					}}>
					{products.map((product, index) => (
						<ItemCard key={index} {...product} />
					))}
				</div>

				<button
					onClick={() => scroll('right')}
					className='absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50'>
					<ChevronRight className='w-6 h-6' />
				</button>
			</div>
		</div>
	);
};

export default ProductSlider;
