import { userProfileSchema } from "@/zodSchemas/userProfileSchema";
import axios from "axios";
import { useState } from "react"
import { z } from "zod";
import { toast } from "sonner";

const useUserData = () => {
    const [loading, setLoading] = useState(false);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/user-bio');
            return response.data.bio;
        } catch (error: any) {
            toast.error(error.data.message);
        } finally {
            setLoading(false);
        }
    }
    const updateUserDetails = async (data: z.infer<typeof userProfileSchema>) => {
        try {
            const response = await axios.patch('/api/user-bio', {
                bio: data.bio
            });

            toast.success(response.data.message);
            window.location.reload();
        } catch (error: any) {
            toast.error(error.data.message);
        }
    }
    return { loading, fetchUserDetails, updateUserDetails };
}

export default useUserData