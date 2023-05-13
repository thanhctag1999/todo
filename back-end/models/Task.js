var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  tittle: { type: String },
  process: { type: String, default: "Waiting" },
});

module.exports = mongoose.model("Task", TaskSchema);
