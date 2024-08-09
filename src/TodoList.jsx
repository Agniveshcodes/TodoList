import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState("");
  const [showFinshed, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todo = JSON.parse(localStorage.getItem("todos"));
      setTodo(todo);
    }
  }, []);

  const SaveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todo));
  };

  function handleRefresh() {
    setTodo([]);
  }
  function handleTaskChange(e) {
    setTask(e.target.value);
  }
  function handleTodo() {
    setTodo([...todo, { id: uuidv4(), title: task, isCompleted: false }]);
    setTask("");
    setShow(false);
    SaveToLs();
  }
  function handleCancel() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }
  function handleDelete(e, id) {
    let newTodo = todo.filter((items) => {
      return items.id !== id;
    });

    setTodo(newTodo);
    SaveToLs();
  }

  function handleChangeCheckBox(e) {
    let id = e.target.name;
    let index = todo.findIndex((items) => {
      return items.id === id;
    });
    let newTodo = [...todo];
    newTodo[index].isCompleted = !newTodo[index].isCompleted;
    setTodo(newTodo);
  }

  function handleShowFinished() {
    setShowFinished(!showFinshed);
  }

  return (
    <>
      <div className="flex justify-between my-10 mx-16">
        <h1 className="text-3xl font-semibold"> Things to get done </h1>
        <button
          className="bg-yellow-400 text-white font-semibold text-lg px-2 py-1 rounded-md"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>

      <h2 className="text-lg mx-16 font-semibold"> Things to do </h2>

      {todo.length === 0 ? (
        <div className="text-xl font-semibold mx-16 mt-8"> No Todos Added </div>
      ) : (
        todo.map((items, index) => {
          return (
            <div key={index} className="flex gap-16 mx-16 mt-2">
              <input
                type="checkbox"
                name={items.id}
                onChange={handleChangeCheckBox}
                className="text-lg "
              />
              <span
                className={
                  items.isCompleted === true
                    ? " line-through "
                    : " " + " text-xl font-semibold"
                }
              >
                {" "}
                {items.title}{" "}
              </span>
              <button
                className="bg-red-600 text-white  text-sm px-2 rounded-md"
                onClick={(e) => {
                  handleDelete(e, items.id);
                }}
              >
                delete
              </button>
            </div>
          );
        })
      )}

      {show == true && (
        <div className="flex flex-col w-80 mx-16 my-4 ">
          <h1 className="text-xl font-semibold mb-8"> Create a todo</h1>
          <input
            type="text"
            placeholder="things to do"
            value={task}
            onChange={handleTaskChange}
            className="border-2 border-gray-400 px-2 py-1 rounded-lg"
          />
          <div className="flex gap-4 mt-8">
            <button
              disabled={task.length <= 3}
              className="bg-yellow-400 text-white font-semibold text-lg px-2 rounded-md disabled:bg-yellow-300 "
              onClick={handleTodo}
            >
              save
            </button>
            <button
              className=" font-semibold text-lg px-2 rounded-md border-2 border-gray-400"
              onClick={handleCancel}
            >
              cancel
            </button>
          </div>
        </div>
      )}

      <button
        className="bg-yellow-400 text-white font-semibold text-lg px-2 py-1 rounded-md mx-16 my-6"
        onClick={handleShow}
      >
        + Add a todo
      </button>

      <div className="flex ">
        <input
          type="checkbox"
          className="ml-16 text-xl"
          checked={showFinshed}
          onChange={handleShowFinished}
        />
        <span className="text-xl font-semibold ml-3"> Show Finsihed </span>
      </div>

      {todo.map((items, index) => {
        return (
          (showFinshed || !items.isCompleted) && (
            <div key={index} className="flex gap-16 mx-16 mt-2">
              {items.isCompleted === true && (
                <span className=" text-xl font-semibold">{items.title}</span>
              )}
            </div>
          )
        );
      })}
    </>
  );
}

export default TodoList;
