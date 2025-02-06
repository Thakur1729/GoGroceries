import { generateToken, verifyToken as zVerifyToken } from 'authenticator';

type TokenType = 'USER_AUTH' | 'ADMIN_AUTH';

export const getToken = (phoneNumber: string, type: TokenType) => {
	return generateToken(phoneNumber + type + process.env.OTP_SECURE_SECRET);
};

export const verifyToken = (pnumber: string, type: TokenType, otp: string) => {
	return zVerifyToken(pnumber + type + process.env.OTP_SECURE_SECRET, otp);
};
