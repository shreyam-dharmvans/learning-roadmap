import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import RoadmapModel from "@/models/roadmap.model";
import UserModel from "@/models/user.model";
import { Roadmap } from "@/types/roadmap.types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ roadmapId: string, subtopicId: string }> }) {
    try {
        const { roadmapId, subtopicId } = await params;
        const session = await getServerSession(authOptions);
        const userId = session?.user._id;

        // console.log("Mark as completed called for roadmapId: ", roadmapId, " subtopicId: ", subtopicId);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "server error"
            }, { status: 500 })
        }

        await connectDB();
        const user = await UserModel.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }

        const roadmap = await RoadmapModel.findById(roadmapId) as Roadmap;
        // console.log("Fetched Roadmap: ", roadmap);

        if (!roadmap) {
            return NextResponse.json({
                success: false,
                message: "Roadmap not found"
            }, { status: 400 })
        }

        for (const section of roadmap.sections) {
            for (const subtopic of section.subtopics) {
                if (subtopic._id?.toString() === subtopicId) {
                    subtopic.is_completed = true;
                }
            }
        }

        // Recalculate progress
        let totalSubtopics = 0;
        let completedSubtopics = 0;

        for (const section of roadmap.sections) {
            for (const subtopic of section.subtopics) {
                totalSubtopics++;
                if (subtopic.is_completed) {
                    completedSubtopics++;
                }
            }
        }
        roadmap.progress = totalSubtopics === 0 ? 0 : Math.round((completedSubtopics / totalSubtopics) * 100);


        await roadmap.save();


        await UserModel.findOneAndUpdate(
            { _id: userId, "roadmaps._id": roadmapId },
            { $set: { "roadmaps.$": roadmap } }
        );


        return NextResponse.json({
            success: true,
            message: "Subtopic marked as completed",
            progress: roadmap.progress
        }, { status: 200 });

    } catch (error) {
        console.log("Error in marking subtopic as completed: " + error);
        return NextResponse.json({
            success: false,
            message: "Error in marking subtopic as completed"
        }, { status: 500 });
    }
}