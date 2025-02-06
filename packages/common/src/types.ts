import {z} from 'zod';

export const UserPhoneNumberSchema = z.object({
  name: z.string().min(2).max(255),
  phoneNumber: z.string().min(10).max(13),
});

export const UserVerifySchema = z.object({
    phoneNumber: z.string().min(10).max(13),
    otp: z.string().min(4).max(4),
    });