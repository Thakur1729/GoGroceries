'use client';

import React from 'react';
import { useState } from 'react';
import LoginForm from './loginForm';

interface ModalProps {
	onClose: () => void;
	activeButton: string;
	setActiveButton: (name: string) => void;
}

export function LoginButton({
	onClose,
	activeButton,
	setActiveButton,
}: ModalProps) {
	const [otpPage, setOtpPage] = useState(false);

	const handleClick = () => {
		onClose && onClose();
	};

	// useEffect(() => {
	// 	console.log(otpPage);
	// }, [setOtpPage]);

	return (
		<div
			onClick={handleClick}
			className='absolute min-h-[100dvh] overflow-hidden min-w-[100dvw] flex flex-col items-center justify-center z-10 m-2'>
			<div
				onClick={(e) => e.stopPropagation()}
				className='bg-white h-96 w-96 flex flex-col justify-center items-center py-10 rounded-md'>
				<h2 className='text-3xl font-bold mb-5'>
					{otpPage ? 'Enter OTP Here' : 'Login or Signup'}
				</h2>
				<p className='w-52 flex flex-col text-center mb-5'>
					Get you groceries deliver in
					<span className='text-green-700'>minutes</span>
				</p>
				{activeButton === 'login' && (
					<LoginForm otpPage={otpPage} setOtpPage={setOtpPage} />
				)}
			</div>
		</div>
	);
}
