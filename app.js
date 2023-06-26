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
const { authenticateToken } = require("./middleware/verifyToken");

var app = express();

app.use(
  session({
    secret: "some-scret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
// app.use(cors());
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

app.get("/download/:fileName", authenticateToken, function (req, res) {
  const fileName = req.params.fileName;
  const filePath = __dirname + "/assets/files_upload/" + fileName;
  // const filePath = __dirname + "/assets/avatar/" + fileName;

  console.log(filePath);

  res.download(filePath, function (err) {
    if (err) {
      // Tangani kesalahan jika terjadi
      console.log(err);
      res.status(404).send("File tidak ditemukan");
    }
  });
});

app.get("/users/avatar", authenticateToken, function (req, res) {
  const user_id = req.session.user_id;

  const fileName = req.params.fileName;
  const filePath = __dirname + "/assets/files_upload/" + fileName;
  // const filePath = __dirname + "/assets/avatar/" + fileName;

  console.log(filePath);

  res.download(filePath, function (err) {
    if (err) {
      // Tangani kesalahan jika terjadi
      console.log(err);
      res.status(404).send("File tidak ditemukan");
    }
  });
});

module.exports = app;
