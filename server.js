const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.PORT || 8000;
const connection = mysql.createConnection({
/* 
  INSERT CONNECTION DATA HERE:
  host: '',
  user: '',
  password: '',
  database: ''
*/  
});

// Database connection:

/*
connection.connect(err => {
  if(err) {
    throw err;
  } else {
    console.log('MySQL connected.');
  };
});
*/

app.get('/test', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server is running on port ${port}.`));