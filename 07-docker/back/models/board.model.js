import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

// 스키마 == 구조
const BoardSchema = new Schema({
  user: String,
  title: String,
  contents: String,
});

// 컬랙션 (구조를 이용해서..)
export const Board = model("Board", BoardSchema);
