import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                await connectDB();

                const existingUser = await UserModel.findOne({ email: user.email });
                if (!existingUser) {
                    const newUser = await UserModel.create({
                        email: user.email,
                        username: user?.name || "",
                    });

                    user._id = newUser._id as string;
                    user.username = newUser.username;
                    user.email = newUser.email;
                } else {
                    user._id = existingUser._id as string;
                    user.username = existingUser.username;
                    user.email = existingUser.email;
                }

                return true;
            } catch (error) {
                console.error("Error during signIn callback:", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
};