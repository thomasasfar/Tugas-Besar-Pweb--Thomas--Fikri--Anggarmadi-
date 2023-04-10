var express = require('express');
var User = require('../models/users');

const listUsers = async function(req, res, next) {

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
  }

  module.exports={listUsers}