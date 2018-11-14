const mysql = require('mysql');
const config = require('../config/config');
const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.databaseName
});

connection.connect((err) => {
  if(err) throw err;
    console.log('MySQL Connected.');
});

module.exports = connection;