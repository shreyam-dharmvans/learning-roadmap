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
            <div className="WholePage flex flex-col sm:flex-row justify-center mb-40">
                <div className="flex flex-col ml-5 sm:ml-0 mt-5 sm:mt-0">

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="p-2 py-5 font-semibold text-gray-300 text-3xl">{user?.name}</p>
                    <div className="p-2">
                        <label className="font-semibold text-gray-500" htmlFor="">Email</label>
                        <p className="font-semibold text-gray-300">{user?.email}</p>
                    </div>



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

                <div className="md:w-9/12 md:m-5 md:p-5 w-[90%] m-1 ml-5 sd:ml-0 flex flex-col mt-5 sm:mt-0">
                    <h1 className="text-3xl font-semibold text-gray-100 py-4">Your Profile</h1>
                    <UserProfile />
                </div>

            </div>
            <PageEnd />
        </div>
    )
}

export default page
