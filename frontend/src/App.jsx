import { useEffect, useState } from "react";
import axios from "axios";

import { MdModeEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function App() {
  //creating a state to hold the new task input
  const [newTodo, setNewTodo] = useState("");
  //creating a state to hold the list of tasks
  const [todos, setTodos] = useState([]);

  //editing states
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  //function to add a new task to the task list
  const addTodo = async (e) => {
    //preventing the default form submission behavior
    e.preventDefault();
    if (!newTodo.trim()) return;
    try{
      const response = await axios.post("/api/todos", {text: newTodo});
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  }

  //function to fetch the list of tasks from the backend 
  // and keep them updated even when reffereshed
  const fetchTodos = async (e) => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
  } catch (error) {
    console.log("Error fetching todos:", error);
  }};

  useEffect(() => {
    fetchTodos();
  }, []);

  //function to edit a task in the task list


  //function to delete a task from the task list

  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Task Manager</h1>
        <form
          class="flex items-center gap-2 shadow-sm border border-gray-200
         rounded-lg p-2"
         onSubmit={addTodo}
        >
          <input
            className="flex-1 outline-none rounded px-3 py-2 text-gray-600 
            placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            required
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-600 transition 
            text-white px-4 py-2 rounded-md "
            type="submit"
          >
            Add Task
          </button>
        </form>
        <div>
          {/* Task List will go here */}
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div> 
              {todos.map((todo) => 
                <div key={todo._id}> 
                  {editingTodo === todo._id ? (
                    <div></div>
                  ) : (
                    <div></div>
                  )}
                </div>)} 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
