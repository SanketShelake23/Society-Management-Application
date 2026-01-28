const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {createBlock, getBlocksBySociety, deleteBlock} = require("../controllers/blockControllers");

router.post("/", auth, role("SUPER_ADMIN"), createBlock);
router.get("/:societyId", auth, role("SUPER_ADMIN"), getBlocksBySociety);
router.delete("/:id", auth, role("SUPER_ADMIN"), deleteBlock);

module.exports = router;