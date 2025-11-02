import { Document } from "mongoose";
import { Roadmap } from "./roadmap.types";

export interface User extends Document {
    email: string;
    username: string;
    bio: string;
    roadmaps: Roadmap[];
}