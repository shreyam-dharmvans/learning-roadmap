import { User } from "@/types/user.types";
import mongoose, { Schema } from "mongoose";
import { RoadmapSchema } from "./roadmap.model";

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    bio: {
        type: String,
        default: ""
    },
    roadmaps: {
        type: [RoadmapSchema],
        default: []
    }
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;