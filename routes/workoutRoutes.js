const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getAiSuggestion,
} = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");

router.get("/ai-suggestion", protect, getAiSuggestion);
router.route("/").post(protect, createWorkout).get(protect, getWorkouts);
router
  .route("/:id")
  .get(protect, getWorkoutById)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;
