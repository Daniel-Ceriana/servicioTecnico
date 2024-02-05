const Task = require("../models/taskModel");


const taskController = {
  getTasks: async (req, res) => {
   try {
        const tasks = await Task.find();

        return res.json({
            status:"success",
            response:tasks,
            message:"Tasks"
        })
   } catch (error) {
        return res.json({
            status:"error",
            message:"Something went wrong: ", error
        })
   }
    
  },
  createTask: async (req, res) => {
    try {
        const auxTask = new Task({
            clientFullName:req.body.clientFullName,
            clientEmail:req.body.clientEmail,
            clientCellphone:req.body.clientCellphone||0,
            employeeFullName:req.body.employeeFullName,
            description:req.body.description,
            status:req.body.status,
            price:req.body.price,
            amountPaid:req.body.amountPaid,
            dateIn:Date.now(),

        })
        auxTask.save();
        return res.json({
            status:"success",
            message:"Task created successfully"
        })
   } catch (error) {
        return res.json({
            status:"error",
            message:"Something went wrong: ", error
        })
   }
  },
  getTaskById: async (req, res) => {
    try {
        const task = await Task.findOne({_id:req.params.id});

        return res.json({
            status:"success",
            response:task,
            message:"Tasks"
        })
   } catch (error) {
        return res.json({
            status:"error",
            message:"Something went wrong: ", error
        })
   }
  },
  updateTaskData: async (req, res) => {
   
  },
  deleteTask: async (req, res) => {
   
  },


};

module.exports = taskController;