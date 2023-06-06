var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var User = require("../models/users");
const {
  listUsers,
  addUsers,
  editUsers,
  deleteUsers,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", listUsers);

/* UPDATE user. */
router.post("/:id/edit", editUsers);

module.exports = router;
