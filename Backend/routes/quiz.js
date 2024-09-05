const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/create", quizController.createQuiz);
router.get("/:subject", quizController.getQuizzesBySubject);
router.post("/answer", quizController.answerQuiz);

module.exports = router;