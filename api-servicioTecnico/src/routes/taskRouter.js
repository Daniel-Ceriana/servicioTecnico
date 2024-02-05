const express = require("express");
const taskRouter = express.Router();
const passport = require("../config/passport");

const taskController = require("../controllers/taskController");

taskRouter.get("/",taskController.getTasks)
taskRouter.post("/",taskController.getTasks)

taskRouter.post("/create",taskController.createTask)

taskRouter.get("/:id",taskController.getTaskById)
taskRouter.post("/:id",taskController.updateTaskData)
taskRouter.delete("/:id",taskController.deleteTask)


module.exports = taskRouter;
