const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.route("/").get(projectController.getAllProjects);
router.route("/addProject").post(projectController.projectRegister);
router.route("/:id").get(projectController.getProjectById);
router.route("/:id").delete(projectController.deleteProjectById);
router.route("/:id").put(projectController.updateProjectById);

module.exports = router;
