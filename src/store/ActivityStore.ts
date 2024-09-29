import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Activity } from "../types";
import { addActivity, getActivities } from "../services/ActivityService";

type ActivityStore = {
    activities: Activity[],
    fetchActivities: () => Promise<void>,
    addNewActivity: (newActivity: Activity) => Promise<void>
}

export const useActivityStore = create<ActivityStore>()(
    devtools(
        (set) => ({
            activities: [],
            fetchActivities: async () => {
                const activities = await getActivities()
                set(() => ({
                    activities
                }))
            },
            addNewActivity: async (newActivity: Activity) => {
                await addActivity(newActivity)
                const updatedActivities = await getActivities()
                set(() => ({
                    activities: updatedActivities
                }))
            }
        })
    )
)