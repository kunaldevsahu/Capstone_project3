const router = require("express").Router();
const protect = require("../middleware/auth.middleware");

const {
  getMyProfile,
  updateMyProfile,
  changePassword,
} = require("../controllers/profile.controller");

/* ✅ PROFILE ROUTES */
router.get("/me", protect, getMyProfile);
router.put("/update", protect, updateMyProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;
