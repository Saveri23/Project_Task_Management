const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
  });

  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};