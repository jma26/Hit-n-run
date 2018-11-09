const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hit-n-run'
});

connection.connect((err) => {
  if(err) throw err;
    console.log('MySQL Connected.');
});

module.exports = connection;