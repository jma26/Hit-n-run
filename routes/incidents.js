const express = require('express');
const router = express.Router();
const validateInput = require('../utils/validateInput');
const passport = require('passport');
const sql = require('../db/db');
const keys = require('../utils/keys');

router.get('/', (req, res) => {
  res.send('Incidents route');
});

module.exports = router;