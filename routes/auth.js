const express = require('express');
const router = express.Router();

router.post('/api/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };
  res.json(newUser);
});