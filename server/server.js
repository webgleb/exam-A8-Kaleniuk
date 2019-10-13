const express = require('express');
const bParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
//CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token , Authorization');
    next();
};

app.use(allowCrossDomain);
app.use(express.urlencoded({limit: '50mb'}));
app.use(bParser.urlencoded({limit: '50mb', extended: true}));
app.use(bParser.json({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, '../dist/Kaleniuk')));

const sessionParser = session({
  secret: 'asdsadsasadsadad',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
  }
});

app.use(sessionParser);

app.use(require('./routes'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/Kaleniuk', 'index.html'));
});

app.listen(80, function(){
  global.data_path = __dirname + "/data/"
  console.warn('Server - started from port 80');
});
