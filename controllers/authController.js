var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/users");

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_LOGIN;

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_LOGIN, { expiresIn: '60s' });

}

const login = async function (req, res){
    // ...
  
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  
    // ...
};

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_LOGIN, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.users = users
  
      next()
    })
}

module.exports={ login, authenticateToken}