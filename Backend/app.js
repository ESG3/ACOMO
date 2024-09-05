const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI || "${MONGODB_URI}";

mongoose.connect(mongoURI)
    .then(() => console.log("몽고디비 연결 완료"))
    .catch(err => console.error("몽고디비 연결 오류:", err));

app.use("/", indexRouter);

app.use((req, res) => {
    res.status(404).json({error: "해당 요청을 찾을 수 없음"});
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({error: "서버 에러"});
});

const PORT = process.env.PORT || PORT;
app.listen(PORT, () => {
    console.log(" 서버가 PORT 포트에서 실행 중");
});