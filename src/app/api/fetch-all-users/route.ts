import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const users = await UserModel.find({});
        return NextResponse.json({
            success: true,
            users
        });
    } catch (error) {
        console.log("Error fetching users: " + error);
        return NextResponse.json({
            success: false,
            message: "Error fetching users"
        }, { status: 500 });
    }
}