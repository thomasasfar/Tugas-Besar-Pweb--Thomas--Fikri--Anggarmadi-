const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var User = require('../models/users');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/api/createNewUser', async function(req, res) {
  // ...

  const token = generateAccessToken({ username: req.body.username });
  res.json(token);

  // ...
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_LOGIN, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}