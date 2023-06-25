const users = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const login = async function (username, password) {
  const user = await users.findOne({ where: { username: username } });
  if (user) {
    return user;
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
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
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
  const { username, email, name, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const usernameExist = await users.findOne({
    where: { username: req.body.username },
  });
  if (usernameExist) return res.status(400).send("username sudah dipakai");

  try {
    await users.create({
      username: username,
      name: name,
      email: email,
      password: hashPassword,
      active: 1,
    });
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
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Password Salah");

    const token = createToken(user.id);

    req.session.user_id = user.user_id;
    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).json({
      user: req.session.user_id,
      token: token,
      pesan: "login sukses",
      expiresIn: "3 hari",
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.clearCookie("jwt");
  // res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/auth/login");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
