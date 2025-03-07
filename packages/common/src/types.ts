import { z } from 'zod';

export const UserPhoneNumberSchema = z.object({
	name: z
		.string()
		.min(2, 'Minimum 2 characters required')
		.max(255, 'Maximum 255 characters allowed'),
	phoneNumber: z
		.string()
		.min(10, 'Phone number must contains 10 no.')
		.max(10, 'Phone number must be 10 digits long'),
});

export const UserVerifySchema = z.object({
	otp: z
		.string()
		.min(4, 'OTP contains 4 number only')
		.max(4, 'OTP contains 4 number only'),
});
