'use client';
import { useState, useRef, useEffect } from 'react';

const CustomSortDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('relevance');
	const dropdownRef = useRef<HTMLDivElement>(null);

	const options = [
		{ value: 'relevance', label: 'Relevance' },
		{ value: 'price-low-high', label: 'Price (Low to high)' },
		{ value: 'price-high-low', label: 'Price (High to low)' },
		{ value: 'discount-high-low', label: 'Discount (High to low)' },
		{ value: 'name-a-z', label: 'Name (A to Z)' },
	];

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const selectOption = (value: string) => {
		setSelectedValue(value);
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='flex items-center gap-3 relative'>
			<span className='text-sm text-gray-600 font-medium'>Sort By</span>
			<div className='relative w-64' ref={dropdownRef}>
				<button
					type='button'
					className='flex items-center justify-between w-full px-4 py-2 text-sm border border-gray-200 rounded-md bg-white text-left focus:outline-none'
					onClick={toggleDropdown}>
					<span className='text-green-600 font-medium'>
						{options.find((option) => option.value === selectedValue)?.label ||
							'Relevance'}
					</span>
					<svg
						className={`w-5 h-5 text-green-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'>
						<path
							fillRule='evenodd'
							d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				{isOpen && (
					<div className='absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg'>
						<ul className='py-1'>
							{options.map((option) => (
								<li
									key={option.value}
									className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-0 ${
										selectedValue === option.value ? 'bg-green-50' : ''
									}`}
									onClick={() => selectOption(option.value)}>
									{selectedValue === option.value ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5 text-green-600 mr-3'
											viewBox='0 0 20 20'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									) : (
										<div className='w-5 h-5 mr-5'></div>
									)}
									<span
										className={`${selectedValue === option.value ? 'text-green-600 font-medium pl-3' : ''}`}>
										{option.label}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomSortDropdown;
