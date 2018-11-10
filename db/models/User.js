const sql = require('../db');

module.exports = {
  findUser(data) {
    sql.query({
      sql: 'SELECT * FROM `user` WHERE `id` = ?',
    }, 
    [data.id],
    (err, result) => {
      if(result[0]) {
        const user = {
          id: result[0].id 
        };
        return user;
      } else {
        return false;
      }
    });
  }
};