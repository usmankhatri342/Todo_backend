import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from 'react-hot-toast';


function App() {
  const BASE_URL = "https://sec-assign-todo-app-backend.vercel.app";

  const [todos, setTodos] = useState([]);

  // all todos get function
  const getTodo = async () => {
    const res = await axios(`${BASE_URL}/api/v1/todos`);
    const serverTodos = res?.data?.data;
    console.log("serverTodos", serverTodos);

    setTodos(serverTodos);
  };

  useEffect(() => {
    getTodo();
  }, []);

  // todo add function
  const addTodo = async (event) => {
    try {
      event.preventDefault();
      const todoValue = event.target.children[0].value;

      await axios.post(`${BASE_URL}/api/v1/todo`, {
        todo: todoValue,
      });

      getTodo();
    } catch (error) {
      data?.message;
    }
    event.target.reset();
  };

  // todo delete function
  const deleteTodo = async (id) => {
    try {
      const {data} = await axios.delete(`${BASE_URL}/api/v1/todo/${id}`);
      console.log('delete todo', data);
      getTodo();
      toast.success(data?.message)

    } catch (error) {
      toast.error(error?.res?.data?.message || "unknown error")
    };
  }

  return (
  
    <div className="min-h-screen bg-orange-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Todo App</h1>
 
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-400 focus:outline-none">
            Add
          </button>
        </form>
        
        {!todos.length && <span className="text-center flex justify-center text-gray-700">Todos is empty</span>}

        <ul className="divide-y divide-gray-200">
          {todos?.map((todo) => {
            return (
              <li
                key={todo?.id}
                className="flex items-center justify-between py-2"
              >
                <span className="text-gray-700">{todo?.todoContent}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-green-500 hover:text-green-600">
                    Edit
                  </button>
                  
                  <button onClick={() => deleteTodo(todo?.id)} className="text-red-500 hover:text-red-600">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}

          {/* Repeat similar <li> elements for more tasks */}
        </ul>
      </div>
    </div>
  );
}

export default App;
