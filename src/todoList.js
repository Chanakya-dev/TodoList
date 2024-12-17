import React, { useState, useCallback, useReducer, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Typography, Divider, FormControl, Select, MenuItem, InputLabel, Badge, Grid, Paper, Snackbar, Alert } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Reducer for managing tasks state
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), title: action.payload, completed: false, priority: action.priority }];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      );
    case "SET_TASKS":
      return action.payload;
    case "CLEAR_COMPLETED":
      return state.filter((task) => !task.completed);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch({ type: "SET_TASKS", payload: savedTasks });
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = useCallback(() => {
    if (newTask.trim()) {
      dispatch({ type: "ADD_TASK", payload: newTask, priority });
      setNewTask(""); // Clear input after adding
      setPriority("Low"); // Reset priority to Low
    }
  }, [newTask, priority]);

  // Handle deleting a task
  const handleDeleteTask = useCallback((taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  }, []);

  // Handle toggling task completion
  const handleToggleCompletion = useCallback((taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  }, []);

  // Handle task editing
  const handleEditTask = useCallback((taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask(taskToEdit.title);
  }, [tasks]);

  // Submit edited task
  const handleSaveEditedTask = useCallback(() => {
    if (editedTask.trim()) {
      dispatch({ type: "EDIT_TASK", payload: { id: editingTaskId, title: editedTask } });
      setEditingTaskId(null);
      setEditedTask("");
    }
  }, [editedTask, editingTaskId]);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Active") return !task.completed;
    return true; // Show all tasks for "All"
  });

  // Count tasks
  const tasksLeftCount = tasks.filter((task) => !task.completed).length;

  // Clear all completed tasks
  const handleClearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 3, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid container spacing={2} sx={{ maxWidth: 600, width: "100%" }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, backgroundColor: "#fff", boxShadow: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center", fontWeight: "bold" }}>
              To-Do List
            </Typography>

            {/* Input for adding new task */}
            <TextField
              label="New Task"
              variant="outlined"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              sx={{ marginBottom: 2 }}
              color="primary"
            />

            {/* Priority Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            {/* Button to add the new task */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              fullWidth
              sx={{ marginBottom: 3, borderRadius: "20px" }}
            >
              Add Task
            </Button>

            {/* Filter Tasks */}
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel>Filter Tasks</InputLabel>
              <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>

            {/* Task count */}
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Tasks Left: <Badge badgeContent={tasksLeftCount} color="primary" />
            </Typography>

            {/* Clear Completed Button */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearCompleted}
              fullWidth
              sx={{ marginBottom: 3, borderRadius: "20px" }}
            >
              Clear Completed Tasks
            </Button>

            <Divider sx={{ marginBottom: 2 }} />

            {/* List of tasks */}
            <List sx={{ textAlign: "left", padding: 0 }}>
              {filteredTasks.map((task) => (
                <ListItem key={task.id} sx={{ paddingLeft: 0, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleCompletion(task.id)}
                      color="primary"
                    />
                    {editingTaskId === task.id ? (
                      <TextField
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        onBlur={handleSaveEditedTask}
                        fullWidth
                        autoFocus
                      />
                    ) : (
                      <ListItemText
                        primary={task.title}
                        sx={{
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.priority === "High" ? "red" : task.priority === "Medium" ? "orange" : "black",
                          fontWeight: task.completed ? "normal" : "bold",
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton edge="end" color="error" onClick={() => handleDeleteTask(task.id)}>
                      <Delete />
                    </IconButton>
                    <IconButton edge="end" color="default" onClick={() => handleEditTask(task.id)}>
                      <Edit />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for clearing completed tasks */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Completed tasks have been cleared!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TodoApp;
