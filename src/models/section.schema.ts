import { Section, Subtopic } from "@/types/sections.types"
import { Schema } from "mongoose"


const SubtopicSchema: Schema<Subtopic> = new Schema<Subtopic>({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    resource_link: {
        type: String,
        default: ""
    },
    due_date: {
        type: Date,
        default: null
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    duration: {
        type: Number,
        default: 1
    }
});

export const SectionSchema: Schema<Section> = new Schema<Section>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    subtopics: {
        type: [SubtopicSchema],
        default: []
    },
});


