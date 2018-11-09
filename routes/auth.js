const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const validateInput = require('../utils/validateInput');

// @ACCESS - Public
// @ENDPOINT - /api/auth/register
// @DESCRIPTION - Checks the user input, which if valid, will be sent out to the database as a new user
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
          // Replace line below with a function which will send the new user out to the database
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
// @DESCRIPTION - Checks the user input for an existing user, and if there is an user, validate it if the login info is correct
// @TODO - Hook it up to the SQL database
router.post('/login', (req, res) => {
  const isValid = validateInput.validateLogin(req.body);
  if(isValid === true) {
    // Check for an existing user, and if there is one, check it's login information with the information within the database
    const user = {
      email: req.body.email
    };
    return res.status(200).json({user: user, loggedIn: true});
  } else {
    return res.status(500).json(isValid);
  }
});

module.exports = router;