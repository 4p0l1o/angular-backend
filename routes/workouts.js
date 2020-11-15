const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts_controller');
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

router.get('/', workoutsController.getWorkouts);
router.post('/addWorkout', auth, workoutsController.addWorkout);
router.put('/addExerciseToWorkout', auth, workoutsController.addExerciseToWorkout);
router.get('/byid/:workoutId', auth, workoutsController.getWorkoutsById);
router.get('/byUserId', auth, workoutsController.getWorkoutsByUserId);

module.exports = router;