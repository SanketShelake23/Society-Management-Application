const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { createNotice, getNotices } = require("../controllers/noticeControllers");

router.post("/", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), createNotice);
router.get("/", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER", "RESIDENT"), getNotices);

module.exports = router;