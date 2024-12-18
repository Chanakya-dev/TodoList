import React, { useState, useEffect } from "react";
import "./TodoApp.css"; // Import external CSS

const TodoAppNew = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Example task 1", description: "This is an example description.", completed: false, date: "2024-06-18", priority: "Low" },
  ]);
  const [view, setView] = useState("dashboard"); // 'dashboard', 'add', 'edit', 'details'
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "", priority: "Low" });

  // Initialize newTask when entering the Edit view
  useEffect(() => {
    if (view === "edit" && currentTask) {
      setNewTask({
        title: currentTask.title,
        description: currentTask.description,
        date: currentTask.date,
        priority: currentTask.priority,
      });
    }
  }, [view, currentTask]);

  // Add a new task
  const handleAddTask = () => {
    if (newTask.title.trim() === "" || newTask.date.trim() === "") return;

    const newId = Date.now();
    setTasks([
      ...tasks,
      { id: newId, ...newTask, completed: false }
    ]);
    setNewTask({ title: "", description: "", date: "", priority: "Low" });
    setView("dashboard");
  };

  // Save an edited task
  const handleEditTask = () => {
    if (newTask.title.trim() === "" || newTask.date.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id
          ? { ...task, title: newTask.title, description: newTask.description, date: newTask.date, priority: newTask.priority }
          : task
      )
    );
    setView("dashboard");
  };

  // Delete a task
  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== currentTask.id));
    setView("dashboard");
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Render Dashboard View
  const renderDashboard = () => (
    <div style={{position:"fixed"}} className="dashboard">
      <h2>Dashboard</h2>
      <div className="todo-logo">
        <img src="Todo.svg" alt="TO-DO" />
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
            onClick={() => { setCurrentTask(task); setView("details"); }} // Show task details
          >
            <div className="task-content">
              <strong>{task.title}:</strong>
              <p>{task.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-btn" onClick={() => setView("add")}>+ Add Task</button>
    </div>
  );

  // Render Add Task View
  const renderAddTask = () => (
    <div className="form-container">
      <h2>Add Task</h2>
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

  // Render Edit Task View
  const renderEditTask = () => (
    <div className="form-container">
      <h2>Edit Task</h2>
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
        <button onClick={handleEditTask}>Save</button>
        <button className="delete-btn" onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  );

  // Render Task Details View
  const renderTaskDetails = () => (
    <div className="details-container">
      <h2>Task Details</h2>
      <div className="task-details">
        <div className="details-row">
          <strong>Title:</strong>
          <p>{currentTask.title}</p>
        </div>
        <div className="details-row">
          <strong>Description:</strong>
          <p>{currentTask.description}</p>
        </div>
        <div className="details-row">
          <strong>Date:</strong>
          <p>{currentTask.date}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }} className="button-container">
        <button  style={{ maxWidth:"30%",maxHeight:"auto" }} className="back-btn" onClick={() => setView("dashboard")}>Dashboard</button>
        <button style={{ maxWidth:"30%",maxHeight:"30%" }} className="edit-btn" onClick={() => setView("edit")}>Edit Task</button>
      </div>
    </div>
  );

  // Main Component Render
  return (
    <div className="todo-app">
      {view === "dashboard" && renderDashboard()}
      {view === "add" && renderAddTask()}
      {view === "edit" && renderEditTask()}
      {view === "details" && renderTaskDetails()}
    </div>
  );
};

export default TodoAppNew;
