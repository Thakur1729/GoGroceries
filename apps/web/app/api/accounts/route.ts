import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { UserPhoneNumberSchema } from '@repo/common/types';
import { getToken } from '@utils/authOtp';
import { createMessage } from '@utils/twillio';
import { createLogInCookie } from '@/app/action';

export async function POST(req: NextRequest) {
	try {
		const user: { name: string; phoneNumber: string } = await req.json();
		const parseInfo = UserPhoneNumberSchema.safeParse(user);

		if (!parseInfo.success) {
			return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
		}

		const pnumber = parseInfo.data.phoneNumber;
		const userName = parseInfo.data.name;
		const totp = getToken(pnumber, 'USER_AUTH');

		const d_user = await prisma.user.upsert({
			where: { phoneNumber: pnumber },
			create: {
				name: userName,
				phoneNumber: pnumber,
				otp: totp,
			},
			update: {
				name: userName,
				otp: totp,
			},
		});

		try {
			await createMessage(`Here is your otp for GoGroceries ${totp}`, pnumber);

			await createLogInCookie(d_user.id, d_user.phoneNumber, 'LOGIN');

			const response = NextResponse.json(
				{ message: 'OTP sent successfully' },
				{ status: 200 }
			);

			return response;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to send OTP';
			return NextResponse.json({ error: errorMessage }, { status: 500 });
		}
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
