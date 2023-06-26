var express = require("express");
var User = require("../models/users");
const bcrypt = require("bcrypt");

//list Users
const listUsers = async function (req, res, next) {
  const users = await User.findAll({
    attributes: ["username", "email", "active", "avatar"],
  });
  res.json(users);
};

// edit user
const editUsers = async function (req, res, next) {
  const users = await User.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  let userid = req.session.user_id;
  let username = req.body.username;
  let name = req.body.name;
  let email = req.body.email;
  let active = "1";
  console.log(req.file);
  if (username == "") {
    username = users.username;
  }
  if (name == "") {
    name = users.name;
  }
  if (email == "") {
    email = users.email;
  }
  if (req.file == undefined) {
    avatar = users.avatar;
  } else {
    avatar = req.file.path;
  }

  console.log("Avatar :", avatar);

  await User.update(
    {
      username: username,
      email: email,
      name: name,
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

const editPassword = async function (req, res, next) {
  let userid = req.session.user_id;
  let newPassword = req.body.newPassword;
  let confPassword = req.body.confPassword;
  if (newPassword !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(newPassword, salt);

  await User.update(
    {
      password: hashPassword,
    },
    {
      where: {
        user_id: userid,
      },
    }
  )

    .then((response) => {
      res.json({
        message: "Password Berhasil Diganti",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//list Users
const profileMe = async function (req, res, next) {
  const user_id = req.session.user_id;
  const users = await User.findAll({
    attributes: ["username", "name", "email", "active", "avatar"],

    where: {
      user_id: user_id,
    },
  });
  res.json(users);
};

module.exports = { listUsers, editUsers, editPassword, profileMe };
