'use strict';
const express = require('express');
const router = express.Router();
const bParser = require('body-parser');
const fs = require("fs");

router.post('/set/auth', function (req, res) {
  if( (req.body.login === "admin") && (req.body.password === "admin") ){
    req.session.user = req.body.login;
    res.send(
      {
        code: 200,
        msg: "Login successfull!"
      }
    )
  }else{
    res.send(
      {
        code: 300,
        msg: "Login error!"
      }
    )
  }
});

router.get('/get/session', function (req, res) {
  res.send({
    session: (req.session.user && req.session.user !== null)
  });
});

module.exports = router;
