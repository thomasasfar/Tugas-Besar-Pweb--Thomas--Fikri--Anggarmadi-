var express = require("express");
var User = require("../models/users");
var Form = require("../models/forms");
var Submissions = require("../models/submissions");

const homePage = async function (req, res, next) {
  const user_id = req.session.user_id;
  const submissions = await Submissions.findAll({
    attributes: ["form_id", "uploaded_file", "description", "updated_at"],
    where: {
      user_id: user_id,
    },
  });
  const forms = await Form.findAll({
    attributes: ["form_id", "title", "description", "created_at", "updated_at"],
    where: {
      user_id: user_id,
    },
  });

  res.json({ submissions, forms });
};
module.exports = { homePage };
