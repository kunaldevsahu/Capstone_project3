const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const { restrictTo } = require("../middleware/role.middleware");
const { getAdminDashboardStats } = require("../controllers/dashboard.controller");

router.get("/admin", protect, restrictTo("admin"), getAdminDashboardStats);

module.exports = router;
