import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import useActivity from "../hooks/useActivity"


const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form() {
    const { state, dispatch } = useActivity()
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(
                stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }

    }, [state.activeId])

    
    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })        
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({type: 'save-activity', payload: {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }
    
  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-md"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Category</label>
            <select 
                className="border border-slate-300 p-2 rounded-md w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Activity</label>
            <input 
                id="name"
                type="text"
                className="border border-slate-300 p-2 rounded-md"
                placeholder="Ej. Food, Orange Juice, Work Out, Salad, etc..."
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calories</label>
            <input 
                type="number"
                id="calories"
                className="border border-slate-300 p-2 rounded-md"
                placeholder="Like 300 or 700"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input
            type="submit"
            className="bg-gray-800 text-white w-full p-4 font-bold uppercase cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? 'Save Food' : 'Save Work Out'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}