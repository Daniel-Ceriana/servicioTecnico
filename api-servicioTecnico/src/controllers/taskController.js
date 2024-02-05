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
            // clientFullName:"Nombre de cliente",
            // clientEmail:"email de cliente",
            // clientCellphone:111111111,
            // employeeFullName:"Nombre de Empleado",
            // description:"Descripcion de trabajo, aca deberia ir todo lo relacionado con los aspectos tecnicos y observaciones que haya del producto a reparar",
            // status:"started",
            // price:4000,
            // amountPaid:1500,
            clientFullName:req.body.clientFullName,
            clientEmail:req.body.clientEmail,
            clientCellphone:req.body.clientCellphone,
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
   
  },
  updateTaskData: async (req, res) => {
   
  },
  deleteTask: async (req, res) => {
   
  },


};

module.exports = taskController;