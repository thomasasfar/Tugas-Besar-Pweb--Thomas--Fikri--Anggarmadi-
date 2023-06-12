var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var formsRouter = require("./routes/forms");
var submissionsRouter = require("./routes/submission");
var authRouter = require("./routes/auth");

var app = express();

app.use(
  session({
    secret: "ACCESS_TOKEN_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/forms", formsRouter);
app.use("/submissions", submissionsRouter);
app.use("/auth", authRouter);

module.exports = app;
