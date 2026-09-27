const express = require("express");
const router = express.Router();
const { addProgress, getProgress, deleteProgress } = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addProgress).get(protect, getProgress);
router.route("/:id").delete(protect, deleteProgress);

module.exports = router;
