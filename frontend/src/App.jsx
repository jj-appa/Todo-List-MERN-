import { useEffect, useState } from "react";
import axios from "axios";

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

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
    try {
      const response = await axios.post(`/api/todos`, { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  //function to fetch the list of tasks from the backend
  // and keep them updated even when reffereshed
  const fetchTodos = async (e) => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
      setEditingText("");
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  //function to enter edit state

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  //function to edit a task in the task list
  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updatintg todo:", error);
    }
  };
  //function to delete a task from the task list
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  //Completion
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggline todo:", error);
    }
  };

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
            placeholder-gray-400 font-medium"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            required
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-600 transition 
            text-white px-4 py-2 rounded-md duration-200"
            type="submit"
          >
            Add Task
          </button>
        </form>
        <div className="mt-4">
          {/* Task List will go here */}
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div>
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    // editing mode on
                    <div className="flex items-center gap-x-2 justify center mt-4">
                      <textarea
                        className="flex-1 border border-gray-200 outline-none rounded-lg shadow-lg
                        px-3 py-2 text-gray-600 font-medium
                         w-full h-11 min-h-11
                        focus:ring-blue-500 focus:ring-2"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      ></textarea>

                      {/* action button */}
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="flex px-3 py-2 text-green-500 rounded-lg duration-250
                            hover:text-green-700 hover:bg-green-100"
                        >
                          <FaCheck />
                        </button>

                        <button
                          className="px-3 py-2 text-red-500 rounded-lg duration-200
                            hover:text-red-700 hover:bg-red-100"
                          onClick={() => setEditingTodo(null)}
                        >
                          <MdCancel />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // editing mode off
                    <div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-x-4 px-3 py-2">
                          {/* completion */}
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`mt-1 h-5 w-5 border rounded-full flex item-center justify-center
                              flex-shrink-0 
                              ${
                                todo.completed
                                  ? "bg-green-200 border-green-500 transition duration-225"
                                  : "border-gray-400 hover:border-blue-500 hover:bg-blue-200 transition duration-225"
                              }
                              `}
                          >
                            {todo.completed}
                          </button>
                          <span
                            className={`font-medium inline-block max-h-18 overflow-y-auto overflow-x-hidden
                            ${
                              todo.completed
                                ? "line-through text-gray-400 transition duration-200"
                                : ""
                            }
                          `}
                          >
                            {todo.text}
                          </span>
                        </div>
                        {/* action button */}
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-2 text-blue-500 rounded-lg duration-200
                            hover:text-blue-700 hover:bg-blue-100"
                            onClick={() => startEditing(todo)}
                          >
                            <MdModeEdit />
                          </button>

                          <button
                            className="px-3 py-2 text-red-500 rounded-lg duration-200
                            hover:text-red-700 hover:bg-red-100"
                            onClick={() => deleteTodo(todo._id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
