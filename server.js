const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const sql = require('./db/db');
const auth = require('./routes/auth');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Test Route
app.get('/test', (req, res) => {
  return res.status(200).send('Hello World');
});

// Routes
app.use('/api/auth', auth);

// Server
app.listen(port, () => console.log(`Server is running on port ${port}.`));