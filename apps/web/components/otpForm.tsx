import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface OTPFormProps {
	onClose: () => void;
}

// getting onClose from loginForm.tsx
function OTPForm({ onClose }: OTPFormProps) {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [otp, setOtp] = React.useState('');
	// const cookieStore = await cookies(); // can not access cookie in client side
	const router = useRouter();

	const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await axios.post('http://localhost:3000/api/verify', {
				otp: otp,
			});

			if (response.status === 200) {
				toast.success(response.data.message, {
					closeOnClick: true,
					position: 'top-center',
					type: 'success',
				});
				onClose();
				router.push('/');
			} else {
				toast.error(response.data.message, {
					closeOnClick: true,
					position: 'top-center',
					type: 'error',
				});
				setError(response.data.message);
			}
		} catch (error) {
			setError('Failed to verify OTP');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='flex flex-col gap-3 w-72' onSubmit={handleVerify}>
			<input
				className='border-2 border-gray-600 rounded-md p-2'
				type='text'
				placeholder='OTP'
				required
				onChange={(e) => setOtp(e.target.value)}
			/>
			{error && <p className='text-red-500 m-2'>{error}</p>}
			<div className='flex justify-center items-center'>
				<button
					className={`${loading ? 'bg-green-400' : 'bg-green'}  text-white font-semibold w-20 h-10 rounded-xl`}
					type='submit'
					disabled={loading}>
					{loading ? 'Verifying...' : 'Verify'}
				</button>
			</div>
		</form>
	);
}

export default OTPForm;
