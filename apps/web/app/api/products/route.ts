import { NextRequest, NextResponse } from 'next/server';
import { ProductSchema } from '@repo/common/types';
import { prisma } from '@repo/db';

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const validateData = ProductSchema.safeParse(data);

		if (!validateData.success) {
			return NextResponse.json({ error: validateData.error });
		}

		// Check if the referenced subcategory exists
		const categoryExists = await prisma.subCategory.findUnique({
			where: { id: validateData.data.subCategoryId },
		});

		if (!categoryExists) {
			return NextResponse.json(
				{ error: 'Referenced subcategory does not exist' },
				{ status: 400 }
			);
		}

		const product = await prisma.product.create({
			data: {
				prodName: validateData.data.prodName,
				prodDescription: validateData.data.prodDescription,
				price: validateData.data.price,
				mrp: validateData.data.mrp,
				stock: validateData.data.stock,
				unit: validateData.data.unit,
				subcategoryId: validateData.data.subCategoryId,
			},
		});

		if (!product) {
			return NextResponse.json(
				{ error: 'Please check your internet connection' },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: 'Successfully uploaded',
			id: product.id,
			status: 201,
		});
	} catch (e) {
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 }
		);
	}
}
