const Meeting = require("../models/Meeting");

exports.getAllMeetings = async (req, res) => {
  try {
    const meeting = await Meeting.find({});
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.createMeeting = async (req, res) => {
  try {
    const { name, link } = req.body;
    const meeting = await Meeting.create({ name, link });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateMeeting = async (req, res) => {
  try {
    let meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      res.status(400).json({ message: "Not found meeting" });
    }
    meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    let meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      res.status(400).json({ message: "Not found meeting" });
    }

    await meeting.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
