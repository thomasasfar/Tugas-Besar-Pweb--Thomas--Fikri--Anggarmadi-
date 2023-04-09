var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var User = require('../models/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {

  // // Connect database
  // const connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: '',
  //   database: 'gpt-team'
  // });
  // // Buat Query-nya
  // let sql = 'SELECT username,email,active,avatar FROM users';
  // connection.query(sql, (err, rows, fields) =>{
  //   if(err) throw err;

  //   // Kirim Response ke user
  //   res.json(rows);
  // })
  // // Close connection
  // connection.end();

  const users = await User.findAll();
  res.json(users);
});

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
