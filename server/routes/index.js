var express = require('express');
var router = express.Router();

var request = require('request');

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');

/* GET home page. */
router.get('/', function(req, res, next) {
  var cinemas, events;

  // request('http://www.cineworld.co.uk/api/quickbook/events?key=TNk2:R3P', function (error, response, body) {
  // request('http://www.cineworld.co.uk/api/quickbook/cinemas?key=TNk2:R3P', function (error, response, body) {
    // console.log(body);
    db.get('cinemas', function(err, body) {
      cinemas = body.cinemas;
      doRender();
    });

    db.get('events', function(err, body) {
      events = body.events;
      doRender();
    });

      // db.insert(JSON.parse(body), 'events', function (err) {
        // console.log(err);
      // });
      // res.render('index', {cinemas: body.cinemas, events: body.events});
      // res.render('index', { title: 'Express', dump: JSON.stringify(body) });
      // console.log
    // if (!error && response.statusCode == 200) {
    // res.render('index', {dump: JSON.stringify(body)});
  // });

  var doRender = function () {
    if (cinemas && events) {
      res.render('index', {cinemas: cinemas, events: events});
    }
  }

  // db.get('')
  // var dump = db.get('test1');
      // db.insert({test: 3}, 'test2');
      // db.insert(body.cinemas, 'cinemas');
  //     res.render('index', { title: req.params.cheese, response: body });

  // db.get('test1', function(err, body) {
  //   res.render('index', { title: 'Express', dump: JSON.stringify(body) });
  // });
      // res.render('index', { title: 'Express', response: JSON.parse(body).cinemas });
    // }


});

module.exports = router;
