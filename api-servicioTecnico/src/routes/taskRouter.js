const express = require("express");
const taskRouter = express.Router();
const passport = require("../config/passport");

const taskController = require("../controllers/taskController");

taskRouter.get("/",taskController.getTasks)
taskRouter.post("/",taskController.getTasks)

taskRouter.post("/create",taskController.createTask)

taskRouter.get("/:id",taskController.getTaskById)
taskRouter.delete("/:id",taskController.deleteTask)

taskRouter.post("/update/:id",taskController.updateTaskData)

module.exports = taskRouter;
