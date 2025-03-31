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
		.max(6, 'OTP contains 4 number only'),
});

export const CategorySchema = z.object({
	name: z
		.string()
		.min(2, 'Minimum 2 characters required')
		.max(255, 'Maximum 255 characters allowed'),
	image: z.string().min(6, 'Link is too short'),
});

export const SubCategorySchema = z.object({
	name: z
		.string()
		.min(2, 'Minimum 2 characters required')
		.max(255, 'Maximum 255 characters allowed'),
	image: z.string().min(6, 'Link is too short'),
	categoryId: z.number(),
});

export const ProductSchema = z.object({
	prodName: z
		.string()
		.min(2, 'Minimum 2 characters required')
		.max(255, 'Maximum 255 characters allowed'),
	prodDescription: z
		.string()
		.min(10, 'Minimum 10 characters required')
		.max(1000, 'Maximum 255 characters allowed'),
	// discounted price
	price: z.number().min(1, 'Price must be greater than 0'),
	mrp: z.number().min(1, 'Price must be greater than 0'),
	stock: z.number().min(1, 'Stock must be greater than 0'),
	unit: z.string().min(1, 'Unit must be greater than 0 characters'),
	subCategoryId: z.number(),
});
