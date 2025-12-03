const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or relative path to uploaded image
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
