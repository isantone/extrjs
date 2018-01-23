'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/api', require('./routes/api'));

// unknown endpoint
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000');
});
