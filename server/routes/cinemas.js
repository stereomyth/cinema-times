var express = require('express');
var router = express.Router();
var moment = require('moment');

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');

var api = require('../api.js');


var getCinemas = function (res, rev) {
  console.log('remote - cinemas');

  api('cinemas', function (error, response, body) {
    var cinemas = {
      _id: 'cinemas',
      updated: new Date(),
      cinemas: JSON.parse(body).cinemas, 
    }

    if (rev) {
      cinemas._rev = rev;
    }

    db.insert(cinemas, function (err) {
      if (err) 
        console.log(err);
    });

    res.send(body);
  });

};

router.get('/', function(req, res, next) {

  // if no doc or out of date get cinemas otherwise send cinemas

  db.get('cinemas', function(err, body) {
    if (!err) {

      if (body.updated && moment(body.updated).isAfter(moment().subtract(14, 'days'))) {
        console.log('good date');
        console.log('local - cinemas');

        res.send(body.cinemas);
      } else {
        // if older than 14 days 
        console.log('bad date');
        getCinemas(res, body._rev);
      }

    } else {
      if (err.statusCode === 404) {
        getCinemas(res);
      } else {
        res.send(err);
      }
    }
  });
});

module.exports = router;
