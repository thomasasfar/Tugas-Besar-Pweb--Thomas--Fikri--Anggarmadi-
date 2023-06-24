const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const users = require("../models/users");
dotenv.config();

function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.jwt;

  if (token == null) return res.status(401).send(`Akses ditolak`);

  jwt.verify(token, process.env.TOKEN_LOGIN, (err, decodedToken) => {
    console.log(err);
    if (err) return res.status(403).send(`Token tidak valid`);
    next();
  });
}

module.exports = { authenticateToken };
