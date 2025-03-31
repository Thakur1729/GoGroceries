import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import OTPForm from './otpForm';
import { toast } from '@repo/ui/sooner';

//getting otpPage, setOtpPage, onClose from authPage.tsx
function LoginForm({
	otpPage,
	setOtpPage,
	onClose,
}: {
	otpPage: boolean;
	setOtpPage: (otpPage: boolean) => void;
	onClose: () => void;
}) {
	const [user, setUser] = useState({
		username: '',
		phone: '',
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess(false);

		try {
			const response = await axios.post('http://localhost:3000/api/accounts', {
				name: user.username,
				phoneNumber: user.phone,
			});

			console.log(response);
			if (response.status === 200) {
				setSuccess(true);
				setOtpPage(true);
				toast.success(response.data.message, {
					position: 'top-right',
				});
			} else {
				toast.error('Try again Please', {
					position: 'top-right',
				});
				setError('Failed to send OTP');
			}
		} catch (error) {
			setError('Failed to send OTP');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log(otpPage);
	}, [otpPage]);

	return (
		<>
			{otpPage ? (
				<OTPForm onClose={onClose} />
			) : (
				<form className='flex flex-col gap-3 w-72' onSubmit={handleSubmit}>
					<input
						name='username'
						className='border-2 border-gray-600 rounded-md p-2'
						type='text'
						placeholder='Username'
						required
						onChange={(e) => setUser({ ...user, username: e.target.value })}
					/>
					<input
						name='phone number'
						className='border-2 border-gray-600 rounded-md p-2'
						type='text'
						placeholder='Phone Number'
						required
						onChange={(e) => setUser({ ...user, phone: e.target.value })}
					/>
					{error && <p className='text-red-500 m-2'>{error}</p>}
					<div className='flex justify-center items-center'>
						<button
							className={`flex justify-center items-center bg-green text-white font-semibold w-24 h-10 p-3 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
							type='submit'
							disabled={loading}>
							{loading ? 'Sending...' : 'Send OTP'}
						</button>
					</div>
				</form>
			)}
		</>
	);
}

export default LoginForm;
