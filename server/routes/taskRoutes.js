const express = require("express");

const router = express.Router();

const {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);
router.patch("/:id", toggleTaskStatus);

module.exports = router;