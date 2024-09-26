import axios from "axios"
import {  ActivitiesSchema, Activity } from "../types"
import { ActivitySchema } from "../types";

export const getActivities = async () => {
    try {
            const response = await axios(`${import.meta.env.VITE_API_URL}/api/activities`);
            const result = ActivitiesSchema.safeParse(response.data.data)
            if(result.success){
                return result.data
            }
    } catch (error) {
        throw error;
    }
};

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
