"use server";

import { NextRequest, NextResponse, userAgent } from "next/server";
import { verifyToken } from "@utils/authOtp";
import { UserVerifySchema } from "@repo/common/types";
import { prisma } from "@repo/db";

export async function POST(req: NextRequest) {
    const parsedData = UserVerifySchema.safeParse(req.body);
    if (!parsedData.success) {
        NextResponse.json({message: "Invalid data", status: 400});
        return
    }

    const number = parsedData.data.phoneNumber;
    const otp = parsedData.data.otp;
    
    if (!verifyToken(number, "USER_AUTH", otp)) {
        NextResponse.json({message: "Invalid Token", status: 400});
        return
    }

    const user = await prisma.user.update({
        where: {
            phoneNumber: number
        },
        data: {
            isVerified: true
        }
    });

    if(!user) {
        return NextResponse.json(
            { message: "User not found" }, 
            { status: 404 }
        );
    }

    return NextResponse.json({ message: "User verified", status: 200 });    
}
