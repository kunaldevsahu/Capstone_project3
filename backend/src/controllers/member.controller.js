const User = require("../models/user.model");

// ✅ ADMIN: GET ALL MEMBERS
exports.getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN: DELETE MEMBER
exports.deleteMember = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN: UPDATE MEMBER STATUS (active / blocked)
exports.updateMemberStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const member = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

