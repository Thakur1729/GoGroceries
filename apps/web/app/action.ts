'use server';
import { error } from 'console';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export type UserSessionType = {
	userId: number;
	cookieType: 'LOGIN' | 'VERIFYED';
	phoneNumber: string;
};

export async function createLogInCookie(
	userid: number,
	phoneNumber: string,
	cookieType: 'LOGIN' | 'VERIFYED'
) {
	const cookieStore = await cookies();

	const token = jwt.sign(
		{
			userId: userid,
			cookieType: cookieType,
			phoneNumber: phoneNumber,
		},
		process.env.JWT_PASSWORD || 'mysecret'
	);

	cookieStore.set({
		name: 'token',
		value: `Bearer ${token}`,
		maxAge: 30 * 24 * 60 * 60,
		httpOnly: true,
		path: '/',
	});
}

export async function createVerifyCookie(
	userid: number,
	phoneNumber: string,
	cookieType: 'LOGIN' | 'VERIFYED'
) {
	const cookieStore = await cookies();

	const token = jwt.sign(
		{
			userId: userid,
			cookieType: cookieType,
			phoneNumber: phoneNumber,
		},
		process.env.JWT_PASSWORD || 'mysecret'
	);

	// clear the token cookie after getting the otp
	cookieStore.set({
		name: 'token',
		value: '',
		maxAge: 0,
		httpOnly: true,
		path: '/',
	});

	// setting up the session cookie for the user
	cookieStore.set({
		name: 'session',
		value: `Bearer ${token}`,
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60,
		path: '/',
	});

	cookieStore.set({
		name: 'authenticated',
		value: 'true',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		httpOnly: false,
		path: '/',
	});
}

export async function checkSession() {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get('session')?.value.split(' ')[1];

	if (!sessionToken) {
		return { isAuthenticated: false };
	}

	try {
		const decode: UserSessionType = (await jwt.verify(
			sessionToken,
			process.env.JWT_PASSWORD || 'mysecret'
		)) as {
			userId: number;
			cookieType: 'LOGIN' | 'VERIFYED';
			phoneNumber: string;
		};

		if (!decode) {
			throw error('session token is invalid');
		}

		return { isAuthenticated: true, user: decode };
	} catch (e: any) {
		console.log(e);
		return { isAuthenticated: false };
	}
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.set('session', '', { maxAge: 0 });
	cookieStore.set('authenticated', 'false', { maxAge: 0 });
	return { success: true };
}
