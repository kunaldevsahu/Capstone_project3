// src/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const membershipRoutes = require("./routes/membership.routes");
const planRoutes = require("./routes/plan.routes");
console.log("MONGO_URI =", process.env.MONGO_URI)
dotenv.config();

const app = express();
const trainerRoutes = require("./routes/trainer.routes");
const profileRoutes = require("./routes/profile.routes");





connectDB();


app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://capstone-project3-gyvt.onrender.com"
  ],
  credentials: true
}))
app.use(express.json());


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/classes", require("./routes/class.routes"))
app.use("/api/auth", authRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/members", require("./routes/member.routes"));
app.use("/api/trainers", trainerRoutes);
app.use("/api/classes", require("./routes/class.routes"));
app.use("/api/profile", profileRoutes);






// Health check route
app.get("/", (req, res) => {
  res.json({ message: "FitQuest Backend API is running" });
});

// Error handler (should be after routes)
app.use(errorMiddleware);

module.exports = app;
