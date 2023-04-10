const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var Form = require('../models/forms');
const { listForms, addForms, editForms, deletForms } = require('../controllers/formsController');

/* GET list forms. */
router.get('/', listForms);

/* ADD forms. */
router.post('/', addForms);

/* UPDATE Form. */
router.post('/:formid/edit', editForms);

/* DELETE Form. */
router.post('/:formid/delete', deletForms);

module.exports = router;
