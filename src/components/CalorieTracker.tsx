import { useMemo } from "react"
import { useActivityStore } from "../store/ActivityStore"
import CalorieDisplay from "./CalorieDisplay"

export default function CalorieTracker() {

  const { activities } = useActivityStore()

  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
  
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
  
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

  return (
    <>
     <h2 className="text-4xl font-black text-white text-center">Calorie Summary</h2> 
     
     <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

      <CalorieDisplay
        calories={caloriesConsumed}
        text="Food"
      />

      <CalorieDisplay
        calories={caloriesBurned}
        text="Work Out"
      />

      <CalorieDisplay
        calories={netCalories}
        text="Balance"
      />

     </div>
    </>
  )
}
