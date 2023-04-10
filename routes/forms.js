const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var Form = require('../models/forms');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const forms = await Form.findAll();
  res.json(forms);
});

module.exports = router;
