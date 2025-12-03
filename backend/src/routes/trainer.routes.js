const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const { restrictTo } = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

const {
  createTrainer,
  getAllTrainers,
  deleteTrainer,
} = require("../controllers/trainer.controller");

// ✅ BOTH ADMIN + MEMBER CAN VIEW TRAINERS
router.get("/", protect, restrictTo("admin", "member"), getAllTrainers);

// ✅ ONLY ADMIN CAN CREATE (with optional image upload)
router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("image"),
  createTrainer
);

// ✅ ONLY ADMIN CAN DELETE
router.delete("/:id", protect, restrictTo("admin"), deleteTrainer);

module.exports = router;
