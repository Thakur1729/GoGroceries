'use client';
import { useState, useRef, useEffect } from 'react';

const CustomSortDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('relevance');
	const dropdownRef = useRef<HTMLDivElement>(null);

	const options = [
		{ value: 'relevance', label: 'Relevance' },
		{ value: 'price-low-high', label: 'Price: Low to High' },
		{ value: 'price-high-low', label: 'Price: High to Low' },
		{ value: 'newest', label: 'Newest First' },
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
		<div className='flex items-center gap-2'>
			<span className='text-sm text-gray-500'>Sort By</span>
			<div className='relative w-full max-w-[180px]' ref={dropdownRef}>
				<button
					type='button'
					className='flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500'
					onClick={toggleDropdown}>
					<span>
						{options.find((option) => option.value === selectedValue)?.label ||
							'Relevance'}
					</span>
					<svg
						className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
					<div className='absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg'>
						<ul className='py-1 overflow-auto text-sm max-h-60'>
							{options.map((option) => (
								<li
									key={option.value}
									className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
										selectedValue === option.value
											? 'bg-gray-50 text-green-600'
											: ''
									}`}
									onClick={() => selectOption(option.value)}>
									{option.label}
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
