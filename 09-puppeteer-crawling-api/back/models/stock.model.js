import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

// 스키마 == 구조
const StockSchema = new Schema({
  name: String,
  date: Date,
  price: Number,
});

// 컬랙션 (구조를 이용해서..)
export const Stock = model("Stock", StockSchema);
