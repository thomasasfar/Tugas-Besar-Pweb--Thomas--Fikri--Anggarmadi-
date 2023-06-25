var express = require("express");
var Submissions = require("../models/submissions");
// const { Op } = require("sequelize");

const listSubmissions = async function (req, res, next) {
  // const submissions = await Submissions.findAll();
  const { QueryTypes } = require("sequelize");
  const Sequelize = require("sequelize");
  const sequilize = new Sequelize("mysql://root@localhost:3306/gpt-team");
  const submissions = await sequilize.query(
    "SELECT forms.title, forms.description as 'Instruksi', submissions.form_id, submissions.uploaded_file, submissions.description, submissions.updated_at, users.name AS 'form dibuat oleh' FROM submissions, forms, users  WHERE submissions.form_id = forms.form_id AND forms.user_id = users.user_id",
    {
      type: QueryTypes.SELECT,
    }
  );

  res.json(submissions);
};

const riwayatSubmissions = async function (req, res, next) {
  const user_id = req.session.user_id;
  const submissions = await Submissions.findAll({
    attributes: ["form_id", "uploaded_file", "description", "updated_at"],
    where: {
      user_id: user_id,
    },
  });
  res.json(submissions);
};

const addSubmissions = async function (req, res, next) {
  // console.log(req.file);
  let user_id = req.session.user_id;
  let form_id = req.body.form_id;
  let uploaded_file = req.file.path;
  let description = req.body.description;
  await Submissions.create({
    user_id: user_id,
    form_id: form_id,
    uploaded_file: uploaded_file,
    description: description,
  })
    .then((response) => {
      res.json({
        message: "Data Berhasil Ditambahkan",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editSubmissions = async function (req, res, next) {
  let user_id = req.session.user_id;
  let form_id = req.params.formid;
  let uploaded_file = req.body.uploaded_file;
  let description = req.body.description;

  await Submissions.update(
    {
      uploaded_file: uploaded_file,
      description: description,
    },
    {
      where: {
        form_id: form_id,
        user_id: user_id,
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

const deleteSubmissions = async function (req, res, next) {
  let form_id = req.params.formid;

  await Submissions.destroy({
    where: {
      form_id: form_id,
    },
  })

    .then((response) => {
      res.json({
        message: "Data Berhasil Dihapus",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  listSubmissions,
  riwayatSubmissions,
  addSubmissions,
  editSubmissions,
  deleteSubmissions,
};
