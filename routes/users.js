var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var User = require("../models/users");
const {
  listUsers,
  editUsers,
  editPassword,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", listUsers);

/* UPDATE user. */
router.post("/edit", editUsers);

/* UPDATE user. */
router.post("/editPassword", editPassword);

module.exports = router;
