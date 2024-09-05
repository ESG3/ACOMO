const User = require("../models/user");

exports.getUser = async (req, res) => {
    try {
        const {username} = req.params;
        const user = await User.findOne({username})
        if (!user) { return res.status(404).json({message: "사용자를 찾을 수 없습니다."}); }
        const {_id: id, __v, ...rest} = user;
        res.status(200).json({id, ...rest});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "서버 에러"});
    }
};