import coolsms from "coolsms-node-sdk";

const padStart = function (targetLength, padString, str) {
  return str.length >= targetLength
    ? str
    : new Array(targetLength - str.length + 1).join(padString) + str;
};

export const getToken = (count) => {
  const result = padStart(
    count,
    "0",
    String(Math.floor(Math.random() * Math.pow(10, count)))
  );

  return result;
};

export const sendTokenToSMS = async (phone, certNum) => {
  const { SMS_KEY, SMS_SMS_SECRET, SMS_SENDER } = process.env;

  const mysms = coolsms.default;
  const messageService = new mysms(SMS_KEY, SMS_SMS_SECRET);
  const result = await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `서나 sms api 공부중! 인증번호 ${certNum}`,
  });

  console.log("result", result);
};
