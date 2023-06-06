var express = require("express");
var Form = require("../models/forms");

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
  const forms = await Form.findAll();
  res.json(forms);
};

const addForms = async function (req, res, next) {
  let user_id = req.body.user_id;
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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editForms = async function (req, res, next) {
  // let user_id = req.params.id;
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
        // user_id: user_id
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

module.exports = { listForms, addForms, editForms, deletForms };
