'use client';

import { on } from 'events';
import React from 'react';
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
	const handleClick = () => {
		onClose && onClose();
	};

	return (
		<div
			onClick={handleClick}
			className='absolute min-h-[100dvh] overflow-hidden min-w-[100dvw] flex flex-col items-center justify-center z-10 m-2'>
			<div
				onClick={(e) => e.stopPropagation()}
				className='bg-white h-96 w-96 flex flex-col justify-center items-center py-10 rounded-md'>
				<h2 className='text-3xl font-bold mb-5'>Login or Signup</h2>
				<p className='w-52 flex flex-col text-center mb-5'>
					Get you groceries deliver in
					<span className='text-green-700'>minutes</span>
				</p>
				<form className='flex flex-col gap-3 w-72'>
					<input
						className='border-2 border-gray-600 rounded-md p-2'
						type='text'
						placeholder='Username'
					/>
					<input
						className='border-2 border-gray-600 rounded-md p-2'
						type='text'
						placeholder='Phone Number'
					/>
					<div className='flex justify-center items-center'>
						<button className='bg-green text-white font-semibold w-20 h-10 rounded-xl'>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
