const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var Subs = require('../models/submissions');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const submissions = await Subs.findAll();
  res.json(submissions);
});

module.exports = router;
