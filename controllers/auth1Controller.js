const users = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const login = async function (username, password) {
  const user = await users.findOne({ where: { username: username } });
  if (user) {
    const auth = await users.findOne({ where: { password: password } });
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate username error
  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
dotenv.config();
let secret = process.env.TOKEN_LOGIN;
const createToken = (id, type) => {
  return jwt.sign({ id, type }, secret, {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.json("signup");
};

const login_get = (req, res) => {
  res.json("login");
};

const signup_post = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const usernameExist = await users.findOne({ where: { username: req.body.username } });
  if (usernameExist) return res.status(400).send("username sudah dipakai");

  try {
    await users.create({
        user_id: 'U005',
        username: username,
        email: email,
        password: password,
        active: 1
      })
    res.redirect("/auth/login");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);
    if (!user) return res.status(400).send("username tidak ditemukan");

    // Cek Password
    const validPass = await users.findOne({ where: { password: req.body.password } });
    // const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Password Salah");

    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    const token = createToken(user.id, user.type);
    const type = user.type;

    await users.update(
      {
        remember_token: token,
        username_verified_at: dateTime,
      },
      {
        where: { username: req.body.username },
      }
    );

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }).cookie("type", type, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user: user.user_id });
    // res.redirect('/')
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("type", "", { maxAge: 1 });
  // res.clearCookie('jwt');
  res.redirect("/auth/login");
};

module.exports = { signup_get, signup_post, login_get, login_post, logout_get };