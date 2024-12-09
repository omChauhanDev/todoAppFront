import { deleteTodo, updateTodo } from "../actions/todoActions";
import { MdEdit, MdDelete } from "react-icons/md";

const Todo = ({ todo, setTodos, editModeHandler }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 mb-3 rounded-lg ${
        todo.completed ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      <div className='flex items-center gap-3 ml-2'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => updateTodo(todo, true, setTodos)}
          className='w-4 h-4 rounded border border-gray-300 
             appearance-none 
             checked:bg-[#8d0090]
             checked:before:content-["✓"] 
             checked:before:text-white 
             checked:before:block 
             checked:before:text-center 
             checked:before:leading-4'
        />
        <div
          className={`text-white cursor-pointer font-semibold ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.title}
        </div>
      </div>

      <div className='flex items-center gap-1'>
        <button
          className='px-2 py-1'
          // onClick={() => updateTodo(todo, false, setTodos, newTodo)}
          onClick={() => editModeHandler(true, todo)}
        >
          <MdEdit className='text-xl' />
        </button>
        <button
          onClick={() => deleteTodo(todo._id, setTodos)}
          className='px-2 py-1 text-red-500 hover:text-red-700'
        >
          <MdDelete className='text-xl text-white' />
        </button>
      </div>
    </div>
  );
};

export default Todo;
