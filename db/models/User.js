const sql = require('../db');

module.exports = {
  findUser(id) {
    sql.query({
      sql: 'SELECT * FROM `user` WHERE `id` = ?',
    }, 
    [id],
    (err, result) => {
      if(result[0]) {
        const user = {
          id: result[0].id,
          firstName: result[0].first_name,
          lastName: result[0].last_name,
          email: result[0].email
        };
        return user;
      } else {
        return false;
      }
    });
  }
};