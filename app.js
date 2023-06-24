var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const dotenv = require("dotenv");
var session = require("express-session");
dotenv.config();
var indexRouter = require("./routes/index");
var bodyParser = require("body-parser");
var usersRouter = require("./routes/users");
var formsRouter = require("./routes/forms");
var submissionsRouter = require("./routes/submission");
var authRouter = require("./routes/auth");

var app = express();

app.use(
  session({
    secret: process.env.TOKEN_LOGIN,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/home", indexRouter);
app.use("/users", usersRouter);
app.use("/forms", formsRouter);
app.use("/submissions", submissionsRouter);
app.use("/auth", authRouter);

module.exports = app;
