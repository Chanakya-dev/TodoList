import React, { useState } from "react";
import "./TodoApp.css"; // Import external CSS

const TodoAppNew = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Example task 1", description: "Example description", completed: false, date: "2024-06-18" },
  ]);
  const [view, setView] = useState("dashboard"); // 'dashboard', 'add', 'edit'
  const [currentTask, setCurrentTask] = useState(null);

  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });

  const handleAddTask = () => {
    const newId = Date.now();
    setTasks([...tasks, { id: newId, ...newTask, completed: false }]);
    setNewTask({ title: "", description: "", date: "" });
    setView("dashboard");
  };

  const handleEditTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id ? { ...task, title: newTask.title, description: newTask.description, date: newTask.date } : task
      )
    );
    setView("dashboard");
  };
  const handleDelete=()=>{
    setTasks(tasks.filter((task) => task.id !== currentTask.id));
    setView("dashboard");
  }

  const renderDashboard = () => (
    <div className="dashboard">
      <h2 style={{textAlign:"left"}}>Dashboard</h2>
      <div className="todo-logo">
        <img src="Todo.svg" alt="TO-DO"/>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              <strong>{task.title}</strong>
              <p>{task.date}</p>
            </div>
            <div>
              <button onClick={() => { setCurrentTask(task); setView("edit"); }}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-btn" onClick={() => setView("add")}>+ Add Task</button>
    </div>
  );

  const renderAddTask = () => (
    <div className="form-container">
      <button onClick={() => setView("dashboard")}>Dashboard</button>
      <h2>Add Task</h2>
      <div className="todo-logo">
        <img src="Todo.svg" alt="TO-DO"/>
      </div>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <input
        type="date"
        value={newTask.date}
        onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
      />
      <div className="form-buttons">
        <button onClick={handleAddTask}>Add</button>
        <button className="cancel-btn" onClick={() => setView("dashboard")}>Cancel</button>
      </div>
    </div>
  );

  const renderEditTask = () => (
    <div className="form-container">
      <button  onClick={() => setView("dashboard")} >Dashboard</button>
      <h2>Edit Task</h2>
      <div className="todo-logo">
        <img src="Todo.svg" alt="TO-DO"/>
      </div>
      <input
        type="text"
        placeholder="Title"
        defaultValue={currentTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        defaultValue={currentTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <input
        type="date"
        defaultValue={currentTask.date}
        onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
      />
      <div className="form-buttons">
        <button onClick={handleEditTask}>Save</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );

  return (
    <div className="todo-app">
      {view === "dashboard" && renderDashboard()}
      {view === "add" && renderAddTask()}
      {view === "edit" && renderEditTask()}
    </div>
  );
};

export default TodoAppNew;
