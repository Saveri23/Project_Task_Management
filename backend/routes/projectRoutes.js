const router = require("express").Router();
const ctrl = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, ctrl.getProjects);
router.post("/", auth, ctrl.createProject);
router.delete("/:id", auth, ctrl.deleteProject);

module.exports = router;