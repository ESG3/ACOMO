const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    subject: {type: String, required: true, enum: ["HTML", "CSS", "JavaScript", "Git", "AI", "Node", "MongoDB", "Express", "React"]},
    content: {type: String, required: true},
    options: {type: [{type: String}], required: true, validate: [arrayLimit, "{PATH} exceeds the limit of 5"]},
    correctAnswer: {type: String, required: true},
    explanation: {type: String},
    creatorId: {type: String, required: true},
}, {
    versionKey : false
});

function arrayLimit(val) { return val.length >= 2 && val.length <= 5; }

module.exports = mongoose.model("Quiz", quizSchema);