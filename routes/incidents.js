const express = require('express');
const router = express.Router();
const validateInput = require('../utils/validateInput');
const passport = require('passport');
const sql = require('../db/db');

// @ACCESS - Public
// @ENDPOINT - /api/incidents/all
// @DESCRIPTION - Get all reported incidents
router.get('/all', (req, res) => {
  // Query the database, grab the incidents and send them out
  res.send('Incidents route');
});

// @ACCESS - Private
// @ENDPOINT - /api/incidents/add
// @DESCRIPTION - Get all reported incidents
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check the input, and if valid, send it out to the database
  res.send('Incidents route');
});

module.exports = router;