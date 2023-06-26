const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
const path = require("path");

// var Subs = require('../models/submissions');
const Submissions = require("../models/submissions");
const {
  listSubmissions,
  addSubmissions,
  editSubmissions,
  deleteSubmissions,
  riwayatSubmissions,
  downloadFile,
  paginationSubs,
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

const fileFilter = function (req, file, cb) {
  const allowedExtensions = [".pdf"];
  const fileExtension = path.extname(file.originalname);

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file PDF yang diperbolehkan!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

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

router.get("/riwayatPage", authenticateToken, paginationSubs);

module.exports = router;
