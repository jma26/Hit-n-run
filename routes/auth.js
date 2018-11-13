const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateInput = require('../utils/validateInput');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const sql = require('../db/db');
const keys = require('../utils/keys');

// @ACCESS - Public
// @ENDPOINT - /api/auth/register
// @DESCRIPTION - Checks for an existing user. If there is no existing user, register the new user
router.post('/register', (req, res) => {
  let errors = {};
  const isValid = validateInput.validateRegistration(req.body);
  if(isValid === true) {
    // Check for existing user
    sql.query({
      sql: 'SELECT * FROM `user` WHERE `email` = ?',
    }, 
    [req.body.email],
    (err, result) => {
      if(result[0]) {
        errors.userExists = 'User already exists.';
        return res.status(400).json(errors);
      } else {
        // Hash the password and insert the user
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
              return res.status(200).send(`${newUser.firstName + ' ' + newUser.lastName} is now registered!`);
            }
          })
        });
      }
    });
  } else {
    return res.status(400).json(isValid);
  }
});

// @ACCESS - Public
// @ENDPOINT - /api/auth/login
// @DESCRIPTION - Check for an existing user. If an user exists, check if the information provided matches the information within the database
router.post('/login', (req, res) => {
  let errors = {};
  const isValid = validateInput.validateLogin(req.body);
  if(isValid === true) {
    // Check for existing user
    sql.query({
      sql: 'SELECT * FROM `user` WHERE `email` = ?',
    }, 
    [req.body.email],
    (err, result) => {
      if(result[0]) {
        // Decrypt the password and check if they match
        const user = result[0];
        bcrypt.compare(req.body.password, user.password)
          .then(match => {
            if(match) {
              const payload = {
                id: user.id
              };
              jwt.sign(payload, keys.secretOrKey, {expiresIn: 86400}, (err, token) => {
                res.json({ success: true, token: 'Bearer ' + token });
              });
            } else {
              errors.incorrectPassword = 'Incorrect password.';
              return res.status(400).json(errors);
            }
          });
      } else {
        errors.userDoesNotExist = 'User does not exist.';
        return res.status(400).json(errors);
      }
    });
  } else {
    return res.status(400).json(isValid);
  }
});

// @ACCESS - Private
// @ENDPOINT - /api/auth/current
// @DESCRIPTION - Return currently logged in user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  });
});


module.exports = router;