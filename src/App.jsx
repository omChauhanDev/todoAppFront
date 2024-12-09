import { useState, useEffect } from 'react';
import './App.css';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './actions/todoActions';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos(setTodos); 
  }, []);

  return (
    <div className="flex h-full w-full justify-center bg-black min-h-screen">
      <div className="flex flex-col items-center mt-8 min-w-[90%] md:min-w-[70%] xl:min-w-[50%]">
        <h1 className="font-extrabold text-7xl text-white mb-8">To-Do List</h1>
        <div className="w-full mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full p-2 rounded"
            placeholder="Add a new task..."
          />
          <button
            onClick={()=>addTodo(setTodos, setNewTodo, newTodo)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
          >
            Add Todo
          </button>
        </div>
        <div className="w-full">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`flex items-center justify-between p-4 mb-2 rounded ${
                todo.completed ? 'bg-green-700' : 'bg-gray-800'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateTodo(todo, true, setTodos)}
              />
              <div
                className={`text-white cursor-pointer ${
                  todo.completed ? 'line-through' : ''
                }`}
              >
                {todo.title}
              </div>

              <button
                className='px-2 py-1'
                onClick={() => updateTodo(todo, false, setTodos, newTodo)}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id, setTodos)}
                className="px-2 py-1 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;