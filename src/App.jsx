import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const getUrl = () => {
  const isHosted = window.location.href.includes("https");

  const baseUrl = isHosted
    ? "https://sec-assign-todo-app-backend.vercel.app"
    : "http://localhost:3001";
  return baseUrl;
};

function App() {

  const [todos, setTodos] = useState([]);

  // all todos get function
  const getTodo = async () => {
    const res = await axios(`${getUrl()}/api/v1/todos`);
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

      await axios.post(`${getUrl()}/api/v1/todo`, {
        todo: todoValue,
      });

      getTodo();
    } catch (error) {
      toast.dismiss();
      toast.error(error?.res?.data?.message || "unknown error");
    }
    event.target.reset();
  };

  // todo delete function
  const deleteTodo = async (id) => {
    try {
      const { data } = await axios.delete(`${getUrl()}/api/v1/todo/${id}`);
      console.log("delete todo", data);
      getTodo();
      toast.success(data?.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.res?.data?.message || "unknown error");
    }
  };

  // todo edit function
  const editTodo = async (event, todoId) => {
    try {
      event.preventDefault();
      const todoValue = event.target.children[0].value;

      await axios.patch(`${getUrl()}/api/v1/todo/${todoId}`, {
        todoContent: todoValue,
      });

      getTodo();
    } catch (error) {
      toast.dismiss();
      toast.error(error?.res?.data?.message || "unknown error");
    }
    event.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo App</h1>

        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none">
            Add
          </button>
        </form>

        {!todos.length && (
          <span className="text-center flex justify-center text-gray-700">
            Todos is empty
          </span>
        )}

        <ul className="divide-y divide-gray-200">
          {todos?.map((todo, index) => {
            return (
              <li
                key={todo?._id}
                className="flex items-center justify-between py-2"
              >
                {!todo.isEditing ? (
                  <span className="text-gray-700">{todo?.todoContent}</span>
                ) : (
                  <form onSubmit={(e) => editTodo(e, todo?._id)}>
                    <input
                      type="text"
                      className="border border-gray-400  rounded p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={todo?.todoContent}
                    />

                    <button
                      onClick={() => {
                        const newTodos = todos.map((todo, i) => {
                          todo.isEditing = false;

                          return todo;
                        });

                        setTodos([...newTodos]);
                      }}
                      className="text-red-500 hover:text-red-600 ml-[120px]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="text-green-500 hover:text-green-600 ml-2"
                    >
                      Save
                    </button>
                  </form>
                )}
                <div className="flex items-center space-x-2">
                  {!todo?.isEditing ? (
                    <button
                      onClick={() => {
                        const newTodos = todos.map((todo, i) => {
                          if (i === index) {
                            todo.isEditing = true;
                          } else {
                            todo.isEditing = false;
                          }
                          return todo;
                        });

                        setTodos([...newTodos]);
                      }}
                      className="text-green-500 hover:text-green-600"
                    >
                      Edit
                    </button>
                  ) : null}

                  {!todo?.isEditing ? (
                    <button
                      onClick={() => deleteTodo(todo?._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  ) : null}
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
