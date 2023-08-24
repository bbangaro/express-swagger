import express from "express";
import cors from "cors";

// swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/swaggerOptions.js";
const swaggerSpec = swaggerJsdoc(options);

// db
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";

// utils
import { getToken, sendTokenToSMS } from "./phone.js";
import { createUser } from "./email.js";
import { Stock } from "./models/stock.model.js";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/boards", async (req, res) => {
  // const result = [
  //   { id: 1, user: "휴", title: "휴 제목", contents: "휴 내용" },
  //   { id: 2, user: "용", title: "용 제목", contents: "용 내용" },
  //   { id: 3, user: "서나", title: "서나 제목", contents: "서나 내용" },
  // ];
  console.log("게시판 조회");
  const result = await Board.find();

  res.send(result);
});

app.post("/boards", async (req, res) => {
  console.log(req.body);
  const { user, title, contents } = req.body;

  const board = new Board({
    user: user,
    title: title,
    contents: contents,
  });
  await board.save();

  res.send("게시물 등록 성공!!");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.phone;
  const valid = true;

  if (valid) {
    const result = getToken(6);
    sendTokenToSMS(myPhone, result);
  }

  console.log(`내 핸드폰 번호 `, myPhone);

  res.send(`인증완료`);
});

app.post("/users", (req, res) => {
  const user = req.body.user;

  createUser(user);

  res.send("생성완료");
});

app.get("/stocks", async (req, res) => {
  const stocks = await Stock.find();
  res.send(stocks);
});

// 몽고DB 접속 (Docker Container name으로 접속)
mongoose
  .connect("mongodb://database:27017/dockerdb")
  .then(() => console.log("도커DB 연결"));

// Backend API 서버 오픈
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
