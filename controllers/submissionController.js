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
  let uploaded_file = req.file.filename;
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

const paginationSubs = async function (req, res, next) {
  const user_id = req.session.user_id;
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;
  const totalRows = await Submissions.count({
    where: {
      user_id: user_id,
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Submissions.findAll({
    where: {
      user_id: user_id,
    },

    offset: offset,
    limit: limit,
    order: [["updated_at", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

module.exports = {
  listSubmissions,
  riwayatSubmissions,
  addSubmissions,
  editSubmissions,
  deleteSubmissions,
  paginationSubs,
};
