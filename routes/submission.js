const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");

// var Subs = require('../models/submissions');
const Submissions = require("../models/submissions");
const {
  listSubmissions,
  addSubmissions,
  editSubmissions,
  deleteSubmissions,
  riwayatSubmissions,
} = require("../controllers/submissionController");

const { authenticateToken } = require("../middleware/verifyToken");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/files_upload/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET list submissions. */
router.get("/", authenticateToken, listSubmissions);

/* GET list submissions. */
router.get("/riwayat", authenticateToken, riwayatSubmissions);

/* ADD Submissions. */
router.post(
  "/",
  upload.single("uploaded_file"),
  authenticateToken,
  addSubmissions
);

/* UPDATE Submissions. */
router.post("/:formid/edit", authenticateToken, editSubmissions);

/* DELETE submission. */
router.post("/:formid/delete", authenticateToken, deleteSubmissions);

module.exports = router;
