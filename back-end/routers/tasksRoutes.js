const router = require("express").Router();
// const verifyToken = require("../middlewares/verifyToken");

const {
  getAllTasks,
  createTask,
  deleteTask,
  updateProgress,
} = require("../controllers/TasksController");

router.get("/", getAllTasks);
router.post("/", createTask);
router.post("/update-progress", updateProgress);
router.delete("/:id", deleteTask);

module.exports = router;
