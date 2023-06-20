const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../doc/swagger-output.json");
const session = require("express-session");
const taskcontroller = require("./taskController");
const authcontroller = require("./authController");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//von stackoverflow kopiert und angepassst
app.use(
  session({
    secret: "secretM295",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

//Gebrauch von Github: https://github.com/scottie1984/swagger-ui-express

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
  cors({
    origin: "https://editor.swagger.io",
  })
);

app.get("/tasks", (req, res) => {
  taskcontroller.getTasks(req, res);
});

app.post("/tasks", (req, res) => {
  taskcontroller.postTasks(req, res);
});

app.get("/tasks/:taskId", (req, res) => {
  taskcontroller.getTask(req, res);
});

app.put("/tasks/:taskId", (req, res) => {
  taskcontroller.updateTask(req, res);
});

app.delete("/tasks/:taskId", (req, res) => {
  taskcontroller.deleteTask(req, res);
});

app.post("/login", (req, res) => {
  authcontroller.login(req, res);
});

app.get("/verify", (req, res) => {
  authcontroller.verify(req, res);
});

app.delete("/logout", (req, res) => {
  authcontroller.logout(req, res);
});

app.listen(port, () => {
  console.log(`Port testen ${port}`);
});
