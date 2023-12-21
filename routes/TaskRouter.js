const express = require("express");
const router = express.Router();

const {
  createTask,
  readAllTasks,
  readTask,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");

router.route("/").get(readAllTasks).post(createTask);
router.route("/:id").get(readTask).patch(updateTask).delete(deleteTask);

module.exports = router;
