const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const validateInput = require('../utils/validateInput');

// @ACCESS - Public
// @ENDPOINT - /api/auth/register
// @DESCRIPTION - Checks for an existing user. If there is no existing user, register the new user
// @TODO - Hook it up to the SQL database; Check for existing user
router.post('/register', (req, res) => {
  const isValid = validateInput.validateRegistration(req.body);
  if(isValid === true) {
    // Check for an existing user
    const newUser = {
      id: uuid(),
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
          // Register the new user in the database
          res.json(newUser);
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