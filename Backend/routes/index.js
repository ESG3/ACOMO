const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const quizRoutes = require("./quiz");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/quiz", quizRoutes);

module.exports = router;