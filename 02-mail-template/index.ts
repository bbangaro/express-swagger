function getWelcomeTemplate(userName: string): string {
  const result = `
    <html>
        <body>
            <h1>${userName}야 공부해</h1>
        </body>
    </html>
    `;
  return result;
}

const sendTemplateToEmail = (email: string, myTemplate: string) => {
  console.log("메일 전송");
};

const createUser = (user: { userName: string; email: string }) => {
  const isValid = true;

  if (isValid) {
    const myTemplate: string = getWelcomeTemplate(user.userName);
    sendTemplateToEmail(user.email, myTemplate);
  }
};

const user = { userName: "서나", email: "bbangaro@naver.com" };
createUser(user);
