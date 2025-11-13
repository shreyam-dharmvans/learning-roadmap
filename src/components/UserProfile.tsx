import { userProfileSchema } from "@/zodSchemas/userProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import useUserData from "@/hooks/useUserData"
import Loader from "./Loader"

const UserProfile = () => {
    const [bio, setBio] = useState<string>("");
    const [toggle, setToggle] = useState(false);
    const { loading, fetchUserDetails, updateUserDetails } = useUserData();

    useEffect(() => {
        const callFetchDetails = async () => {
            const bio = await fetchUserDetails();
            setBio(bio);
        }
        callFetchDetails();
    }, [])

    const onSubmit = async (data: z.infer<typeof userProfileSchema>) => {
        await updateUserDetails(data);
    }

    const form = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            bio: bio || ""
        }
    })

    return (
        <div className="border-2 md:m-5 rounded-md sm:w-full sm:h-full">
            {loading && <Loader />}
            {toggle ? <Form {...form}>
                <form className="p-6 rounded-lg shadow-lg mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="bio"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col mb-6">
                                <FormLabel className="text-white">Bio</FormLabel>
                                <textarea
                                    className="w-full bg-black p-5 rounded-md border text-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add your bio"
                                    {...field}
                                />
                                <FormMessage className="text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-700 text-white p-3 rounded-md font-semibold hover:bg-green-500 transition-colors mt-6"
                    >
                        Submit
                    </Button>
                </form>
            </Form> :
                <div className="p-6 rounded-lg shadow-lg mx-auto space-y-4">
                    <div className="flex flex-col">
                        <label className="text-white">Short Bio</label>
                        <textarea
                            className="w-full p-5 bg-black rounded-md border border-gray-300 cursor-not-allowed text-gray-100"
                            value={bio || ''}
                            disabled
                        />
                    </div>
                </div>}
            <div className="flex items-center justify-end p-2">
                <Button className={`bg-green-700 hover:bg-green-500 w-3/12 md:w-1/12 font-semibold ${toggle && 'bg-red-500 hover:bg-red-700'}`}
                    onClick={() => { setToggle(!toggle) }}>{toggle ? "Discard" : "Edit"}</Button>

            </div>
        </div>
    )
}

export default UserProfile
