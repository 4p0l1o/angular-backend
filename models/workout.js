const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
	programName: String,
	userId:String,
	exercise: [
		{
			exerciseName: String,
			repetitions: Number,
			sets: Number,
			weight: Number,
			description: String,
		},
	],
});

const workoutModel = mongoose.model("workout", workoutSchema);
workoutModel.createIndexes();
