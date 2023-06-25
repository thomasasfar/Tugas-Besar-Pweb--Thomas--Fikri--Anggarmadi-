var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var User = require("../models/users");
var path = require("path");
const {
  listUsers,
  editUsers,
  editPassword,
} = require("../controllers/usersController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/avatar/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    // cb(null, Date.now() + file.originalname);
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

/* GET users listing. */
router.get("/", listUsers);

/* UPDATE user. */
router.post("/edit", upload.single("avatar"), editUsers);

/* UPDATE user. */
router.post("/editPassword", editPassword);

module.exports = router;
