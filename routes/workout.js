const express = require("express");
const router = express.Router();
const workoutController = require('../controllers/workout_controller');
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

router.post("/", auth, workoutController.createWorkout);
router.get("/:workoutId", auth, workoutController.getWorkout);

module.exports = router;
