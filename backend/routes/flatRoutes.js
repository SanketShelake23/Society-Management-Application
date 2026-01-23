const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {createFlat, getFlatsByBlock, assignResident} = require("../controllers/flatControllers");

router.post("/", auth, role("SUPER_ADMIN"), createFlat);
router.get("/:blockId", auth, role("SUPER_ADMIN"), getFlatsByBlock);
router.put("/assign/:flatId", auth, role("SOCIETY_ADMIN"), assignResident);

module.exports = router;