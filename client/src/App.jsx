import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await createTask({
        title,
        description,
        dueDate,
      });

      setTitle("");
      setDescription("");
      setDueDate("");

      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTaskStatus(id);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (task) => {
    const newTitle = prompt("Edit Title", task.title);

    if (newTitle === null) return;

    const newDescription = prompt(
      "Edit Description",
      task.description
    );

    if (newDescription === null) return;

    const newDueDate = prompt(
      "Edit Due Date (YYYY-MM-DD)",
      task.dueDate
    );

    if (newDueDate === null) return;

    try {
      await updateTask(task.id, {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
      });

      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = tasks.length - completedTasks;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Personal Task Manager</h1>

      <p>
        <strong>Total:</strong> {tasks.length} |{" "}
        <strong>Active:</strong> {activeTasks} |{" "}
        <strong>Completed:</strong> {completedTasks}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <br />
        <br />

        <button type="submit">
          Add Task
        </button>
      </form>

      <hr />

      <button onClick={() => setFilter("all")}>
        All
      </button>

      <button
        onClick={() => setFilter("active")}
        style={{ marginLeft: "10px" }}
      >
        Active
      </button>

      <button
        onClick={() => setFilter("completed")}
        style={{ marginLeft: "10px" }}
      >
        Completed
      </button>

      <hr />

      {filteredTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: task.completed
                ? "#d4edda"
                : "#ffffff",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Due Date:</strong>{" "}
              {task.dueDate || "Not Set"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {task.completed
                ? "Completed"
                : "Active"}
            </p>

            <button
              onClick={() =>
                handleToggle(task.id)
              }
            >
              {task.completed
                ? "Mark Active"
                : "Mark Complete"}
            </button>

            <button
              onClick={() =>
                handleEdit(task)
              }
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(task.id)
              }
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;