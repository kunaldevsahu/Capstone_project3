const router = require("express").Router();

// ✅ Middlewares
const protect = require("../middleware/auth.middleware");
const { restrictTo } = require("../middleware/role.middleware");

// ✅ Controller (SINGLE import, NO destructuring)
const membershipController = require("../controllers/membership.controller");




console.log("getAllMemberships:", typeof membershipController.getAllMemberships);
console.log("getRevenueStats:", typeof membershipController.getRevenueStats);


// ✅ MEMBER ROUTES
router.post(
  "/buy",
  protect,
  restrictTo("member"),
  membershipController.buyMembership
);

router.get(
  "/my",
  protect,
  restrictTo("member"),
  membershipController.getMyMembership
);

// ✅ ADMIN ROUTES
router.get(
  "/admin",
  protect,
  restrictTo("admin"),
  membershipController.getAllMemberships
);

router.get(
  "/stats",
  protect,
  restrictTo("admin"),
  membershipController.getRevenueStats
);

module.exports = router;
