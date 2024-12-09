import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchTodos, addTodo, updateTodo } from "./actions/todoActions";
import DateAndTime from "./components/DateAndTime";
import Todo from "./components/Todo";
import { PulseLoader } from "react-spinners";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  const [focusTodo, setFocusTodo] = useState({});
  const [loadingTodos, setLoadingTodos] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchTodos(setTodos, setLoadingTodos);
  }, []);

  const editModeHandler = (mode, todo) => {
    console.log("value of edit mode before", editMode);
    if (!mode) {
      setEditMode(false);
      setNewTodo("");
      return;
    }
    console.log("edit mode clicked", todo);
    setNewTodo(todo.title);
    inputRef.current.focus();
    setEditMode(mode);
    setFocusTodo(todo);
    console.log("value of edit mode after", editMode);
  };

  const updateHandler = () => {
    updateTodo(focusTodo, false, setTodos, newTodo);
    setEditMode(!editMode);
    setNewTodo("");
  };

  return (
    <div
      className='flex h-full w-full justify-center bg-black min-h-screen bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      <div className='flex flex-col items-center mt-8 min-w-[90%] md:min-w-[70%] xl:min-w-[50%]'>
        <h1 className='font-extrabold md:font-extrabold text-6xl md:text-7xl text-white mb-8'>
          To-Do List
        </h1>
        <DateAndTime currentDateTime={currentDateTime} />
        <div className='w-full mb-4 flex items-center md:gap-4 gap-2'>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className='w-full p-2 rounded-md flex-1 bg-white text-black font-semibold'
            placeholder='Add a new task...'
            ref={inputRef}
          />
          {!editMode && (
            <button
              onClick={() => addTodo(setTodos, setNewTodo, newTodo)}
              className='px-6 py-2 bg-[#8d0090] text-white rounded-md hover:bg-[#800083]'
            >
              Add
            </button>
          )}
        </div>
        {editMode && (
          <div className='w-[80%] mx-auto'>
            <div className='flex items-center gap-2 justify-around'>
              <button
                onClick={updateHandler}
                className='px-6 py-2 bg-[#8d0090] text-white rounded-md hover:bg-[#800083]'
              >
                Update
              </button>
              <button
                onClick={() => editModeHandler(false)}
                className='px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-900'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {loadingTodos ? (
          <div className='w-full mt-32 flex justify-center items-center text-2xl text-white'>
            <PulseLoader color='#fff' size={10} />
          </div>
        ) : (
          <div className='w-full mt-6'>
            {todos.map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                setTodos={setTodos}
                editModeHandler={editModeHandler}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
