const router = require("express").Router();
const ctrl = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

router.get("/:projectId", auth, ctrl.getTasks);
router.post("/", auth, ctrl.createTask);
router.put("/:id", auth, ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);

module.exports = router;