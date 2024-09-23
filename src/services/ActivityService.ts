import axios from "axios"
import { Activity } from "../types"

export const addActivity = async (data: Activity) => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/activities`, data);
    } catch (error) {
        throw error;
    }
};
