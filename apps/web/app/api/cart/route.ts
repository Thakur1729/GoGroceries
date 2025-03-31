'use server';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

type CartRequestType = {
    productId: number,
    quantity: number,
    action: string
}

export async function GET(req: NextRequest) {
    try {
        const cookieStore = await cookies();

        const token = await cookieStore.get('session')?.value.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 400 });
        }

        const verifyedtoken = (await verify(
            token,
            process.env.JWT_PASSWORD || 'mysecret'
        )) as {
            userid: number;
            phoneNumber: string;
            cookieType?: 'LOGIN' | 'VERIFYED';
        };

        if (!verifyedtoken) {
            return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: verifyedtoken.userid,
                phoneNumber: verifyedtoken.phoneNumber,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        let cart = await prisma.cart.findFirst({
            where: { userId: user.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: user.id,
                },
                include: {
                    items: {
                        include: {
                            product: true,

                        },
                    },
                },
            });
        }

        const totalItem = cart.items.reduce(
            (sum, item) => sum + (item.itemQuantity),
            0
        );
        const totalPrice = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.itemQuantity,
            0
        );

        return NextResponse.json({
            items: cart.items.map(item => ({
                ...item.product,
                itemQuantity: item.itemQuantity
            })),
            totalItem,
            totalPrice,
        }, {
            status: 200
        })

    } catch (err: unknown) {
        console.log("Error fetching cart:", err);
        return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const body = await req.json();

        const { productId, quantity, action }: CartRequestType = body;

        const token = await cookieStore.get('session')?.value.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 400 });
        }

        const verifyedtoken = (await verify(
            token,
            process.env.JWT_PASSWORD || 'mysecret'
        )) as {
            userid: number;
            phoneNumber: string;
            cookieType?: 'LOGIN' | 'VERIFYED';
        };

        if (!verifyedtoken) {
            return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: verifyedtoken.userid,
                phoneNumber: verifyedtoken.phoneNumber,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        let cart = await prisma.cart.findFirst({
            where: {
                userId: user.id,
            },
            // include: {
            //     items: true,
            // }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: user.id,
                },
            });
        }

        if (action === 'clear') {
            // Clear cart
            if ((await prisma.cartItem.count() <= 0)) {
                return NextResponse.json({ message: 'Nothing to clean' })
            }

            await prisma.cartItem.deleteMany({
                where: { cartId: cart.id },
            });

            return NextResponse.json({ message: 'Cart cleared' }, { status: 200 });
        }

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        if (action === 'add') {
            if (cartItem) {
                await prisma.cartItem.update({
                    where: { id: cartItem.id },
                    data: { itemQuantity: cartItem.itemQuantity + (quantity || 1) },
                });
            } else {

                // create a new item
                await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId,
                        itemQuantity: quantity || 1,
                    },
                });
            }
        } else if (action === 'remove') {
            if (cartItem) {
                if (cartItem.itemQuantity > 1) {
                    await prisma.cartItem.update({
                        where: { id: cartItem.id },
                        data: { itemQuantity: cartItem.itemQuantity - 1 },
                    });
                } else {
                    //Remove item
                    await prisma.cartItem.delete({
                        where: { id: cartItem.id },
                    });
                }
            }
        } else if (action === 'update') {
            if (quantity <= 0) {
                if (cartItem) {
                    await prisma.cartItem.delete({
                        where: { id: cartItem.id },
                    });
                }
            } else if (cartItem) {
                await prisma.cartItem.update({
                    where: { id: cartItem.id },
                    data: { itemQuantity: quantity },
                });
            } else {
                await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId,
                        itemQuantity: quantity
                    }
                });
            }
        }

        // Return updated cart data 
        const updatedCart = await prisma.cart.findFirst({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const totalItems = updatedCart!.items.reduce((sum, item) => sum + item.itemQuantity, 0);
        const totalPrice = updatedCart!.items.reduce((sum, item) => sum + (item.product.price * item.itemQuantity), 0);

        return NextResponse.json({
            items: updatedCart!.items.map(item => ({
                ...item.product,
                quantity: item.itemQuantity
            })),
            totalItems,
            totalPrice,
        });
    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
    }
}