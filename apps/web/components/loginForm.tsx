import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
	const [user, setUser] = useState({
		username: '',
		phone: '',
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	interface ApiResponse {
		status: number;
	}

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess(false);

		try {
			const response: ApiResponse = await axios.post(
				'http://localhost:3000/api/accounts',
				{
					name: user.username,
					phoneNumber: user.phone,
				}
			);

			console.log(response);
			if (response.status === 200) {
				setSuccess(true);
			} else {
				setError('Failed to send OTP');
			}
		} catch (error) {
			setError('Failed to send OTP');
		}

		setLoading(false);
	};

	return (
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
				<button className='bg-green text-white font-semibold w-20 h-10 rounded-xl'>
					{loading ? 'Sending OTP...' : 'Send OTP'}
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
