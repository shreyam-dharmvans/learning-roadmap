import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import RoadmapModel from "@/models/roadmap.model";
import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized User",
        }, { status: 400 });
    }

    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Roadmap ID is required",
            }, { status: 400 });
        }

        const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { roadmaps: { _id: id } } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 400 });
        }

        const deleteRoadmapFromModel = await RoadmapModel.findByIdAndDelete(id);
        if (!deleteRoadmapFromModel) {
            return NextResponse.json({
                success: false,
                message: "Failed to delete Roadmap",
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Roadmap deleted successfully",
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting roadmap:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        }, { status: 500 });
    }
}