import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Activity } from "../types";
import { getActivities } from "../services/ActivityService";

type ActivityStore = {
    activities: Activity[],
    fetchActivities: () => Promise<void>
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
            }
        })
    )
)