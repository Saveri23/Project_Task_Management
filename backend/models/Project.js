const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);