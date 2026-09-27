const Progress = require("../models/Progress");

// @desc  Log a new progress entry
// @route POST /api/progress
const addProgress = async (req, res) => {
  try {
    const entry = await Progress.create({ ...req.body, user: req.user._id });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all progress entries for the logged-in user
// @route GET /api/progress
const getProgress = async (req, res) => {
  try {
    const entries = await Progress.find({ user: req.user._id }).sort({ recordedAt: 1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete a progress entry
// @route DELETE /api/progress/:id
const deleteProgress = async (req, res) => {
  try {
    const entry = await Progress.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Progress entry removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProgress, getProgress, deleteProgress };
