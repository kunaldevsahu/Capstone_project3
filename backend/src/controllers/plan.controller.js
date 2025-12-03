const Plan = require("../models/plan.model");

// ✅ Admin: Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const { name, price, durationInDays, description } = req.body;

    if (!name || !price || !durationInDays) {
      return res.status(400).json({
        success: false,
        message: "Name, price and duration are required",
      });
    }

    const plan = await Plan.create({
      name,
      price,
      durationInDays,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Public / User: Get active plans (for buy membership page)
exports.getActivePlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort("price");
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin: Get all plans (including inactive)
exports.getAllPlansAdmin = async (req, res) => {
  try {
    const plans = await Plan.find().sort("price");
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin: Get single plan
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin: Update plan
exports.updatePlan = async (req, res) => {
  try {
    const updated = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin: Delete plan
exports.deletePlan = async (req, res) => {
  try {
    const deleted = await Plan.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
