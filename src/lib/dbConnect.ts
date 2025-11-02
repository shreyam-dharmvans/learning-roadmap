import mongoose from "mongoose";


const connection: any = {}

async function connectDB() {

    if (connection.isConnected) {
        console.log("Database already connected")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL as string);

        connection.isConnected = db.connections[0].readyState
        console.log("DB connected successfully")

    } catch (error) {
        console.log("DB connection failed", error);
        process.exit(1);

    }
}

export default connectDB;