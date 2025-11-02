import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "server error"
        }, { status: 500 })
    }
    try {
        await connectDB();
        const user = await UserModel.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "user bio fetched successfully",
            bio: user.bio
        }, { status: 200 });

    } catch (error) {
        console.log("Error saving user fields : " + error);
        return NextResponse.json({
            success: false,
            message: "Error occurred while saving user fields"
        }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "Unauthorised user"
        }, { status: 500 });
    }

    try {
        await connectDB();
        const { bio } = await request.json();
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            bio: bio
        }, { new: true });

        if (updateUser) {
            return NextResponse.json({
                success: true,
                message: "Details updated Successfully",

            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "User not found with given userID"
            }, { status: 400 });
        }
    } catch (error) {
        console.log("Internal server error in update user details", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}