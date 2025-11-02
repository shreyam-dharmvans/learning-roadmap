import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/models/user.model";
import RoadmapModel from "@/models/roadmap.model";
import { generateRoadmap } from "@/lib/aiConfigGenerateRoadmap";
import { fillDueDates } from "@/lib/fillDueDates";
import { Section } from "@/types/sections.types";


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized request"
        }, { status: 400 });
    }
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }

        const { preferences, title, duration }: { preferences: string, title: string, duration: number } = await request.json();
        const prompt = `
Generate a roadmap for ${title}.
Duration: ${duration} months
Preferences: ${preferences}
Bio: ${user.bio}
`;

        const roadmapData = await generateRoadmap(prompt);

        console.log("Generated Roadmap: ", roadmapData);

        // let roadmap = await RoadmapModel.create({
        //     title: roadmapData.title,
        //     duration: roadmapData.duration,
        //     sections: roadmapData.sections
        // })

        const cleanedSections = roadmapData.sections.map((section: Section) => {
            return {
                ...section,
                subtopics: section.subtopics.map(sub => {
                    if (sub.due_date === "null" || sub.due_date === null) {
                        delete sub.due_date;
                    }
                    return sub;
                })
            };
        });

        let roadmap = await RoadmapModel.create({
            title: roadmapData.title,
            duration: roadmapData.duration,
            sections: cleanedSections
        });


        const filledRoadmap = fillDueDates(roadmap);

        if (!filledRoadmap) {
            return NextResponse.json({
                success: false,
                message: "Error in filling due dates"
            });
        }

        console.log("Filled Roadmap: ", filledRoadmap);

        await filledRoadmap.save();
        user.roadmaps.push(filledRoadmap);
        await user.save();


        return NextResponse.json({
            success: true,
            message: "Roadmap successfully generated",
            roadmap: filledRoadmap
        }, { status: 200 })

    } catch (error) {
        console.log("Error generating roadmap : " + error);
        return NextResponse.json({
            success: false,
            message: "Error occurred while generating roadmap"
        }, { status: 500 })
    }
}