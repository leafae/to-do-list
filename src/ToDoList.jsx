import React, { useEffect, useState } from "react";
import "./ToDoList.css";
import { BsSun, BsMoon } from "react-icons/bs";

export const ToDoList = () => {
  // Load tasks and dark mode from local storage
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [newTask, setNewTask] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
    return;
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    return;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <h1 className="title">To-Do-List</h1>
        <button className="modeBtn" onClick={toggleDarkMode}>
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>
      </div>
      <div className="addTask">
        <input
          className="inputTask"
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="addBtn" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="taskLists">
        <ul>
          {tasks.map((task, index) => {
            return (
              <li key={index} className="task">
                <span>{task}</span>
                <button className="deleteBtn" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
