const mongoose = require("mongoose");
const logModel = mongoose.model("log");

module.exports.createLog = async function (req, res) {
	console.log("createLogs");
	var user = req.user.id;

	console.log(user, req.body.log);

	const log = new logModel();
	log.logStatement = req.body.log;
	log.userId = user;
	log.save(function (err) {
		if (err) {
			res.status(500).json({
				title: "Failed to create log",
				detail: `Failed to create log because: ${err.message}.`,
			});
		} else {
			res.status(201).json({title: "Created"});
		}
	});
};

module.exports.getLogs = async function (req, res) {
	var user = req.user.id;
	console.log("getLogs");

	logModel
		.find({ userId: user })
		.exec()
		.then((result) => {
			console.log(result);
			res.status("200").json(result);
		})
		.catch((error) =>
			res
				.status(500)
				.json({ title: "Unable to get user logs: ", reason: error })
		);
};
