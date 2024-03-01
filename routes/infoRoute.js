const express = require("express");
const router = express.Router();
const infoController = require("../controllers/infoController");

router.route("/addInfo").get(infoController.infoRegister);
router.route("/getInfo").get(infoController.getAllInfo);
router.route("/updateInfo/:id").put(infoController.updateInfo);
module.exports = router;
