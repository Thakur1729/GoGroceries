'use client';
import { LoginButton } from '@/components/validationPage';
import { Modal } from './Modal';
import React from 'react';
import SearchBar from './searchbar';
import CartButton from './Cart/CartButton';

function Header() {
	// const [isLogInOpen, setIsLogInOpen] = React.useState(false);
	// const [isCartOpen, setIsCartOpen] = React.useState(false);
	const [activeButton, setActiveButton] = React.useState('');
	const [isModalOpen, setIsModalOpen] = React.useState(false);
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
		setIsModalOpen(true);
		// setIsLogInOpen(true);
		setActiveButton('login');
	};

	const handleCartClick = () => {
		console.log('Cart clicked');
		setIsModalOpen(true);
		// setIsLogInOpen(false);
		// setIsCartOpen(true);
		setActiveButton('cart');
	};

	const handleClose = () => {
		setIsModalOpen(false);
		// setIsCartOpen(false);
		setActiveButton('');
	};

	return (
		<div className={`w-full`}>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleClose}>
					{activeButton === 'login' && (
						<LoginButton
							activeButton={activeButton}
							setActiveButton={setActiveButton}
						/>
					)}
					{/* // Just try passing close function using context */}
					{activeButton === 'cart' && <CartButton onClose={handleClose} />}
				</Modal>
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
							className='bg-transparent transition w-20 h-10 mx-5 font-semibold'>
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
