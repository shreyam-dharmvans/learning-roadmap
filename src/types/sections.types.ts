import { Document } from "mongoose";

export interface Subtopic extends Document {
    title: string;
    resource_link: string;
    due_date?: Date | string;
    is_completed: boolean;
    duration: number;
}

export interface Section extends Document {
    title: string;
    subtopics: Subtopic[];
    // is_completed: boolean;
}