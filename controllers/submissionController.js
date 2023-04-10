var express = require('express');
var Submissions = require('../models/submissions');

const listSubmissions = async function(req, res, next) {
    const submissions = await Submissions.findAll();
    res.json(submissions);
}

const addSubmissions = async function(req, res, next) {
    let user_id = req.body.user_id;
    let form_id = req.body.form_id;
    let uploaded_file = req.body.uploaded_file;
    let description = req.body.description;
    
    await Submissions.create({
      user_id: user_id,
      form_id: form_id,
      uploaded_file: uploaded_file,
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

const editSubmissions = async function(req, res, next) {
    // let user_id = req.params.id;
    let form_id = req.params.formid;
    let uploaded_file = req.body.uploaded_file;;
    let description = req.body.description;;
  
    await Submissions.update({
      uploaded_file: uploaded_file,
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

const deleteSubmissions = async function(req, res, next) {
    let form_id = req.params.formid;
    
    await Submissions.destroy({
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

module.exports={ listSubmissions, addSubmissions, editSubmissions, deleteSubmissions}