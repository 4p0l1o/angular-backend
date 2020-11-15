const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const workouts = mongoose.model("workout");
var ObjectID = require('mongodb').ObjectID;   


module.exports.getWorkouts = async function(req, res){
    workouts
        .find({})
        .exec()
        .then((workouts) => {
            res.status("200").json({
                workout: workouts
            });
        });
};

module.exports.getWorkoutsById = function(req, res){
    workouts.findOne({_id: new ObjectID(req.params.workoutId)}).exec().then((workout)=>{
        res.status("200").json(
            workout);
    }).catch(err => err);
};

//https://stackoverflow.com/a/54743836 - get userid from jwt-token
module.exports.getWorkoutsByUserId = async function(req, res) {
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        console.log(decoded.id);
        workouts
            .find({})
            .where('userId')
            .equals(decoded.id)
            .exec()
            .then((workouts) => {
                res.status("200").json({
                    workout: workouts
                });
            });
    //}

};

module.exports.addWorkout = function(req, res){
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    console.log(decoded.id);
    workouts.create({
        programName: req.body.programName,
        userId: decoded.id,
    }).then(workout =>
        res.status(201).json({
            "title": "Created",
            workout
        })
    );
}

module.exports.addExerciseToWorkout = function(req, res) {
    workouts.findOne({ _id: new ObjectID( req.body.workoutId)})
    .exec()
    .then((doc) =>{
        if(doc == null) {
            res.status("500"); 
        }
        doc.exercise.push({
            exerciseName: req.body.exerciseName,
            repetitions: req.body.repetitions,
            sets: req.body.sets,
            weight: req.body.weight,
            description: req.body.description,
        });
        doc.save();
        res.status("200").json(doc);
    })
    .catch((err) => 
        res.status("500")
    );
}