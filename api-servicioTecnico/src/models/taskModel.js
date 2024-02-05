const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({

    clientFullName:{type: String, required: true},
    clientEmail:{type: String, required: true},
    clientCellphone:{type: Number, required: false},
    employeeFullName:{type: String, required: true},
    description:{type:String, required: true},
    status:{type:String, required: true},
    price:{type: Number, required: true},
    amountPaid:{type: Number, required: true},
    // amount paid is number => can leave some paid on the first day and then pay the rest when the task is done.
    dateIn:{type: Date, required: true},
    dateOut:{type: Date, required: false}


});

const Tasks = mongoose.model("task", taskSchema);

module.exports = Tasks;
