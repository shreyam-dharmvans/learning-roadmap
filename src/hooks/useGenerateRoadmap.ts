import { promptSchema } from "@/zodSchemas/userPromptSchema";
import axios from "axios";
import { useState } from "react"
import { z } from "zod";
import { toast } from "sonner"

const useGenerateRoadmap = () => {
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async (data: z.infer<typeof promptSchema>) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/generate-roadmap', {
                prompt: data.prompt,
                title: data.title,
                duration: data.duration
            });
            toast.success(response.data.message);
            window.location.reload();
        } catch (error: any) {
            toast.error(error.data.message);
        } finally {
            setLoading(false);
        }
    }
    return { generateRoadmap, loading };
}

export default useGenerateRoadmap