var express = require("express");
const { homePage } = require("../controllers/homeController");
var router = express.Router();

/* GET home page. */
router.get("/", /*authenticateToken,*/ homePage);

module.exports = router;
