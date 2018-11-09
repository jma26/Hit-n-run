const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateInput = require('../utils/validateInput');
const sql = require('../db/db');

// @ACCESS - Public
// @ENDPOINT - /api/auth/register
// @DESCRIPTION - Checks for an existing user. If there is no existing user, register the new user
// @TODO - Hook it up to the SQL database; Check for existing user
router.post('/register', (req, res) => {
  const isValid = validateInput.validateRegistration(req.body);
  if(isValid === true) {
    // Check for an existing user
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
          throw err;
        } else {
          newUser.password = hash;
          const sqlQuery = "INSERT INTO `user` (`first_name`, `last_name`,`email`, `password`) VALUES ('"+newUser.firstName+"','"+newUser.lastName+"','"+newUser.email+"','"+newUser.password+"')"
          sql.query(sqlQuery, (err, result) => {
            if(err) throw err;
            console.log('1 record inserted.');
          });
        }
      })
    });
  } else {
    return res.status(500).json(isValid);
  }
});

// @ACCESS - Public
// @ENDPOINT - /api/auth/login
// @DESCRIPTION - Check for an existing user. If an user exists, check if the information provided matches the information within the database
// @TODO - Hook it up to the SQL database
router.post('/login', (req, res) => {
  const isValid = validateInput.validateLogin(req.body);
  if(isValid === true) {
    // Check for an existing user within the database
    const user = {
      email: req.body.email
    };
    return res.status(200).json({user: user, loggedIn: true});
  } else {
    return res.status(500).json(isValid);
  }
});

module.exports = router;