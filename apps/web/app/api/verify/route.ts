'use server';

// for pages route we use NextApiRequest and NextApiResponse and for apps route we use NextRequest and NextResponse
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@utils/authOtp';
import { UserVerifySchema } from '@repo/common/types';
import { prisma } from '@repo/db';
import { createCookie } from '@/app/action';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
	try {
		const cookieStore = await cookies();

		// For App Router, we need to await req.json() to get the body
		const body = await req.json();
		const { otp } = body;

		// checking wheter we are getting desired data or not
		const parsedData = UserVerifySchema.safeParse({ otp });

		if (!parsedData.success) {
			return NextResponse.json(
				{ message: parsedData.error.message },
				{ status: 400 }
			);
		}

		const token = cookieStore.get('token')?.value;
		console.log(token);
		if (!token) {
			return NextResponse.json({ message: 'Token not found' }, { status: 400 });
		}

		const verifyedtoken = (await verify(
			token,
			process.env.JWT_PASSWORD || 'mysecret'
		)) as {
			userid: number;
			phoneNumber: string;
			cookieType?: 'SIGNUP' | 'LOGIN' | 'VERIFYED';
		};

		if (!verifyedtoken) {
			return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
		}

		const number = verifyedtoken.phoneNumber;
		console.log(number);
		const parsedotp = parsedData.data.otp;

		// add node_env to test otp so we are not making request to twilio unnecessarily
		if (!verifyToken(number, 'USER_AUTH', parsedotp)) {
			return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
		}

		const user = await prisma.user.update({
			where: {
				phoneNumber: number,
			},
			data: {
				otp: '',
				isVerified: true,
			},
		});

		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		await createCookie(user.id, user.phoneNumber, 'VERIFYED');
		return NextResponse.json({ message: 'User verified' }, { status: 200 });
	} catch (e: any) {
		console.error(e);
		return NextResponse.json(
			{ message: 'Verification unsuccessful. Try again!' },
			{ status: 500 }
		);
	}
}
