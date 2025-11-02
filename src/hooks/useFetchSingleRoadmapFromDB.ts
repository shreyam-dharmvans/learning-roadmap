import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useFetchSingleRoadmap = () => {

    const [loadingRoadmap, setLoading] = useState<boolean>(false);

    const fetchSingleRoadmapFromDB = async (roadmapId: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/fetch-roadmap/${roadmapId}`);

            toast.success(res.data.message);

            return res.data.roadmap;

        } catch (error: any) {
            console.log("Error fetching single roadmap : " + error);
            toast.error(error.message)
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { fetchSingleRoadmapFromDB, loadingRoadmap };
}

export default useFetchSingleRoadmap;