var express = require('express');
var router = express.Router();
var moment = require('moment');


var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');

var api = require('../api/api.js');
var getFilms = require('../api/getFilms.js');

let films = [];
let events;

let stamps = (name, time) => {
  return new Promise((resolve, reject) => {

    db.get('stamps', (err, body) => {
      if (!err) {

        if (time) {
          body[name] = time;

          db.insert(body, err => {
            if (!err) {
              resolve(true);
            } else {
              reject(err);
            }
          });

        } else {
          if (body[name]) {
            resolve(body[name]);
          } else {
            resolve(moment('1995-12-25'));
          }
        }

      } else {
        reject(err);
      }

    });

  });
};

router.get('/', function(req, res, next) {
  res.send({
    error: 'cinema id is required: api/films/[cinemaId]'
  });
});

router.get('/:cinemaId', function(req, res, next) {

  // stamps('films' + req.params.cinema).then(function (response) {
  //   if (moment(response).isAfter(moment().subtract(12, 'hours'))) {
  //     console.log('get local films  ------------------');

      // use local films
      // db.view('films', 'all', function (err, fbody) {
      //   if (!err) {
      //     res.send(body);
      //   }
      // });

      // res.send('local films!');

    // } else {

      // get remote films
      getFilms(req.params.cinemaId).then(
        response => {
          res.send(response);
        },
        error => {
          res.send(error);
        } 
      );

    // }
  // }).catch(error => {
  //   res.send(error);
  // });

});

module.exports = router;
