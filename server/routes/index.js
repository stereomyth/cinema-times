var express = require('express');
var router = express.Router();

var request = require('request');

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');


router.get('/', function(req, res, next) {
  var cinemas, events;

  db.get('cinemas', function(err, body) {
    cinemas = body.cinemas;
    doRender();
  });

  db.get('events', function(err, body) {
    events = body.events;
    doRender();
  });

  var doRender = function () {
    if (cinemas && events) {
      res.render('index', {cinemas: cinemas, events: events});
    }
  }

});

module.exports = router;
