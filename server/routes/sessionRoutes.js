const express = require("express");
const router = express.Router();
const {
  getSessions,
  addSession,
  deleteSession,
  updateSession,
  clearTrainingPlan,
  updateAllSessions,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSessions).post(protect, addSession);

router.route("/removeFromPlan").get(protect, clearTrainingPlan);
router.route("/updateAll").post(protect, updateAllSessions);
router
  .route("/:id")
  .delete(protect, deleteSession)
  .post(protect, updateSession);

module.exports = router;
