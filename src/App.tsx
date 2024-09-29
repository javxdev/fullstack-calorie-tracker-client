import { useEffect, useMemo } from "react";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { useActivityStore } from "./store/ActivityStore";

function App() {

  const { activities, fetchActivities } = useActivityStore()

  useEffect(() => {
    async function fetchData() {
      await fetchActivities();
    }
    fetchData();
  }, []);

  const canRestartApp = () => useMemo(() => activities.length, [activities]) 
    
  return (
    <>
      <header className="py-8 bg-green-600">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-white uppercase font-bold text-2xl">Calorie Tracker</h1>
          <button 
            className="px-6 py-3 bg-black text-white uppercase font-bold rounded-md disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => {}}>
              Restart App
            </button>
        </div>
      </header>

      <section className="bg-green-400">
        <div className="max-w-3xl mx-auto py-20">
          <Form/>
        </div>
      </section>

      <section className="bg-gray-800 py-10">
          <div className="max-w-3xl mx-auto">
            <CalorieTracker/>
          </div>
      </section>

      <section className="mx-auto p-10">
        <div className=" mx-auto max-w-3xl">
          <ActivityList/>
        </div>
      </section>
    </>
  )
}

export default App
