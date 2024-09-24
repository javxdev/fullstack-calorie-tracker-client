import axios from "axios"
import { Activity } from "../types"
import { ActivitySchema } from "../types";

export const addActivity = async (data: Activity) => {
    try {
        const result = ActivitySchema.safeParse(data)
        if(result.success){
            await axios.post(`${import.meta.env.VITE_API_URL}/api/activities`, result.data);
        }
    } catch (error) {
        throw error;
    }
};
