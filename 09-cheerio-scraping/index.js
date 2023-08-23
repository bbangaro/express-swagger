import axios from "axios";
import * as cheerio from "cheerio";

const createBoardAPI = async (data) => {
  // http로 시작하는 글자 찾기
  const myUrl = data.contents
    .split(" ")
    .filter((data) => data.includes("http"))[0];

  // 있으면 html코드 받아오기 (스크래핑)
  const result = await axios.get(myUrl);
  console.log(result);

  // OG 코드 골라내서 변수에 저장하기
  const $ = cheerio.load(result.data);
  $("meta").each((_, el) => {
    if ($(el).attr("property")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      console.log(key, ": ", value);
    }
  });
};

const data = {
  title: "안녕",
  contents: "여기 좋다~ 여기는 https://daum.net 이얌~~~",
};
createBoardAPI(data);
