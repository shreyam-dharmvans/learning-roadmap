"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
type props = {
    title: string,
    heading: string,
    avatar: string,
    content: string
}
export function CardDemo({ title, heading, avatar, content }: props) {
    return (
        <div id="features-section" className="max-w-xs w-full group/card">
            <div
                className={cn(
                    " cursor-pointer overflow-hidden relative card  rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                    "bg-gray-950 bg-cover"
                )}
            >
                <Image src={`/${avatar}`} alt="Avatar" width={500} height={500} className="object-cover" />
                <div className="text content">

                    <h1 className="font-bold text-xl md:text-2xl text-gradient relative z-10 text-center mt-5">
                        {heading}
                    </h1>
                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4 text-center">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}