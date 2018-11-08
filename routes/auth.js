const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateRegistration = require('../utils/validation/validateRegistration');

// @ACCESS - Public
// @ENDPOINT - /api/auth/register
// @DESCRIPTION - Checks the user input via the validateRegistration function, and sends out the user info in a JSON object
// @TODO - Hook it up to the SQL database
router.post('/register', (req, res) => {
  const isValid = validateRegistration(req.body);
  if(isValid === true) {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
          throw err;
        } else {
          newUser.password = hash;
          res.json(newUser);
        }
      })
    });
  } else {
    return res.status(500).json(isValid);
  }
});

module.exports = router;