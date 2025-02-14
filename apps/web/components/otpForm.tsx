import React from 'react';

function OTPForm() {
	return (
		<form className='flex flex-col gap-3 w-72'>
			<input
				className='border-2 border-gray-600 rounded-md p-2'
				type='text'
				placeholder='OTP'
				required
			/>
			<div className='flex justify-center items-center'>
				<button className='bg-green text-white font-semibold w-20 h-10 rounded-xl'>
					Verify
				</button>
			</div>
		</form>
	);
}

export default OTPForm;
