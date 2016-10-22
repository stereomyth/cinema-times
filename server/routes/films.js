var express = require('express');
var router = express.Router();

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');

var api = require('../api.js');

router.get('/', function(req, res, next) {

  // api('films', function (error, response, body) {
  //   db.insert(JSON.parse(body), 'films', function (err) {
  //     console.log(err);
  //   });
  // });

  let films = [];
  let events;

  let isEvent = title => {
    for (var i = 0; i < events.length; i++) {
      if (events[i].name === title) {
        console.log(i);
        events.splice(i, 1);
        return true;
      }
    }
  };

  let buildFilm = (inFilm, index) => {
    let film = {
      title: inFilm.title,
      isEvent: isEvent(inFilm.title),
    }

    // events.forEach(function (event, index) {
    //   if (event.name === inFilm.title) {
    //     events.splice(index, 1);
    //     films.isEvent = true;
    //     skip = true;
    //   }
    // });

    if (!film.event) {
      if (/^\([23][dD]\) /.test(inFilm.title) || /^\(IMAX ?3?-?[dD]?\) /.test(inFilm.title)) {
        films.push(film);
        // type: 
      } else {
        films.push(film);
      }
    }
  }

  db.get('events', function (err, body) {
    if (!err) {
      events = body.events;
    } else {
      console.log(err);
    }
  })

  db.get('films', function (err, body) {
    if (!err) {
      body.films.forEach(buildFilm);
    

      // db.bulk({ docs: [] }, function (err, body) {
      //   if (!err) {
      //     res.send(body);
      //   } else {
      //     res.send(err);
      //   }
      // });
      res.send(films);
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
