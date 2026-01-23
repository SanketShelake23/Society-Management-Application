const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {createSocietyAdmin, createResident, createGuard} = require("../controllers/userControllers");

router.post("/society-admin", auth, role("SUPER_ADMIN"), createSocietyAdmin);
router.post("/resident", auth, role("SOCIETY_ADMIN","COMMITTEE_MEMBER"), createResident);
router.post("/guard", auth, role("SOCIETY_ADMIN"), createGuard);

module.exports = router;