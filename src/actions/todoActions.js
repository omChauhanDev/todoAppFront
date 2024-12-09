import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


  // Fetch todos from the server
  export const fetchTodos = async (setTodos) => {
    try {
      const { data } = await axios.get(`${backendUrl}/todos/getAll`);
      console.log('data', data);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // // Add a new todo
  export const addTodo = async (setTodos, setNewTodo, newTodo) => {
    if (!newTodo.trim()) return;
    try {
      const { data } = await axios.post(`${backendUrl}/todos/create`, { title: newTodo });
      console.log('data', data);
      setTodos(data.data);
      setNewTodo(''); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // // Update a todo
  export const updateTodo = async (todo, markCompleted, setTodos, newTodo) => {
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
      const res = await axios.put(`${backendUrl}/todos/update/${todo._id}`, todo);
      const data = res.data;
      console.log('data', data);
      setTodos(data.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  // // Delete a todo
  export const deleteTodo = async (id, setTodos) => {
    try {
      const {data} = await axios.delete(`${backendUrl}/todos/delete/${id}`);
      console.log('data', data);
      setTodos(data.data);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
