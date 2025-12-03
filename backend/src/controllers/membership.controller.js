const Membership = require("../models/membership.model");
const Plan = require("../models/plan.model");
const Payment = require("../models/payment.model");

// ✅ USER BUYS MEMBERSHIP + AUTO PAYMENT
exports.buyMembership = async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan)
      return res.status(404).json({ success: false, message: "Plan not found" });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationInDays);

    // ✅ CREATE MEMBERSHIP
    const membership = await Membership.create({
      user: req.user.id,
      plan: plan._id,
      startDate,
      endDate,
      status: "active",
      paymentStatus: "paid",
    });

    // ✅ CREATE PAYMENT AUTOMATICALLY
    const payment = await Payment.create({
      user: req.user.id,
      membership: membership._id,
      amount: plan.price,
      method: paymentMethod || "UPI",
      status: "paid",
    });

    res.status(201).json({
      success: true,
      message: "Membership purchased & payment recorded",
      data: {
        membership,
        payment,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getMyMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({ user: req.user.id })
      .populate("plan");

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "No active membership found",
      });
    }

    res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ ADMIN: GET ALL MEMBERSHIPS
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate("user", "name email")
      .populate("plan", "name price");

    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getRevenueStats = async (req, res) => {
  try {
    // ✅ Total revenue
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // ✅ Counts
    const totalSales = await Payment.countDocuments({ status: "paid" });
    const activeCount = await Membership.countDocuments({ status: "active" });
    const expiredCount = await Membership.countDocuments({ status: "expired" });

    // ✅ Recent sales for list
    const recentSales = await Membership.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("plan", "name price");

    // ✅ Monthly revenue for chart
    const monthlyAgg = await Payment.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = monthlyAgg.map((m) => ({
      label: `${monthNames[m._id.month - 1]} ${m._id.year}`,
      total: m.total,
    }));

    res.status(200).json({
      success: true,
      totalRevenue,
      totalSales,
      activeCount,
      expiredCount,
      recentSales,
      monthlyRevenue, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
