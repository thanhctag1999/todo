const router = require("express").Router();

const {
  getAllMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/MeetingController");

router.get("/", getAllMeetings);
router.post("/", createMeeting);
router.put("/:id", updateMeeting);
router.delete("/:id", deleteMeeting);

module.exports = router;
