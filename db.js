const mysql = require('mysql');
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
  if(err) throw err;
    console.log('MySQL connected.');
});
*/

module.exports = connection;