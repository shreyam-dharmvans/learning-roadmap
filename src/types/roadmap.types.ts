import { Document } from "mongoose";
import { Section } from "./sections.types";

export interface Roadmap extends Document {
    title: string;
    duration: number;
    progress: number;
    sections: Section[];
    startedAt?: Date;
}