const express = require("express");
var app = express();

const meetingRoutes = require("./meetingRoutes");
const tasksRoutes = require("./tasksRoutes");

app.use("/meeting", meetingRoutes);
app.use("/task", tasksRoutes);

module.exports = app;
