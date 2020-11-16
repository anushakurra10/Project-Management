const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 0
  },
  managerId: [{
    type: mongoose.Types.ObjectId,
    required: true
  }],
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employee_name: { type: String, ref: 'User' },
  notes: {
    type: String,
    trim: true
  }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;