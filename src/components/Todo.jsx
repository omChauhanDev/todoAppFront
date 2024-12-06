const Todo = ({ completed, title }) => {

    return (
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-3 w-full">
        <input 
          type="checkbox" 
          checked={completed}
          className="w-5 h-5 rounded"
        />
        <span className="text-black text-lg">{title}</span>
      </div>
    );
  };
  
  export default Todo;