import { useState } from "react";

function App() {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>
        <form
          class="flex items-center gap-2 shadow-sm border border-gray-200
         rounded-lg p-2"
        >
          <input
            className="flex-1 outline-none rounded px-3 py-2 text-gray-700 
            placeholder-gray-400"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            required={false}
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-600 transition 
            text-white px-4 py-2 rounded-md "
            type="submit"
          >
            Add Task
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
}

export default App;
