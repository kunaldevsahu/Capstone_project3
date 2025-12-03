const router = require("express").Router();

const protect = require("../middleware/auth.middleware");
const { restrictTo } = require("../middleware/role.middleware");

const {
  createClass,
  getAllClasses,
  deleteClass,
} = require("../controllers/class.controller");

/* ✅ VIEW FOR BOTH ADMIN & MEMBER */
router.get("/", protect, getAllClasses);

/* ✅ ADMIN ONLY */
router.post("/", protect, restrictTo("admin"), createClass);
router.delete("/:id", protect, restrictTo("admin"), deleteClass);

module.exports = router;
