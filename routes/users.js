var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var User = require('../models/users');
const { listUsers } = require('../controllers/usersController');

/* GET users listing. */
router.get('/', listUsers);

/* ADD user. */
router.post('/', async function(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let active = req.body.active;
  let avatar = req.body.avatar;
  
  await User.create({
    user_id: 'U003',
    username: username,
    email: email,
    password: password,
    active: active,
    avatar: avatar
  })
  
  .then(response =>{
    res.json({
      message: "Data Berhasil Ditambahkan"
    })
  })
  .catch((err)=>{
    console.log(err)
  })
});

/* UPDATE user. */
router.post('/:id/edit', async function(req, res, next) {
  let userid = req.params.id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let active = req.body.active;
  let avatar = req.body.avatar;

  await User.update({
    username: username,
    email: email,
    password: password,
    active: active,
    avatar: avatar
  },{
    where:{
      user_id: userid
    }
  })

  .then(response =>{
    res.json({
      message: "Data Berhasil Update"
    })
  })
  .catch((err)=>{
    console.log(err)
  })
});

/* DELETE user. */
router.post('/:id/delete', async function(req, res, next) {
  let userid = req.params.id;
  
  await User.destroy({
    where: {
      user_id: userid
    }
  })

  .then(response =>{
    res.json({
      message: "Data Berhasil Dihapus"
    })
  })
  .catch((err)=>{
    console.log(err)
  })
});

module.exports = router;
