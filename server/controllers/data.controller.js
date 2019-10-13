'use strict';
const express = require('express');
const router = express.Router();
const bParser = require('body-parser');
const fs = require("fs");

router.post('/set/data', function (req, res) {
  if( (req.session.user) && (req.session.user !== null) ){
      let rawdata = fs.readFileSync(global.data_path + 'data.json');
      let data = JSON.parse(rawdata);
      data.table.push({
        name: req.body.name,
        text: req.body.text,
        id: data.table.length+1
      });
      let updatedData = JSON.stringify(data);
      fs.writeFileSync(global.data_path + 'data.json', updatedData);
      res.send(
        {
          code: 200,
          msg: "Successfull added!",
          table: data.table
        }
      )
  }else{
    res.send(
      {
        code: 300,
        msg: "Permission denided!"
      }
    )
  }
});

router.get('/get/data', function (req, res) {
  console.log(req.session.user)
  let rawdata = fs.readFileSync(global.data_path + 'data.json');
  let data = JSON.parse(rawdata);
  res.send(
    {
      data: {
        table: data.table,
        session: (req.session.user && req.session.user !== null)
      }
    }
  )
});

router.delete('/remove/data*', function (req, res) {
  if( (req.session.user) && (req.session.user !== null) ){
    let rawdata = fs.readFileSync(global.data_path + 'data.json');
    let data = JSON.parse(rawdata);
    let index = data.table.findIndex(x => x.id === 5);
    data.table.splice(index, 1);
    let updatedData = JSON.stringify(data);
    fs.writeFileSync(global.data_path + 'data.json', updatedData);
    res.send(
      {
        data: {
          table: data.table,
          msg: "Successfull removed!"
        }
      }
    )
  }else{
    res.send(
      {
        code: 300,
        msg: "Permission denided!"
      }
    )
  }
});

module.exports = router;
