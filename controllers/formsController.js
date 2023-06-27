var express = require("express");
var Form = require("../models/forms");
const { Op } = require("sequelize");
const User = require("../models/users");

function buatPin(length) {
  const charList =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if (!length) {
    length = 10;
  }
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charList.charAt(Math.floor(Math.random() * charList.length));
  }
  return result;
}

const listForms = async function (req, res, next) {
  // const forms = await Form.findAll({
  //   attributes: ["form_id", "title", "description", "created_at", "updated_at"],
  // });
  // res.json(forms);

  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = limit * page;
  const totalRows = await Form.count({
    where: {
      user_id: "1",
    },
    // where: {
    //   [Op.or]: [
    //     {
    //       title: {
    //         [Op.like]: "%" + search + "%",
    //       },
    //     },
    //     {
    //       description: {
    //         [Op.like]: "%" + search + "%",
    //       },
    //     },
    //   ],
    // },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Form.findAll({
    where: {
      user_id: "1",
    },
    // where: {
    //   [Op.or]: [
    //     {
    //       title: {
    //         [Op.like]: "%" + search + "%",
    //       },
    //     },
    //     {
    //       description: {
    //         [Op.like]: "%" + search + "%",
    //       },
    //     },
    //   ],
    // },
    offset: offset,
    limit: limit,
    order: [["updated_at", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

const listFormsMe = async function (req, res, next) {
  const user_id = req.session.user_id;
  // const forms = await Form.findAll({
  //   attributes: ["form_id", "title", "description", "created_at", "updated_at"],
  //   where: {
  //     user_id: user_id,
  //   },
  // });
  // res.json(forms);
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = limit * page;
  const totalRows = await Form.count({
    where: {
      user_id: user_id,
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Form.findAll({
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

const listFormsAll = async function (req, res, next) {
  const user_id = req.session.user_id;
  const forms = await Form.findAll({
    attributes: ["form_id", "title", "description", "created_at", "updated_at"],
    where: {
      [Op.not]: [
        {
          user_id: user_id,
        },
      ],
    },
  });
  res.json(forms);
};

const addForms = async function (req, res, next) {
  let user_id = req.session.user_id;
  let form_id = buatPin(8);
  let title = req.body.title;
  let description = req.body.description;

  await Form.create({
    user_id: user_id,
    form_id: form_id,
    title: title,
    description: description,
  })

    .then((response) => {
      res.json({
        message: "Data Berhasil Ditambahkan, pin Anda " + form_id,
        pin: form_id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editForms = async function (req, res, next) {
  let user_id = req.session.user_id;
  let form_id = req.params.formid;
  let title = req.body.title;
  let description = req.body.description;

  await Form.update(
    {
      title: title,
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

const deletForms = async function (req, res, next) {
  let form_id = req.params.formid;

  await Form.destroy({
    where: {
      form_id: form_id,
    },
  })

    .then((response) => {
      res.json({
        message: "Form Berhasil Dihapus",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const formSubmit = async function (req, res, next) {
  let form_id = req.body.form_id;

  const forms = await Form.findAll({
    attributes: ["form_id", "title", "description", "created_at", "updated_at"],
    where: {
      form_id: form_id,
    },
  });
  res.json(forms);
};

const attendance = async function (req, res, next) {
  const user_id = req.session.user_id;
  const { QueryTypes } = require("sequelize");
  const Sequelize = require("sequelize");
  const dotenv = require("dotenv");
  dotenv.config();
  const sequelize = new Sequelize(
    "gpt_team",
    "root",
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",
    }
  );
  const form = await sequelize.query(
    "SELECT u.name, s.uploaded_file, s.updated_at, f.title FROM users u JOIN forms f ON u.user_id = f.user_id JOIN submissions s ON f.form_id = s.form_id WHERE f.user_id = " +
      user_id,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.json(form);
};

module.exports = {
  listForms,
  listFormsMe,
  listFormsAll,
  addForms,
  editForms,
  deletForms,
  formSubmit,
  attendance,
};
