const fs = require("fs");
const path = require("path");

const tasksFile = path.join(__dirname, "../data/tasks.json");

// Get All Tasks
const getTasks = (req, res) => {
  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const sortedTasks = tasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(sortedTasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// Add Task
const addTask = (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description || "",
      dueDate: dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// Edit Task
const editTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, dueDate } = req.body;

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title,
          description,
          dueDate,
        };
      }
      return task;
    });

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(updatedTasks, null, 2)
    );

    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

// Delete Task
const deleteTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);

    let tasks = JSON.parse(fs.readFileSync(tasksFile));

    const updatedTasks = tasks.filter(
      (task) => task.id !== taskId
    );

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(updatedTasks, null, 2)
    );

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

// Toggle Complete / Incomplete
const toggleTaskStatus = (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(updatedTasks, null, 2)
    );

    res.status(200).json({
      message: "Task status updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task status",
    });
  }
};

module.exports = {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  toggleTaskStatus,
};