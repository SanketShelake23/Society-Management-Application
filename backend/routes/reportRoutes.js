const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { billsReport, paymentReport, residentBillReport } = require("../controllers/reportControllers");

router.get("/bills", auth, role("SOCIETY_ADMIN", "ACCOUNTANT"), billsReport);
router.get("/payments", auth, role("ACCOUNTANT"), paymentReport);
router.get("/resident/bills", auth, role("RESIDENT"), residentBillReport);

module.exports = router;