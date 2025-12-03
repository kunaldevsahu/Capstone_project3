const path = require("path");
const Trainer = require("../models/trainer.model");

// ✅ ADMIN: ADD TRAINER
exports.createTrainer = async (req, res) => {
  try {
    const { name, specialization, experience, phone } = req.body;

    let image;
    if (req.file) {
      // Serve via /uploads route; store relative URL
      const relativePath = path
        .join("uploads", "trainers", path.basename(req.file.path))
        .replace(/\\/g, "/");
      image = `/${relativePath}`;
    }

    const trainer = await Trainer.create({
      name,
      specialization,
      experience,
      phone,
      ...(image && { image }),
    });

    res.status(201).json({
      success: true,
      data: trainer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN + MEMBER: GET ALL TRAINERS
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: trainers,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN: DELETE TRAINER
exports.deleteTrainer = async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Trainer deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};