import { Activity } from "../types"
import { addActivity } from "../services/ActivityService"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    // { type: 'set-activeId', payload: { id: Activity['id'] } } |
    // { type: 'delete-activity', payload: { id: Activity['id'] } }|
    { type: 'restart-app' } 


export type ActivityState = {
    activities: Activity[]
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState  = {
    activities: localStorageActivities(),
    // activeId: 0
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions 
    ) => {
    
    if(action.type === 'save-activity') {
        addActivity(action.payload.newActivity)

        return {
            ...state
        }
    }
    
    // if(action.type === 'set-activeId'){
        
    //     return {
    //         ...state,
    //         activeId: action.payload.id
    //     }
    // }

    // if(action.type === 'delete-activity') {
    //     return {
    //         ...state,
    //         activities: state.activities.filter( activity => activity.id !== action.payload.id )
    //     }
    // }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: 0
        }
    }
    
    return state
}