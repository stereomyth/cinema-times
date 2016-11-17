var express = require('express');
var router = express.Router();
var moment = require('moment');

var tiny = require('../couch/promises.js');
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

let flatten = (film, cinema) => {
  film.variants[0].screenings = film.variants[0].screenings[cinema];

  if (films.length && film.title === films[films.length -1].title) {
    films[films.length -1].variants.push(film.variants[0]);
  } else {
    films.push(film);
  }

};

router.get('/:cinemaId', function(req, res, next) {

  // stamps('films' + req.params.cinema).then(function (response) {
  //   if (moment(response).isAfter(moment().subtract(12, 'hours'))) {
  //     console.log('get local films  ------------------');

      films = [];

      // use local films
      let params = {
        startkey: [req.params.cinemaId, 0], 
        endkey: [req.params.cinemaId + 1, 0]
      };

      tiny.view('films', 'all', params).then(body => {
        body.rows.forEach( row => {
          flatten(row.value, req.params.cinemaId);
        });

        res.send(films);
      }).catch(error => {
        res.send(error);
      });

    // } else {

      // get remote films
      // getFilms(req.params.cinemaId).then(
      //   response => {
      //     res.send(response);
      //   }
      // ).catch(error => res.send(error));

    // }
  // }).catch(error => {
  //   res.send(error);
  // });

});

module.exports = router;
