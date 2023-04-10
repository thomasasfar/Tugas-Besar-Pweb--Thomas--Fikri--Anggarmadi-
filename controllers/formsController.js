var express = require('express');
var Form = require('../models/forms');

const listForms = async function(req, res, next) {
    const forms = await Form.findAll();
    res.json(forms);
}

const addForms = async function(req, res, next) {
    let user_id = req.body.user_id;
    let form_id = req.body.form_id;
    let title = req.body.title;
    let description = req.body.description;
    
    await Form.create({
      user_id: user_id,
      form_id: form_id,
      title: title,
      description: description,
    })
    
    .then(response =>{
      res.json({
        message: "Data Berhasil Ditambahkan"
      })
    })
    .catch((err)=>{
      console.log(err)
    })
}

const editForms = async function(req, res, next) {
    // let user_id = req.params.id;
    let form_id = req.params.formid;
    let title = req.body.title;;
    let description = req.body.description;;
  
    await Form.update({
      title: title,
      description: description,
    },{
      where:{
        form_id: form_id
        // user_id: user_id
      }
    })
  
    .then(response =>{
      res.json({
        message: "Data Berhasil Update"
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  
}

const deletForms = async function(req, res, next) {
    let form_id = req.params.formid;
    
    await Form.destroy({
      where: {
        form_id: form_id
      }
    })
  
    .then(response =>{
      res.json({
        message: "Data Berhasil Dihapus"
      })
    })
    .catch((err)=>{
      console.log(err)
    })
}

module.exports={ listForms, addForms, editForms, deletForms}