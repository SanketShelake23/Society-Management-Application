const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { createBill, getSocietyBills, getResidentBills } = require("../controllers/billControllers");

router.post("/", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), createBill);
router.get("/society", auth, role("SOCIETY_ADMIN", "COMMITTEE_MEMBER"), getSocietyBills);
router.get("/resident", auth, role("RESIDENT"), getResidentBills);

module.exports = router;