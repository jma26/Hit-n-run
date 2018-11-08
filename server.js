const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const sql = require('./db.js');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Test Route
app.get('/test', (req, res) => {
  res.send('Hello World');
});

// Server
app.listen(port, () => console.log(`Server is running on port ${port}.`));