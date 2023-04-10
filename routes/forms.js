const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var Form = require('../models/forms');
const { listForms, addForms, editForms, deletForms } = require('../controllers/formsController');
const { authenticateToken, checkUser } = require('../middleware/verifyToken');

/* GET list forms. */
router.get('/', authenticateToken, listForms);

/* ADD forms. */
router.post('/', authenticateToken, addForms);

/* UPDATE Form. */
router.post('/:formid/edit', authenticateToken, editForms);

/* DELETE Form. */
router.post('/:formid/delete', authenticateToken, deletForms);

module.exports = router;
