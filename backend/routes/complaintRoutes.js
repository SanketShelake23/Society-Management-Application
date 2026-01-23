const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { getComplaints, updateStatus } = require("../controllers/complaintControllers");

router.get("/", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), getComplaints );
router.put("/:id", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), updateStatus );

module.exports = router;