var express = require('express');
var router = express.Router();
var moment = require('moment');

var tiny = require('../couch/promises.js');
var api = require('../api/api.js');
var getFilms = require('../api/getFilms.js');

let films = [];
let events;

router.get('/', function(req, res, next) {
  res.send({
    error: 'cinema id is required: api/films/[cinemaId]'
  });
});

let flatten = (film, cinema) => {
  if (films.length && film.title === films[films.length -1].title) {
    films[films.length -1].variants.push(film.variants[0]);
  } else {
    films.push(film);
  }

};

router.get('/:cinemaId', function(req, res, next) {

  tiny.get('stamps').then(stamps => {
    let stamp = stamps['films' + req.params.cinemaId];

    if (!stamp || !moment(stamp).subtract(1, 'hour').isSame(moment(), 'day')) {
      return getFilms(req.params.cinemaId).then(films => {
        stamps['films' + req.params.cinemaId] = moment();
        return tiny.insert(stamps);
      });
    }
  })
  .then(() => tiny.view('films', 'all', { startkey: [req.params.cinemaId, 0], endkey: [req.params.cinemaId + 1, 0] }))
  .then(view => {
    view.rows.forEach(row => {
      flatten(row.value, req.params.cinemaId);
    });

    res.send(films);
  }).catch(error => res.send(error));

});

module.exports = router;
