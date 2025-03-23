// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@repo/db';

// export async function GET(req: NextRequest) {
// 	try {
// 		const url = new URL(req.url);
// 		// const searchParams = url.;
// 		const subcategoryId = searchParams.get('subcategoryId');
// 		const limit = searchParams.get('limit')
// 			? parseInt(searchParams.get('limit') as string)
// 			: 10;
// 		const page = searchParams.get('page')
// 			? parseInt(searchParams.get('page') as string)
// 			: 1;
// 		const skip = (page - 1) * limit;

// 		// Build the query based on parameters
// 		const whereClause: any = {};
// 		if (subcategoryId) {
// 			whereClause.subcategoryId = subcategoryId;
// 		}

// 		// Get products
// 		const products = await prisma.product.findMany({
// 			where: whereClause,
// 			skip,
// 			take: limit,
// 			orderBy: { createdAt: 'desc' },
// 		});

// 		// Get total count for pagination
// 		const totalCount = await prisma.product.count({
// 			where: whereClause,
// 		});

// 		return NextResponse.json({
// 			products,
// 			pagination: {
// 				total: totalCount,
// 				page,
// 				limit,
// 				pages: Math.ceil(totalCount / limit),
// 			},
// 		});
// 	} catch (e) {
// 		return NextResponse.json(
// 			{
// 				error: 'An unexpected error occurred',
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }
