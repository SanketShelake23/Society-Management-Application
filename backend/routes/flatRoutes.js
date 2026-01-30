const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {createFlat, getFlatsByBlock, assignResident, deleteFlat, getUnassignedFlats, getAssignedFlats, unassignResident} = require("../controllers/flatControllers");

router.get("/unassigned", auth, role("SOCIETY_ADMIN"), getUnassignedFlats);
router.get("/assigned", auth, role("SOCIETY_ADMIN"), getAssignedFlats);
router.put("/assign/:flatId", auth, role("SOCIETY_ADMIN"), assignResident);
router.put("/unassign/:flatId", auth, role("SOCIETY_ADMIN"), unassignResident);


router.post("/", auth, role("SUPER_ADMIN"), createFlat);

router.get("/:blockId", auth, role("SUPER_ADMIN", "GUARD"), getFlatsByBlock);

router.delete("/:id", auth, role("SUPER_ADMIN"), deleteFlat );


module.exports = router;