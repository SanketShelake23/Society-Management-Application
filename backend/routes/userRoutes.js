const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {createSocietyAdmin, createResident, createGuard, getSocietyAdmins, updateSocietyAdmin, deleteSocietyAdmin, createAccountant, getResidents, updateResident, deleteResident, getUnassignedResidents, unassignSocietyAdmin, getGuards, deleteGuard, getAccountant, deleteAccountant} = require("../controllers/userControllers");

router.post("/society-admin", auth, role("SUPER_ADMIN"), createSocietyAdmin);
router.get("/society-admin", auth, role("SUPER_ADMIN"), getSocietyAdmins);
// router.put("/society-admin/:id", auth, role("SUPER_ADMIN"), updateSocietyAdmin);
router.delete("/society-admin/:id", auth, role("SUPER_ADMIN"), deleteSocietyAdmin);


router.get("/resident/unassigned", auth, role("SOCIETY_ADMIN","COMMITTEE_MEMBER"), getUnassignedResidents);
router.post("/resident", auth, role("SOCIETY_ADMIN","COMMITTEE_MEMBER"), createResident);
router.get("/resident", auth, role("SOCIETY_ADMIN","COMMITTEE_MEMBER"), getResidents);
router.put("/resident/:id", auth, role("SOCIETY_ADMIN","COMMITTEE_MEMBER"), updateResident);
router.delete("/resident/:id", auth, role("SOCIETY_ADMIN","COMMITTEE_MEMBER"), deleteResident);



router.post("/guard", auth, role("SOCIETY_ADMIN"), createGuard);
router.get("/guard", auth, role("SOCIETY_ADMIN"), getGuards);
router.delete("/guard/:id", auth, role("SOCIETY_ADMIN"), deleteGuard);

router.post("/accountant", auth, role("SOCIETY_ADMIN"), createAccountant);
router.get("/accountant", auth, role("SOCIETY_ADMIN"), getAccountant);
router.delete("/accountant/:id", auth, role("SOCIETY_ADMIN"), deleteAccountant);

module.exports = router;