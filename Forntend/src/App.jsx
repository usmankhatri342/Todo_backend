// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function App() {
//   //const BASE_URL = "http://localhost:5002";

//   const [todos, setTodos] = useState([]);

//   // console.log("todo", todos);

//   const [isEditing, setIsEditing] = useState()

//   const getTodo = async () => {
//     const res = await axios(`${BASE_URL}/api/v1/todos`);
//     const todosFromServer = res?.data?.data;
//     console.log("todosFromServer ", todosFromServer);

//     // const newnew = todosFromServer.map((todo) => {
//     //   return { ...todo, isEditing: false };
//     // });
//     setTodos(todosFromServer);
//   };

//   useEffect(() => {
//     getTodo();
//   }, []);

//   const addTodo = async (event) => {
//     try {
//       event.preventDefault();

//       const todoValue = event.target.children[0].value;

//       await axios.post(`${BASE_URL}/api/v1/todo`, {
//         todo: todoValue,
//       });
//       getTodo();

//       event.target.reset();
//     } catch (err) {}
//   };

//   const deleteTodo = async (todoId) => {
//     try {
//       console.log("todoId ", todoId);

//       const res = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`);

//       console.log("data ", res.data);

//       toast(res.data?.message);

//       getTodo();
//     } catch (err) {
//       console.log("mera error", err);

//       toast.error(err?.response?.data?.message || "unknown errorrr");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-semibold text-indigo-600 text-center mb-6">
//           Todo App
//         </h1>

//         {/* Input Section */}
//         <form onSubmit={addTodo} className="mb-6 flex flex-col gap-3">
//           <input
//             type="text"
//             placeholder="Enter your task"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
//           />
//           <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
//             Add Task
//           </button>
//         </form>

//         {!todos?.length && "todo nhi hy"}

//         {/* Todo List */}
//         <ul className="mt-6 space-y-4">
//           {todos?.map((todo, index) => (
//             <li
//               key={todo.id}
//               className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-200"
//             >
//               {!todo.isEditing ? (
//                 <span className="text-gray-700">{todo.todoContent}</span>
//               ) : (
//                 <input
//                   type="text"
//                   value={todo.todoContent}
//                   className="border border-gray-400"
//                 />
//               )}

//               <div className="space-x-3">
//                 {!todo.isEditing ? (
//                   <button
//                     onClick={() => {
//                       const newTodos = todos.map((todo, i) => {
//                         if (i === index) {
//                           todo.isEditing = true;
//                         } else {
//                           todo.isEditing = false;
//                         }
//                         return todo;
//                       });

//                       // todos[index].isEditing = true
//                       setTodos([...newTodos]);
//                     }}
//                     className="text-indigo-600 hover:text-indigo-700 focus:outline-none"
//                   >
//                     Edit
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       const newTodos = todos.map((todo, i) => {
//                         todo.isEditing = false;
//                         return todo;
//                       });
//                       setTodos([...newTodos]);
//                     }}
//                   >
//                     cancel
//                   </button>
//                 )}
//                 {!todo.isEditing ? (
//                   <button
//                     onClick={() => deleteTodo(todo.id)}
//                     className="text-red-600 hover:text-red-700 focus:outline-none"
//                   >
//                     Delete
//                   </button>
//                 ) : (
//                   <button>Save</button>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./App.css";
//import axios from "axios";
import toast from "react-hot-toast";
const App = () => {
  const base_url = "http://localhost:5002";
//  "https://todos-backend-5kwp.vercel.app";
  const [todos, setTodos] = useState([]);
  // const [inptodo, setInptodo] = useState(null);
  const getTodo = async () => {
    try {
    //  const res = await axios(`${base_url}/getTodos`);
      // let todoData = res?.data?.data.map((todo) => ({
      //   ...todo,
      //   todoContent: todo.todoContent || "No Content",
      //   id: todo.id || "No id",
        
      // }));
      let todoData = res?.data?.data;
      // todoData.map((todo) => (
      //  console.log("todo", todo.todoContent , todo.id)
       
      // ));
      console.log("todoData", todoData);
      setTodos(todoData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  // const inpvalue = (e) => {
  //   try {

  //     let todo = e.target[0].value;
  //     console.log(todo);
  //     setInptodo(todo);
  //     todo = e.target[0].value = "";
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   inpvalue();
  // }, []);


  //post request
  
  const addTodo = async (event) => {
    try {
      event.preventDefault();

      let inpValue = event.target[0].value;
      const res = await axios.post(`${base_url}/addTodo`, {
        todo: inpValue,
      });
      // console.log(res);
      getTodo(); //page refresh karne par value mil rhi thi is lye hume function ko call krna para
      event.target.reset(); //ye form ko clear krne k liye use hota hai
    } catch (error) {
      console.log(error);
    }
  };
  // delete requset
  const deleteTodo = async (todoId) => {
    // console.log("todoId", todoId);
   try {
    const {data}= axios.delete(`${base_url}/deletTodo/${todoId}`)
console.log("data", data);
    toast.success(data.message);
    getTodo();
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <>
      <div className="bg-gray-900 w-full p-4 shadow-lg">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-white font-bold text-2xl">Todo App With Persnal Back-End</div>
        </div>
      </div>
      <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-800 py-10">
        <h1 className="font-extrabold text-5xl py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Todo App</h1>
        <form onSubmit={addTodo} className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg">
          <input
            type="text"
            className="w-full border border-gray-600 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            placeholder="Enter your todo"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded hover:from-blue-600 hover:to-purple-700 transition duration-200"
          >
            Add Todo
          </button>
          <div className="mt-6">
            {!todos?.length && <div className="flex justify-center items-center font-bold text-gray-400">No Todos</div>}
            {todos?.map((value) => (
              <div
                key={value.id}
                className="flex justify-between items-center p-3 border border-gray-600 rounded mt-2 bg-gray-700 shadow-sm"
              >
                <div className="text-white">{value.todoContent}</div>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(value.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default App;