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
  const sqlQuery = "SELECT * FROM `incidents`";
  sql.query(sqlQuery, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

// @ACCESS - Private
// @ENDPOINT - /api/incidents/add
// @DESCRIPTION - Report a new incident
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Send out a new incident report to the database
  const newIncident = {
    userId: req.user.id,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  const sqlQuery = "INSERT INTO `incidents` (`User_id`, `latitude`, `longitude`) VALUES ('"+newIncident.userId+"', '"+newIncident.latitude+"', '"+newIncident.longitude+"')";
  sql.query(sqlQuery, (err, result) => {
    if(err) throw err;
      console.log('1 record inserted.');
      res.json(newIncident);
  });
});

module.exports = router;