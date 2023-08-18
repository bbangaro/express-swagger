import nodemailer from "nodemailer";

function getWelcomeTemplate(userName) {
  const result = `
    <html>
        <body>
            <h1>${userName}야 공부해</h1>
        </body>
    </html>
    `;
  return result;
}

const mailOption = (sender, email, title, contents) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: title,
    html: contents,
  };

  return mailOptions;
};

const sendTemplateToEmail = async (email, myTemplate) => {
  const { NODEMAILER_ID, NODEMAILER_PW } = process.env;

  const title = "서나야 공부해";
  const option = mailOption(NODEMAILER_ID, email, title, myTemplate);

  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: NODEMAILER_ID,
      pass: NODEMAILER_PW,
    },
    authMethod: "PLAIN",
  });

  const result = await transporter.sendMail(option);
  console.log(result);
  // console.log(email, " 해당 이메일로 ", myTemplate, " 를 전송합니다.");
};

export const createUser = (user) => {
  const isValid = true;

  if (isValid) {
    const myTemplate = getWelcomeTemplate(user.userName);
    sendTemplateToEmail(user.email, myTemplate);
  }
};

// const user = { userName: "서나", email: "bbangaro@naver.com" };
