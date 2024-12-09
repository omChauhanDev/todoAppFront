import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchTodos = async (setTodos, setLoadingTodos) => {
  try {
    const { data } = await axios.get(`${backendUrl}/todos/getAll`);
    console.log("data", data);
    setTodos(data);
    setLoadingTodos(false);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const addTodo = async (setTodos, setNewTodo, newTodo) => {
  if (!newTodo.trim()) return;

  // Optimistic update
  const tempTodo = {
    _id: Date.now(), // Temporary ID
    title: newTodo,
    completed: false,
  };

  setTodos((prev) => [...prev, tempTodo]);
  setNewTodo("");

  try {
    const { data } = await axios.post(`${backendUrl}/todos/create`, {
      title: newTodo,
    });
    setTodos(data.data);
  } catch (error) {
    // Revert on error
    setTodos((prev) => prev.filter((todo) => todo._id !== tempTodo._id));
    console.error("Error adding todo:", error);
  }
};

export const updateTodo = async (todo, markCompleted, setTodos, newTodo) => {
  if (!markCompleted && !newTodo?.trim()) return;

  // Create updated todo
  const updatedTodo = {
    ...todo,
    completed: markCompleted ? !todo.completed : todo.completed,
    title: markCompleted ? todo.title : newTodo,
  };

  // Optimistic update
  setTodos((prev) => prev.map((t) => (t._id === todo._id ? updatedTodo : t)));

  try {
    const res = await axios.put(
      `${backendUrl}/todos/update/${todo._id}`,
      updatedTodo
    );
    setTodos(res.data.data);
  } catch (error) {
    // Revert on error
    setTodos((prev) => prev.map((t) => (t._id === todo._id ? todo : t)));
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id, setTodos) => {
  // Store current todos for potential rollback
  let previousTodos = [];
  setTodos((prev) => {
    previousTodos = [...prev];
    return prev.filter((todo) => todo._id !== id);
  });

  try {
    const { data } = await axios.delete(`${backendUrl}/todos/delete/${id}`);
    setTodos(data.data);
  } catch (error) {
    // Revert on error
    setTodos(previousTodos);
    console.error("Error deleting todo:", error);
  }
};
