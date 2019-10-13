'use strict';
const express = require('express');
const router = express.Router();

//Get dlobal data site
const data = require('./controllers/data.controller');
router.get('/get/data', data);
router.post('/set/data', data);
router.delete('/remove/data*', data);

const session = require('./controllers/session.controller');
router.post('/set/auth', session);
router.get('/set/logout', session);
router.get('/get/session', session);

router.get('/get/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
