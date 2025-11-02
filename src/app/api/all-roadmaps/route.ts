import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "server error"
        }, { status: 500 });
    }
    try {
        await connectDB();
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found in DB"
            }, { status: 400 })
        }

        const roadmapArray = user.roadmaps;

        return NextResponse.json({
            success: true,
            message: "User Roadmaps fetched successfully",
            allRoadmaps: roadmapArray
        }, { status: 200 })
    } catch (error) {
        console.log("Internal server error in Fetching roadmap : " + error);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching roadmaps"
        }, { status: 500 });

    }
}