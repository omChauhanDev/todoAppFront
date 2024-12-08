import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const apiUrl = 'http://localhost:3000/todos/create';

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/todos/getAll');
      console.log('data', data);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const { data } = await axios.post(apiUrl, { title: newTodo });
      console.log('data', data);
      setTodos(data.data);
      setNewTodo(''); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // // Update a todo
  const updateTodo = async (todo, markCompleted) => {
    console.log('mark completed', markCompleted);


    if(!markCompleted){
      if (!newTodo.trim()) return;
    }
    console.log('before updating', todo);
    if(markCompleted){
      todo.completed = !todo.completed;
    } else {
      todo.title = newTodo;
    }

    console.log('after updating', todo);
    // todo updated in database

    try {
      const res = await axios.put(`http://localhost:3000/todos/update/${todo._id}`, todo);
      const data = res.data;
      console.log('data', data);
      setTodos(data.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  // // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const {data} = await axios.delete(`http://localhost:3000/todos/delete/${id}`);
      console.log('data', data);
      setTodos(data.data);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  useEffect(() => {
    fetchTodos(); 
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
            onClick={addTodo}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
          >
            Add Todo
          </button>
        </div>
        <div className="w-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 mb-2 rounded ${
                todo.completed ? 'bg-green-700' : 'bg-gray-800'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateTodo(todo, true)}
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
                onClick={() => updateTodo(todo, false)}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
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