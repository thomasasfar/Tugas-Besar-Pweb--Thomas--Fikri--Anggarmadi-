const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
// var Subs = require('../models/submissions');
const Submissions = require('../models/submissions');
const { listSubmissions, addSubmissions, editSubmissions, deleteSubmissions } = require('../controllers/submissionController');
const { authenticateToken } = require('../middleware/verifyToken');

/* GET list submissions. */
router.get('/', authenticateToken, listSubmissions);

/* ADD Submissions. */
router.post('/', authenticateToken, addSubmissions);

/* UPDATE Submissions. */
router.post('/:formid/edit', authenticateToken, editSubmissions);

/* DELETE submission. */
router.post('/:formid/delete', authenticateToken, deleteSubmissions);

module.exports = router;
