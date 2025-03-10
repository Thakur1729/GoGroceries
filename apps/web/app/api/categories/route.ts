'use server';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { CategorySchema } from '@repo/common/types';

export async function GET(req: NextRequest) {
	try {
		//get all the categories
		const cy = await prisma.category.findMany({});
		if (!cy) {
			return NextResponse.json(
				{ message: 'Error while adding in database' },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{
				data: cy,
				message: 'fetched successfully',
			},
			{ status: 200 }
		);
	} catch (e: any) {
		return NextResponse.json(
			{ message: 'Internal server error occured ' },
			{ status: 500 }
		);
	}
}

// for now keeping it open but later provide access only to the admin. You can verify the user role from the session.

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const validateCategory = CategorySchema.safeParse(body);

		if (!validateCategory || validateCategory.error) {
			return NextResponse.json(
				{ error: validateCategory.error.message },
				{ status: 400 }
			);
		}

		const cy = await prisma.category.create({
			data: {
				name: validateCategory.data.name,
				image: validateCategory.data.image || null,
			},
		});

		if (!cy) {
			return NextResponse.json(
				{ message: 'Error while adding in database' },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: 'Successfully added in database' },
			{ status: 200 }
		);
	} catch (e: any) {
		NextResponse.json(
			{ message: 'Internal server error occured ' },
			{ status: 500 }
		);
	}
}
