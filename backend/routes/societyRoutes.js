const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { createSociety, getAllSociety } = require("../controllers/societyControllers");



router.post("/", auth, role("SUPER_ADMIN"), createSociety);
router.get("/", auth, role("SUPER_ADMIN"), getAllSociety);

module.exports = router;