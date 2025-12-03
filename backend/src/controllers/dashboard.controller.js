const User = require("../models/user.model");
const Membership = require("../models/membership.model");
const Payment = require("../models/payment.model");

exports.getAdminDashboardStats = async (req, res) => {
  const totalMembers = await User.countDocuments({ role: "member" });

  const activeMemberships = await Membership.countDocuments({
    status: "active",
  });
  const expiredMemberships = await Membership.countDocuments({
    status: "expired",
  });

  const totalRevenueAgg = await Payment.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  const recentPayments = await Payment.find()
    .populate("user", "email")
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: {
      totalMembers,
      activeMemberships,
      expiredMemberships,
      totalRevenue,
      recentPayments,
    },
  });
};
