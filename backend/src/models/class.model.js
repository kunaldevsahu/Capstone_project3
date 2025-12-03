const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    time: {
      type: String, // 10:00 AM
      required: true,
    },

    duration: {
      type: Number, // minutes
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
