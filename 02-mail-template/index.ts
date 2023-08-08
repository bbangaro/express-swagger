function getWelcomeTemplate(myName: string) {
  const result = `
    <html>
        <body>
            <h1>${myName}야 공부해</h1>
        </body>
    </html>
    `;
  console.log(result);
}

const myName = "서나";
getWelcomeTemplate(myName);
