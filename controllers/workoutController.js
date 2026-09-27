const Workout = require("../models/Workout");

// @desc  Create a workout (optionally AI-suggested based on fitnessGoal)
// @route POST /api/workouts
const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({ ...req.body, user: req.user._id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all workouts for the logged-in user
// @route GET /api/workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get a single workout
// @route GET /api/workouts/:id
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update a workout
// @route PUT /api/workouts/:id
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete a workout
// @route DELETE /api/workouts/:id
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Simple rule-based "AI" workout plan generator
// @route GET /api/workouts/ai-suggestion
const getAiSuggestion = async (req, res) => {
  const goal = req.user.fitnessGoal || "maintenance";

  const plans = {
    weight_loss: {
      title: "Fat-Burn HIIT Circuit",
      type: "hiit",
      exercises: [
        { name: "Jumping Jacks", sets: 3, reps: 30 },
        { name: "Burpees", sets: 3, reps: 15 },
        { name: "Mountain Climbers", sets: 3, reps: 20 },
      ],
    },
    muscle_gain: {
      title: "Strength Builder Split",
      type: "strength",
      exercises: [
        { name: "Squats", sets: 4, reps: 10 },
        { name: "Push-ups", sets: 4, reps: 12 },
        { name: "Deadlifts", sets: 4, reps: 8 },
      ],
    },
    endurance: {
      title: "Endurance Booster",
      type: "cardio",
      exercises: [
        { name: "Running", sets: 1, durationMinutes: 30 },
        { name: "Cycling", sets: 1, durationMinutes: 20 },
      ],
    },
    maintenance: {
      title: "Full Body Maintenance",
      type: "custom",
      exercises: [
        { name: "Plank", sets: 3, reps: 1, durationMinutes: 1 },
        { name: "Lunges", sets: 3, reps: 12 },
      ],
    },
  };

  res.json({ suggestedPlan: plans[goal], aiGenerated: true });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getAiSuggestion,
};
