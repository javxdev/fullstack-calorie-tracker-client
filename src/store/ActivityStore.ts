import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { addActivity, deleteActivity, getActivities, updateActivity } from "../services/ActivityService";
import { Activity } from "../types";

type ActivityStore = {
    activities: Activity[],
    activeActivity: Activity | null,
    setActiveActivity: (activity: Activity) => void,
    fetchActivities: () => Promise<void>,
    addNewActivity: (newActivity: Activity) => Promise<void>,
    updateActivityById: (id: Activity['id'], activity: Activity) => Promise<void>,
    deleteActivity: (id: Activity['id']) => Promise<void>
}

export const useActivityStore = create<ActivityStore>()(
    devtools(
        (set) => ({
            activities: [],
            activeActivity: null,
            setActiveActivity: (activity: Activity) => {
                set({ activeActivity: activity });
            },
            fetchActivities: async () => {
                const activities = await getActivities()
                set(() => ({
                    activities
                }));
            },
            addNewActivity: async (newActivity: Activity) => {
                await addActivity(newActivity)
                const updatedActivities = await getActivities()
                set(() => ({
                    activities: updatedActivities,
                    activeActivity: {} as Activity
                }));
            },
            updateActivityById: async (id: Activity['id'], activity: Activity) => {
                try {
                    await updateActivity(id, activity);
                    const updatedActivities = await getActivities();
                    set(() => ({
                        activities: updatedActivities,
                        activeActivity: {} as Activity
                    }));
                } catch (error) {
                    console.error('Error updating activity:', error);
                }
            },            
            deleteActivity: async (id: Activity['id']) => {
                await deleteActivity(id)
                const updatedActivities = await getActivities()
                set(() => ({
                    activities: updatedActivities,
                    activeId: 0
                }));
            }
        })
    )
);
