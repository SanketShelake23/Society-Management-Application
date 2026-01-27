const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { getComplaints, updateStatus, createComplaint, getMyComplaints } = require("../controllers/complaintControllers");

// Admim :
router.get("/", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), getComplaints );
router.put("/:id", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), updateStatus );

// Resident :
router.post("/", auth, role("RESIDENT"), createComplaint);
router.get("/my", auth, role("RESIDENT"), getMyComplaints);

module.exports = router;