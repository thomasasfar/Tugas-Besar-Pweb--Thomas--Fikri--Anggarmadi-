const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var Form = require("../models/forms");
const {
  listForms,
  addForms,
  editForms,
  deletForms,
  listFormsMe,
  listFormsAll,
} = require("../controllers/formsController");
const { authenticateToken } = require("../middleware/verifyToken");

/* GET list forms. */
router.get("/", authenticateToken, listForms);

/* GET my list forms. */
router.get("/formMe", authenticateToken, listFormsMe);

/* GET other list forms. */
router.get("/formAll", authenticateToken, listFormsAll);

/* ADD forms. */
router.post("/", authenticateToken, addForms);

/* UPDATE Form. */
router.post("/:formid/edit", authenticateToken, editForms);

/* DELETE Form. */
router.post("/:formid/delete", authenticateToken, deletForms);

module.exports = router;
