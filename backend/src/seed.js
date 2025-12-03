const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user.model");
const Trainer = require("./models/trainer.model");
const Plan = require("./models/plan.model");
const ClassModel = require("./models/class.model");
const Membership = require("./models/membership.model");
const Payment = require("./models/payment.model");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected for Seeding");
};

const seedData = async () => {
  try {
    await connectDB();


    await User.deleteMany();
    await Trainer.deleteMany();
    await Plan.deleteMany();
    await ClassModel.deleteMany();
    await Membership.deleteMany();
    await Payment.deleteMany();


    const admin = await User.create({
      name: "Admin FitQuest",
      email: "admin@fitquest.com",
      password: "admin123",
      role: "admin",
    });

    const member1 = await User.create({
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      password: "123456",
      role: "member",
      phone: "9999999991",
    });

    const member2 = await User.create({
      name: "Pooja Verma",
      email: "pooja@gmail.com",
      password: "123456",
      role: "member",
      phone: "9999999992",
    });


    const trainer1 = await Trainer.create({
      name: "Amit Singh",
      specialization: "Strength Training",
      experience: 5,
      phone: "8888888881",
    });

    const trainer2 = await Trainer.create({
      name: "Neha Joshi",
      specialization: "Yoga & Flexibility",
      experience: 4,
      phone: "8888888882",
    });


    const plan1 = await Plan.create({
      name: "Basic Plan",
      price: 1500,
      durationInDays: 30,
    });

    const plan2 = await Plan.create({
      name: "Pro Plan",
      price: 4000,
      durationInDays: 90,
    });


    const class1 = await ClassModel.create({
      name: "Morning Strength",
      trainer: trainer1._id,
      date: "2025-12-05",
      time: "6:00 AM",
      duration: 60,
    });

    const class2 = await ClassModel.create({
      name: "Evening Yoga",
      trainer: trainer2._id,
      date: "2025-12-05",
      time: "6:30 PM",
      duration: 60,
    });


    const membership = await Membership.create({
      user: member1._id,
      plan: plan1._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 86400000),
      status: "active",
      paymentStatus: "paid",
    });

    await Payment.create({
      user: member1._id,
      membership: membership._id,
      amount: plan1.price,
      method: "UPI",
      status: "paid",
    });

    console.log("DUMMY DATA SEEDED SUCCESSFULLY");
    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedData();
