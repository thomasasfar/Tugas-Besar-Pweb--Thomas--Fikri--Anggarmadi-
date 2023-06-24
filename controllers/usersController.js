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
  let userid = req.session.id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  let active = req.body.active;
  let avatar = req.body.avatar;

  await User.update(
    {
      username: username,
      email: email,
      password: hashPassword,
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

module.exports = { listUsers, editUsers, editPassword };
