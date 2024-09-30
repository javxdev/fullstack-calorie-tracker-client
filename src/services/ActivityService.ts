import axios from "axios"
import {  ActivitiesSchema, Activity } from "../types"
import { ActivityWithoutIdSchema } from "../types";

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

export const addActivity = async (activity: Activity) => {
    try {
        const result = ActivityWithoutIdSchema.safeParse({
            category: activity.category,
            name: activity.name,
            calories: activity.calories
        });
        
        if (result.success) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/activities`, result.data);
            return response.data
        }
    } catch (error) {
        throw error;
    }
};

export const deleteActivity = async (id: Activity['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/activities/${id}`
        await axios.delete(url);
    } catch (error) {
        throw error;
    }
};
