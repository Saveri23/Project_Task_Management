const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    projectId: String,
    title: String,
    completed: { type: Boolean, default: false },
    dueDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);