import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { addActivity, deleteActivity, getActivities } from "../services/ActivityService";
import { Activity } from "../types";

type ActivityStore = {
    activities: Activity[],
    activeId: Activity['id'],
    fetchActivities: () => Promise<void>,
    addNewActivity: (newActivity: Activity) => Promise<void>,
    deleteActivity: (id: Activity['id']) => Promise<void>
}

export const useActivityStore = create<ActivityStore>()(
    devtools(
        (set) => ({
            activities: [],
            activeId: 0,
            fetchActivities: async () => {
                const activities = await getActivities()
                set(() => ({
                    activities
                }));
            },
            addNewActivity: async (newActivity: Activity) => {
                await addActivity(newActivity);
                const updatedActivities = await getActivities()
                set(() => ({
                    activities: updatedActivities,
                    activeId: 0
                }));
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
