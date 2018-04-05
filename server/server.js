const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/fake');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/routes'));

app.use(function(req, res, next) {
  res.status(404);
  res.send({ error: 'Not found' });
  return;
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({ error: err.message });
  return;
});

app.listen(process.env.port || 3713, function() {
  console.log('Server run on 3713 port.');
});