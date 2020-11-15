const express = require("express");
const router = express.Router();
const logController = require("../controllers/log_controller");
const jwt = require("express-jwt");
const auth = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
});

router.post("/", auth, logController.createLog);
router.get("/", auth, logController.getLogs);

module.exports = router;
