const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, default: 3 },
    reps: { type: Number, default: 10 },
    durationMinutes: { type: Number },
    caloriesBurned: { type: Number },
  },
  { _id: false }
);

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["cardio", "strength", "flexibility", "hiit", "custom"],
      default: "custom",
    },
    exercises: [exerciseSchema],
    date: { type: Date, default: Date.now },
    aiGenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
