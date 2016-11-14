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

let isEvent = title => {
  for (var i = 0; i < events.length; i++) {
    if (events[i].name === title) {
      // console.log(i);
      events.splice(i, 1);
      return true;
    }
  }
};

let reg = {
  three: /^\(3[dD]\) /,
  imax: /^\(IMAX\) /,
  two: /^\(2[dD]\) /,
  i3d: /^\(IMAX ?3?-?[dD]?\) /,
  unlimited: / ?:? ?Unlimited (Card )?Screening/,
  dubbed: / ?\[Dubbed Version\]/,
  m4j: /^M4J /,
  afs: /^Autism Friendly Screening: /,
  classic: / \(Film Classics\)/
};

let buildFilm = (inFilm, index) => {
  let film = {
    type: 'film',
    _id: '' + inFilm.edi,
    title: inFilm.title,
    variant: 'two',
    cinemas: {}
    // isEvent: isEvent(inFilm.title),
  }

  film.cinemas[req.query.cinema] = [];


  for (variant in reg) {
    if (reg[variant].test(inFilm.title)) {
      film.title = inFilm.title.replace(reg[variant], '');
      film.oldName = inFilm.title;
      break;
    }
  }

  db.get(film._id, (err, body) => {
    if(!err) {
      film._rev = body._rev;
    }
    db.insert(film, (err, body) => {
      if(err) {
        console.log(err);
      }
    });
  });

  films.push(film);
}

router.get('/', function(req, res, next) {

  // stamps('films' + req.query.cinema).then(function (response) {
  //   if (moment(response).isAfter(moment().subtract(12, 'hours'))) {
  //     console.log('get local films  ------------------');

  //     // use local films
  //     db.view('films', 'all', function (err, body) {
  //       if (!err) {
  //         res.send(body);
  //       }
  //     });

  //   } else {

      // get remote films
      getFilms(req.query.cinema).then(
        response => {
          res.send(response);
        },
        error => {
          res.send(error);
        } 
      );

      // getFilms();

  //   }
  // }, function (error) {
  //   res.send(error);
  // });


  // films = [];

  // db.get('events', function (err, body) {
  //   if (!err) {
  //     events = body.events;
  //   } else {
  //     console.log(err);
  //   }
  // })

  // db.view('films', 'all', function (err, body) {
  //   if (!err) {
  //     // console.log(body);

  //     body.rows.forEach(function (thing) {
  //       db.destroy(thing.id, thing.value.rev);
  //     });
  //     res.send(body);
  //   }
  // });

  // db.get('films', function (err, body, headers) {
  //   if (!err) {
  //     body.films.forEach(buildFilm);
    

  //   //   db.bulk({ docs: films }, function (err, body) {
  //   //     if (!err) {
  //         // res.send(films);
  //         res.send(headers);
  //   //     } else {
  //   //       res.send(err);
  //   //     }
  //   //   });
  //   } else {
  //     console.log(err);
  //   }
  // });

});

module.exports = router;
