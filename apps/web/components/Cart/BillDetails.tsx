import React from 'react';
import { ChevronDown, ChevronUp, Truck, Shield, Info } from 'lucide-react';

const BillDetails = ({
	subtotal = 104,
	deliveryCharge = 30,
	handlingCharge = 3,
	currency = '₹',
	showDetails = true,
	onToggleDetails = () => {},
}) => {
	const grandTotal = subtotal + deliveryCharge + handlingCharge;

	return (
		<div className='bg-gray-50 rounded-lg p-4 w-full max-w-md'>
			<h2 className='text-xl font-bold text-gray-800 mb-3'>Bill details</h2>

			<div className='space-y-3'>
				{/* Subtotal row with toggle */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<span className='text-gray-700'>Sub total</span>
						<button
							onClick={() => onToggleDetails()}
							className='p-1 rounded-full hover:bg-gray-200'>
							{showDetails ? (
								<ChevronUp size={16} />
							) : (
								<ChevronDown size={16} />
							)}
						</button>
					</div>
					<span className='font-medium'>
						{currency}
						{subtotal}
					</span>
				</div>

				{/* Delivery charge row */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<span className='text-gray-700'>Delivery charge</span>
						<button className='p-1 rounded-full hover:bg-gray-200'>
							<Info size={14} />
						</button>
					</div>
					<span className='font-medium'>
						{currency}
						{deliveryCharge}
					</span>
				</div>

				{/* Handling charge row */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<span className='text-gray-700'>Handling charge</span>
						<button className='p-1 rounded-full hover:bg-gray-200'>
							<Info size={14} />
						</button>
					</div>
					<span className='font-medium'>
						{currency}
						{handlingCharge}
					</span>
				</div>

				{/* Divider */}
				<div className='border-t border-gray-200 my-2'></div>

				{/* Grand total */}
				<div className='flex items-center justify-between'>
					<span className='font-bold text-gray-800'>Grand total</span>
					<span className='font-bold text-gray-800'>
						{currency}
						{grandTotal}
					</span>
				</div>
			</div>
		</div>
	);
};

export default BillDetails;
