import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { useActivityStore } from "../store/ActivityStore";

const initialState: Activity = {
    id: 0,
    category: 1,
    name: '',
    calories: 0
};

export default function Form() {
    const { addNewActivity, activeActivity, updateActivityById } = useActivityStore();

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (activeActivity?.id) {
            setActivity(activeActivity);
        } else {
            setActivity(initialState);
        }
    }, [activeActivity]);
    

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        });
    };

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name?.trim() !== '' && calories > 0 && !Number(name);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (activity.id !== 0) {
                await updateActivityById(activity.id, activity);
            } else {
                await addNewActivity(activity);
            }

            setActivity({
                ...initialState,
                category: 1,
                name: '',
                calories: 0
            });
        } catch (error) {
            console.error("Error saving activity:", error);
        }
    };

    return (
        <form className="space-y-5 bg-gray-800 shadow px-3 py-6 md:py-10 md:px-10 rounded-md" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold text-gray-200">Category</label>
                <select
                    className="border border-slate-600 p-2 rounded-md w-full text-white appearance-auto bg-gray-800"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold text-gray-200">Activity</label>
                <input 
                    id="name"
                    type="text"
                    className="border border-slate-600 p-2 rounded-md bg-gray-800 text-gray-200"
                    placeholder="Ej. Food, Orange Juice, Work Out, Salad, etc..."
                    value={activity.name || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold text-gray-200">Calories</label>
                <input 
                    type="number"
                    id="calories"
                    className="border border-slate-600 p-2 rounded-md bg-gray-800 text-gray-200"
                    placeholder="Like 300 or 700"
                    value={activity.calories || 0}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-900 hover:bg-gray-700 text-white w-full p-4 font-bold uppercase cursor-pointer disabled:opacity-10"
                value={ activity.id !== 0 
                    ? `Update ${activity.category === 1 ? 'Food' : 'Work Out'}` 
                    : `Save ${activity.category === 1 ? 'Food' : 'Work Out'}`
                }
                disabled={!isValidActivity()}
            />
        </form>
    );
}
