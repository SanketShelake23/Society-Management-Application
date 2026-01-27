const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { payBill } = require("../controllers/paymentControllers");

router.post("/", auth, role("RESIDENT"), payBill);

module.exports = router;