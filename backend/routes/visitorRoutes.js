const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { addVisitor, markExit, getSocietyVisitors, getResidentVisitors } = require("../controllers/visitorControllers");


router.post("/", auth, role("GUARD"), addVisitor);
router.put("/exit/:id", auth, role("GUARD"), markExit);
router.get("/", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER", "GUARD"), getSocietyVisitors);
router.get("/resident", auth, role("RESIDENT"), getResidentVisitors);

module.exports = router;