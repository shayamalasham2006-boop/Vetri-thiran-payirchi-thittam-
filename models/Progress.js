const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weight_kg: { type: Number },
    bodyFatPercent: { type: Number },
    caloriesBurned: { type: Number },
    stepsCount: { type: Number },
    notes: { type: String },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
