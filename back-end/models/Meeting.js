var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  name: { type: String },
  link: { type: String },
});

module.exports = mongoose.model("Meeting", MeetingSchema);
