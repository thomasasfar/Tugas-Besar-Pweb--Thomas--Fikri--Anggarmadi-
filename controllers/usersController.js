var express = require('express');
var User = require('../models/users');

const listUsers = async function(req, res, next) {

    const users = await User.findAll();
    res.json(users);
}

const addUsers = async function(req, res, next) {
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
}

const editUsers = async function(req, res, next) {
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
}

const deleteUsers = async function(req, res, next) {
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
}

module.exports={listUsers, addUsers, editUsers, deleteUsers}