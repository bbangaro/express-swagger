import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Stock } from "./models/stock.model.js";

// 몽고DB 접속 (Docker Container name으로 접속 -> 로컬에서 접속할 땐 포트포워딩)
mongoose
  .connect("mongodb://localhost:27017/dockerdb")
  .then(() => console.log("도커DB 연결"));

const startCrawling = async () => {
  // 크로미움 브라우저 시작
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930");
  await page.waitForTimeout(1000);
  const framePage = await page
    .frames()
    .find((el) => el.url().includes("/item/sise_day.naver?code=005930"));

  const result = [];
  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );

    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );

    result.push({ 날짜: date, 종가: price });

    const stock = new Stock({
      name: "삼성전자",
      date: date,
      price: Number(price.replace(",", "")),
    });
    await stock.save();
  }

  console.log(result);

  await browser.close();
};

startCrawling();
