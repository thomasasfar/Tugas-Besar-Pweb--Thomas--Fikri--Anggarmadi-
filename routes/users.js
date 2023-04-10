var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var User = require('../models/users');
const { listUsers, addUsers, editUsers, deleteUsers } = require('../controllers/usersController');

/* GET users listing. */
router.get('/', listUsers);

/* ADD user. */
router.post('/', addUsers);

/* UPDATE user. */
router.post('/:id/edit', editUsers);

/* DELETE user. */
router.post('/:id/delete', deleteUsers);

module.exports = router;
