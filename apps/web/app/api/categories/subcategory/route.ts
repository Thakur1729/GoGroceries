import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { SubCategorySchema } from '@repo/common/types';

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const validateData = SubCategorySchema.safeParse(data);

		if (!validateData.success) {
			return NextResponse.json({ error: validateData.error });
		}

		const categoryExists = await prisma.category.findUnique({
			where: { id: validateData.data.categoryId },
		});

		if (!categoryExists) {
			return NextResponse.json(
				{ error: 'Referenced category does not exist' },
				{ status: 400 }
			);
		}

		const subCategory = await prisma.subCategory.create({
			data: {
				name: validateData.data.name,
				image: validateData.data.image,
				categoryId: validateData.data.categoryId,
			},
		});

		if (!subCategory) {
			return NextResponse.json(
				{ error: 'Please check your internet connection' },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: 'Successfully uploaded',
			data: subCategory,
			status: 201,
		});
	} catch (e: any) {
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 }
		);
	}
}

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const categoryId = Number(url.searchParams.get('categoryId'));

		const subCategories = await prisma.subCategory.findMany({
			where: {
				categoryId: categoryId,
			},
			include: {
				products: {
					select: {
						id: true,
						prodName: true,
						prodDescription: true,
						discount: true,
						price: true,
						mrp: true,
						stock: true,
						unit: true,
						image: {
							select: {
								imageLink: true,
								position: true,
								alt: true,
								isPrimary: true,
							},
						},
					},
				},
			},
		});

		if (!subCategories) {
			return NextResponse.json(
				{ error: 'No subcategories found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			subCategories,
			status: 200,
		});
	} catch (e: any) {
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 }
		);
	}
}
