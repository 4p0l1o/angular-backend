const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    logStatement: String,
    userId: String
},
{collection: 'log'})

const logModel = mongoose.model("log", logSchema);
logModel.createIndexes();
module.exports = logModel;