import { Activity } from "../types"

export type ActivityActions =
    { type: 'fetch-activities', payload: { activities: Activity[] } } |
    { type: 'restart-app' } 


export type ActivityState = {
    activities: Activity[]
}


export const initialState : ActivityState  = {
    activities: []
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions 
    ) => {
    
    if(action.type === 'fetch-activities') {
        return {
            ...state,
            activities: action.payload.activities
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: 0
        }
    }
    
    return state
}