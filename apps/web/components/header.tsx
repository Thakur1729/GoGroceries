'use client';
// import { Button } from '@repo/ui/button';
import { LoginButton } from '@/components/loginButton';
import { useEffect } from 'react';
import React from 'react';

function Header() {
	const [isLogInOpen, setIsLogInOpen] = React.useState(false);
	const [isCartOpen, setIsCartOpen] = React.useState(false);
	const [activeButton, setActiveButton] = React.useState('');

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
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<header className='bg-primary flex justify-between items-center h-16'>
					<h1 className='font-bold text-3xl !mx-4'>GoGroceries</h1>
					<div>
						<span>Delivery in 8 min.</span>
					</div>
					<div>{/* <Search /> */}</div>
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
