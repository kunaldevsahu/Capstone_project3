const Class = require("../models/class.model");
const Trainer = require("../models/trainer.model");

/* ✅ ADMIN: CREATE CLASS */
exports.createClass = async (req, res) => {
  try {
    const { name, trainer, date, time, duration } = req.body;

    const trainerExists = await Trainer.findById(trainer);
    if (!trainerExists) {
      return res.status(404).json({ success: false, message: "Trainer not found" });
    }

    const newClass = await Class.create({
      name,
      trainer,
      date,
      time,
      duration,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✅ ADMIN & MEMBER: GET ALL CLASSES */
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("trainer", "name specialization");

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✅ ADMIN: DELETE CLASS */
exports.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;

    await Class.findByIdAndDelete(classId);

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
