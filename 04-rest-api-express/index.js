import express from "express";

const app = express();
const port = 3000;

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/swaggerOptions.js";
const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.get("/boards", (req, res) => {
  const result = [
    { id: 1, user: "휴", title: "휴 제목", contents: "휴 내용" },
    { id: 2, user: "용", title: "용 제목", contents: "용 내용" },
    { id: 3, user: "서나", title: "서나 제목", contents: "서나 내용" },
  ];

  res.send(result);
});

app.post("/boards", (req, res) => {
  console.log(req.body);

  res.send("게시물 등록 성공!!");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body;

  console.log(`내 핸드폰 번호 `, myPhone);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
