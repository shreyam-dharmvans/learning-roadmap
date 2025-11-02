import axios from "axios";
import { useState } from "react";
import { toast } from "sonner"

const useMarkSubtopicAsCompleted = () => {
    const [loading, setLoading] = useState(false);

    const markSubtopicAsCompleted = async (subtopicId: string, roadmapId: string) => {
        try {
            setLoading(true);
            const res = await axios.patch(`/api/mark-as-completed/${roadmapId}/${subtopicId}`);
            toast.success(res.data.message);
            return res.data.roadmap;
        } catch (error: any) {
            console.log("Error marking task as completed : " + error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { markSubtopicAsCompleted, loading };

}

export default useMarkSubtopicAsCompleted;