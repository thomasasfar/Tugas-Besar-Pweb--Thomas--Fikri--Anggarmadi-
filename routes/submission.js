const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
// var Subs = require('../models/submissions');
const Submissions = require('../models/submissions');
const { listSubmissions, addSubmissions, editSubmissions, deleteSubmissions } = require('../controllers/submissionController');

/* GET list submissions. */
router.get('/', listSubmissions);

/* ADD Submissions. */
router.post('/', addSubmissions);

/* UPDATE Submissions. */
router.post('/:formid/edit', editSubmissions);

/* DELETE submission. */
router.post('/:formid/delete', deleteSubmissions);

module.exports = router;
