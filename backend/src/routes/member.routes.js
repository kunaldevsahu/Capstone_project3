const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const { restrictTo } = require("../middleware/role.middleware");

const {
  getAllMembers,
  deleteMember,
  updateMemberStatus,
} = require("../controllers/member.controller");

// ✅ ADMIN ONLY
router.get("/", protect, restrictTo("admin"), getAllMembers);
router.delete("/:id", protect, restrictTo("admin"), deleteMember);
router.put("/:id/status", protect, restrictTo("admin"), updateMemberStatus);

module.exports = router;
