'use client';
// import { Button } from '@repo/ui/button';
import { LoginButton } from '@/components/validationPage';
import { useEffect } from 'react';
import React from 'react';
import SearchBar from './searchbar';

function Header() {
	const [isLogInOpen, setIsLogInOpen] = React.useState(false);
	const [isCartOpen, setIsCartOpen] = React.useState(false);
	const [activeButton, setActiveButton] = React.useState('');
	const [location, setLocation] = React.useState<GeolocationPosition | null>(
		null
	);

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) =>
				setLocation(position)
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}

	const handleLoginClick = () => {
		// console.log('Login clicked');
		setIsLogInOpen(true);
		setActiveButton('login');
	};

	const handleCartClick = () => {
		console.log('Cart clicked');
		setIsCartOpen(true);
		setActiveButton('cart');
	};

	const handleClose = () => {
		setIsLogInOpen(false);
		setIsCartOpen(false);
		setActiveButton('');
	};

	useEffect(() => {
		if (isLogInOpen || isCartOpen) {
			document.body.style.backgroundColor = '#4A4A4A';
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.backgroundColor = '';
			document.body.style.overflow = 'auto';
		}
	}, [isLogInOpen, isCartOpen]);

	return (
		<div className={`w-full`}>
			{isLogInOpen && (
				<LoginButton
					onClose={handleClose}
					activeButton={activeButton}
					setActiveButton={setActiveButton}
				/>
			)}
			{isCartOpen && (
				<LoginButton
					onClose={handleClose}
					activeButton={activeButton}
					setActiveButton={setActiveButton}
				/>
			)}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
				<header className='bg-primary flex justify-between items-center h-16'>
					<div className='flex items-center'>
						<h1 className='font-bold text-3xl text-green mx-2 border-r-4 border-gray-400 pr-3'>
							<span className='text-amber-300'>Go</span>Groceries
						</h1>
						<div className='flex flex-col text-sm'>
							<span>Delivery in 8 min.</span>
							<span className='line-clamp-1'>
								{'QJ9C+Q7V, Kharar, Punjab 140301'}
							</span>
						</div>
					</div>
					<div>
						<SearchBar />
					</div>
					<div className='flex gap-3'>
						<button
							onClick={handleLoginClick}
							className='bg-transparent outline-cyan-500 transition hover:outline-2 w-20 h-10 mx-5 font-semibold'>
							Login
						</button>
						<button
							onClick={handleCartClick}
							className='bg-green text-white font-semibold w-20 h-10 rounded-xl'>
							Add Cart
						</button>
					</div>
				</header>
			</div>
			<div />
		</div>
	);
}

export default Header;
