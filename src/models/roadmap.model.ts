import { Roadmap } from "@/types/roadmap.types";
import { Schema } from "mongoose";
import { SectionSchema } from "./section.schema";
import mongoose from "mongoose";

export const RoadmapSchema: Schema<Roadmap> = new Schema<Roadmap>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
    },
    progress: {
        type: Number,
        default: 0
    },
    sections: {
        type: [SectionSchema],
        default: []
    },
    startedAt: {
        type: Date,
        default: Date.now
    }

});

const RoadmapModel = mongoose.model<Roadmap>("Roadmap", RoadmapSchema);

export default RoadmapModel;