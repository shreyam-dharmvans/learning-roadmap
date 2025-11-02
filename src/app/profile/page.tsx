/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Header from "@/components/Header"
import PageEnd from "@/components/PageEnd"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/UserProfile";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";


const page = () => {
    const { data: session } = useSession();
    const user: User = session?.user as User;

    return (
        <div className="MainContainer">
            <Header />
            <div className="WholePage flex justify-center">
                <div className="flex">


                    <div className="p-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className=" font-semibold" variant="outline">Log Out</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will Log you out of your account
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => signOut()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <UserProfile />
            </div>
            <PageEnd />
        </div>
    )
}

export default page
