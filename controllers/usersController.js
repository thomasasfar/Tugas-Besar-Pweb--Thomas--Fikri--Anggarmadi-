var express = require("express");
var User = require("../models/users");

//list Users
const listUsers = async function (req, res, next) {
  const users = await User.findAll({
    attributes: ["username", "email", "active", "avatar"],
  });
  res.json(users);
};

// edit user
const editUsers = async function (req, res, next) {
  let userid = req.params.id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let active = req.body.active;
  let avatar = req.body.avatar;

  await User.update(
    {
      username: username,
      email: email,
      password: password,
      active: active,
      avatar: avatar,
    },
    {
      where: {
        user_id: userid,
      },
    }
  )

    .then((response) => {
      res.json({
        message: "Data Berhasil Update",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { listUsers, editUsers };
