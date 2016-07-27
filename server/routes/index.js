var express = require('express');
var router = express.Router();

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cw-one');

var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {


  // db.list(function(err, body){
  //   // console.log(body.rows);
  //   body.rows.forEach(function(doc) {
  //     console.log(doc.cheese);
  //   });
  // });

  // db.get('bree', function (err, body) {
  //   console.log(body);
  // }); 

  request('http://www.cineworld.co.uk/api/quickbook/cinemas?key=TNk2:R3P', function (error, response, body) {
    if (!error && response.statusCode == 200) {

      db.insert(JSON.parse(body), 'cinemas');
      // db.insert(body.cinemas, 'cinemas');
      res.render('index', { title: req.params.cheese, response: body });
    }
  })

  // res.render('index', { title: req.params.cheese, response: body });
  // res.render('index', { title: req.params.cheese, response: body });

});

module.exports = router;
