const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const { restrictTo } = require("../middleware/role.middleware");

const {
  createPlan,
  getActivePlans,
  getAllPlansAdmin,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/plan.controller");

// ✅ Public: Active plans (for users to see and buy)
router.get("/", getActivePlans);

// ✅ Admin: See all plans
router.get("/admin", protect, restrictTo("admin"), getAllPlansAdmin);


// ✅ Admin operations
router.get("/:id", protect, restrictTo("admin"), getPlanById);
router.post("/", protect, restrictTo("admin"), createPlan);
router.put("/:id", protect, restrictTo("admin"), updatePlan);
router.delete("/:id", protect, restrictTo("admin"), deletePlan);

module.exports = router;
