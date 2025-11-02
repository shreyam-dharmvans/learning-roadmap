import { Roadmap } from "@/types/roadmap.types";

export const fillDueDates = (roadmap: Roadmap) => {
    try {
        const startDate = new Date(roadmap.startedAt || Date.now());

        let currentDate = new Date(startDate);

        for (const section of roadmap.sections) {
            for (const subtopic of section.subtopics) {

                subtopic.due_date = new Date(currentDate);

                currentDate.setDate(currentDate.getDate() + (subtopic.duration || 1));
            }
        }

        return roadmap;

    } catch (error) {
        console.error("Error in fillDueDates:", error);
    }
}