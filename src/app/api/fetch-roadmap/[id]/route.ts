import connectDB from "@/lib/dbConnect";
import RoadmapModel from "@/models/roadmap.model";
import { Roadmap } from "@/types/roadmap.types";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        await connectDB();

        const { id } = await params;

        const roadmap: Roadmap | null = await RoadmapModel.findById(id);

        if (!roadmap) {
            return NextResponse.json({
                success: false,
                message: "Roadmap you requested does not exist"
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Roadmap successfully fetched",
            roadmap
        }, { status: 200 });


    } catch (error) {
        console.log("Error getting roadmap : " + error);
        return NextResponse.json({
            success: false,
            message: "Error occurred while getting roadmap"
        }, { status: 500 });
    }

}