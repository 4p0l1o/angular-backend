const mongoose = require("mongoose");
const workoutModel = mongoose.model("workout");

module.exports.createWorkout = async function (req,res) {
	workoutModel
		.findOne({ programName: req.body.programName, userId: req.body.userId })
		.where("programName")
		.equals(req.body.programName)
		.where("userId")
		.equals(req.body.userId)
		.exec()
		.then((result) => {
			if (!result) {
				workoutModel
					.create({
						programName: req.body.programName,
						exercise: [],
						userId: req.body.userId,
					})
					.then((workout) => {
						res.status(201).json({
                            "title": "Created",
                            workout
                        });
                    })
                    .catch(error => res.status(400)
                        .json({"title": "Unable to create workout record"})
                    );
			}
		});
};

module.exports.getWorkout = function (req, res) {
    workoutModel
        .findOne({ _id: req.params.workoutId })
        .where("_id")
        .equals(req.params.workoutId)
        .exec()
        .then((prog) => {
            res.status("200").json({
                userName: req.user.email,
                exercises: prog.exercise,
            })
        })
        .catch(error => res.status(500)
            .json({"title": "Unable to get workout record"})
        );
}