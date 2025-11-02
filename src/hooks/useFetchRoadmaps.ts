import axios from 'axios'
import { useState } from 'react';
import { toast } from "sonner"

const useFetchRoadmaps = () => {
    const [loading, setLoading] = useState(false);
    const fetchRoadmapsFromDB = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/all-roadmaps');
            return response.data.allRoadmaps;

        } catch (error: any) {
            toast.error(error.data.message)
        } finally {
            setLoading(false);
        }
    }
    const fetchRoadmapDataFromDB = async (id: string) => {
        try {
            const response = await axios.get(`/api/get-roadmap/${id}`);
            return response.data.roadmap;
        } catch (error: any) {
            toast.error(error.data.message)
        }
    }
    return { fetchRoadmapsFromDB, loading, fetchRoadmapDataFromDB };
}

export default useFetchRoadmaps