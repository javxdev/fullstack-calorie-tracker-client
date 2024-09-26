import { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { activities: Activity[] } } |
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
    
    if(action.type === 'save-activity') {
        return {
            ...state,
            activities: action.payload
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