const User = require("../models/user");

exports.signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!/^[가-힣a-zA-Z0-9]+$/.test(username)) { return res.status(400).json({message: "아이디 형식이 잘못되었습니다. 띄어쓰기 없이 한글, 영어, 숫자만 사용할 수 있습니다."}); }
        if (await User.findOne({username})) { return res.status(400).json({message: "아이디가 이미 존재합니다."}); }
        await User({username, password}).save();
        res.status(201).json({message: "회원가입이 완료되었습니다."});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "서버 에러"});
    }
};

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username, password});
        if (!user) { return res.status(401).json({message: "잘못된 아이디 또는 비밀번호입니다."}) }
        res.status(200).json({message: "로그인 성공", user: { id: user?._id, username: username, password: user.password, level: user.level, correctAnswers: user.correctAnswers, createdQuizzes: user.createdQuizzes }});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "서버 에러"});
    }
};