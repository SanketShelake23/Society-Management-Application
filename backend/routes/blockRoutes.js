const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {createBlock, getBlocksBySociety} = require("../controllers/blockControllers");

router.post("/", auth, role("SUPER_ADMIN"), createBlock);
router.get("/:societyId", auth, role("SUPER_ADMIN"), getBlocksBySociety);

module.exports = router;