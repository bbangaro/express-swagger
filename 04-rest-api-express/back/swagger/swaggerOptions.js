export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "서나얌! API얌!",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
