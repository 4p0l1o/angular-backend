const mongoose = require("mongoose");

var dbURI =
	"mongodb+srv://group22:NjUUeyM1bh5pKKLr@itwebe20group22.5dh5y.azure.mongodb.net/assignment1?retryWrites=true&w=majority";
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
	console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on("error", (err) => {
	console.log("Mongoose connection error:", err);
	ks;
});
mongoose.connection.on("disconnected", () => {
	console.log("Mongoose disconnected");
});

require("./user");
require("./workout");
require("./log");
