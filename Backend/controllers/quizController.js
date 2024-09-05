const Quiz = require("../models/quiz");
const User = require("../models/user");
require("dotenv").config();
const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "${API_KEY}");
const model = genAI.getGenerativeModel({model: "gemini-pro"});

exports.createQuiz = async (req, res) => {
    try {
        const {subject, content, options, correctAnswer, explanation, creatorId} = req.body;
        if (await Quiz.findOne({content, subject})) { return res.status(400).json({message: "이 과목에는 이미 동일한 내용의 퀴즈가 존재합니다."}); }
        if (!options.includes(correctAnswer)) { return res.status(400).json({message: "정답은 반드시 보기 중 하나여야 합니다."}); }
        const prompt = `코딩 관련 퀴즈를 생성한 다음 정보를 바탕으로, 퀴즈에 대한 해설을 한 줄로 생성해 줘 (제공되는 퀴즈 정보는 해설에 포함하지 말아줘) \n\n과목: ${subject}\n내용: ${content}\n보기: ${options.join(", ")}\n정답: ${correctAnswer}\n메모: ${explanation}`;
        const result = await model.generateContent(prompt);
        const newQuiz = new Quiz({subject, content, options, correctAnswer, explanation: result.response.text() || explanation, creatorId});
        await newQuiz.save();
        await User.findOneAndUpdate({username: creatorId}, {$inc: {createdQuizzes: 1}});
        res.status(201).json({message: "퀴즈 생성 성공", quiz: {id: newQuiz._id, subject: newQuiz.subject, content: newQuiz.content, options: newQuiz.options, correctAnswer: newQuiz.correctAnswer, explanation: newQuiz.explanation, creatorId: newQuiz.creatorId.username}});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "서버 에러"});
    }
};

exports.getQuizzesBySubject = async (req, res) => {
    try {
        const {subject} = req.params;
        const subjectQuizzes = await Quiz.find({subject});
        if (subjectQuizzes.length < 10) { return res.status(400).json({message: "이 과목에는 현재 사용할 수 있는 퀴즈가 충분하지 않습니다."}); }
        const randomQuizzes = subjectQuizzes.sort(() => 0.5 - Math.random()).slice(0, 10);
        res.json(randomQuizzes.map(quiz => ({id: quiz._id, subject: quiz.subject, content: quiz.content, options: quiz.options, correctAnswer: quiz.correctAnswer, explanation: quiz.explanation, creatorId: quiz.creatorId})));
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "서버 에러"});
    }
};

exports.answerQuiz = async (req, res) => {
    try {
        const {quizId, selectedAnswer, userId} = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) { return res.status(404).json({message: "퀴즈를 찾을 수 없습니다."}); }
        if (quiz.correctAnswer === selectedAnswer) {
            await User.findOneAndUpdate({username: userId}, {$inc: {correctAnswers: 1}});
            const user = await User.findOne({username: userId});
            if (Math.floor(user.correctAnswers / 10) + 1 > user.level) { await User.findOneAndUpdate({username: userId}, {level: newLevel}); }
        }
        res.json({correct: isCorrect, correctAnswer: quiz.correctAnswer, explanation: quiz.explanation || "해설 내용이 없습니다."});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "서버 에러"});
    }
};