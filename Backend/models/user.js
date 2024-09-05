const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    level: {type: Number, default: 1},
    correctAnswers: {type: Number, default: 0},
    createdQuizzes: {type: Number, default: 0},
}, {
    versionKey : false
});

module.exports = mongoose.model("User", userSchema);