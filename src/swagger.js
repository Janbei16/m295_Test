// gebrauch von Github: https://github.com/scottie1984/swagger-ui-express

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Task API by Jannis_Beichler",
    description:
      "API for a task manager, with login and logout and secure routes for the test 295_backend",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./doc/swagger-output.json";
const endpointsFiles = ["./src/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
