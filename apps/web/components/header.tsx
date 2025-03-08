'use client';
import { LoginButton } from '@/components/authPage';
import { Modal } from './Modal';
import React from 'react';
import SearchBar from './searchbar';
import { checkSession, logout } from '@/app/action';
import CartButton from './Cart/CartButton';

function Header() {
	const [activeButton, setActiveButton] = React.useState('');
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [location, setLocation] = React.useState<GeolocationPosition | null>(
		null
	);
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const [showAccountDropdown, setShowAccountDropdown] = React.useState(false);

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
		setIsModalOpen(true);
		setActiveButton('login');
	};

	const handleCartClick = () => {
		console.log('Cart clicked');
		setIsModalOpen(true);
		setActiveButton('cart');
	};

	const handleClose = () => {
		setIsModalOpen(false);
		setActiveButton('');
	};

	const handleAccountClick = () => {
		setShowAccountDropdown(!showAccountDropdown);
	};

	const handleLogout = () => {
		logout().then((res) => {
			if (res.success) {
				setIsLoggedIn(false);
				setShowAccountDropdown(false);
			}
		});
	};

	React.useEffect(() => {
		// Check if user is logged in from localStorage, cookies, or context
		// This is just a placeholder - replace with your actual auth check
		const checkLoginStatus = () => {
			const authenticated = document.cookie.includes('authenticated=true');

			if (authenticated) {
				checkSession().then((result) => {
					setIsLoggedIn(result.isAuthenticated);
				});
			}
		};
		checkLoginStatus();
	}, []);

	// When login is successful, you should set isLoggedIn to true
	// This could be done in your LoginButton component by passing a callback

	return (
		<div className={`w-full`}>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleClose}>
					{activeButton === 'login' && (
						<LoginButton
							activeButton={activeButton}
							setActiveButton={setActiveButton}
							onClose={handleClose}
						/>
					)}
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
						{!isLoggedIn ? (
							<button
								onClick={handleLoginClick}
								className='bg-transparent transition w-20 h-10 mx-5 font-semibold'>
								Login
							</button>
						) : (
							<div className='relative'>
								<button
									onClick={handleAccountClick}
									className='bg-transparent transition w-28 h-10 mx-5 font-semibold flex items-center justify-center'>
									<span className='mr-2'>Account</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className={`transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`}>
										<polyline points='6 9 12 15 18 9'></polyline>
									</svg>
								</button>
								{showAccountDropdown && (
									<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
										<a
											href='/profile'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
											My Profile
										</a>
										<a
											href='/orders'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
											My Orders
										</a>
										<a
											href='/address'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
											Addresses
										</a>
										<button
											onClick={handleLogout}
											className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'>
											Logout
										</button>
									</div>
								)}
							</div>
						)}
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
