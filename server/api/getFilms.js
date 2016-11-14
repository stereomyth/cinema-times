var moment = require('moment');
var api = require('../api/api.js');

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');


let films = [], inFilms, events, todayFilms;

let psudoGet = (name, type, query = {}) => {
  return new Promise ((resolve, reject) => {

    db.get(name, (err, body) => {
      if (!err) {
        resolve(body[type || name]);
      } else {
        api({uri: (type || name), qs: query}, (error, response, body) => {
          if (!error) {
            db.insert(body, name, (err) => {
              if (!err) {
                resolve(body[type || name]);
              } else {
                reject(err);
              }
            });
          } else {
            reject(err);
          }
        });
      }
    });

  });
};

let apiEvents = () => {
  return psudoGet('events');
};

let apiFilms = (cinema) => {
  return psudoGet('films', 'films', {full: true, cinema: cinema});
};

let apiToday = (cinema) => {
  return psudoGet('today', 'films', {full: true, cinema: cinema, date: moment().format('YYYYMMDD')});
};

let eventCheck = title => {
  for (var i = 0; i < events.length; i++) {
    if (events[i].name === title) {
      // console.log(i);
      events.splice(i, 1);
      return true;
    }
  }
};

let regex = {
  '2D': /^\(2[dD]\) /,
  '3D': /^\(3[dD]\) /,
  imax: /^\(IMAX\) /,
  imax3D: /^\(IMAX ?3?-?[dD]?\) /,
  dubbed: / ?\[Dubbed Version\]/,
  junior: /^M4J /,
  autism: /^Autism Friendly Screening: /,
  classic: / \(Film Classics\)/,
  unlimited: / ?:? ?Unlimited (Card )?Screening/
};

let buildFilm = inFilm => {
  let film = {
    title: inFilm.title,
    _id: '' + inFilm.edi,
    poster: inFilm.poster_url,
    variant: '2D',
    // cinemas: {},
    isEvent: eventCheck(inFilm.title),
    type: 'film'
  }

  // film.cinemas[req.query.cinema] = [];

  for (variant in regex) {
    if (regex[variant].test(inFilm.title)) {
      film.title = inFilm.title.replace(regex[variant], '');
      film.variant = variant;
      film.oldName = inFilm.title;
      break;
    }
  }

  // db.get(film._id, (err, body) => {
  //   if(!err) {
  //     film._rev = body._rev;
  //   }
  //   db.insert(film, (err, body) => {
  //     if(err) {
  //       console.log(err);
  //     }
  //   });
  // });

  films.push(film);
}

let getFilms = (cinema) => {
  return new Promise((resolve, reject) => {

    console.log('get remote films ------------------');
    Promise.all([apiFilms(cinema), apiEvents(), apiToday(cinema)]).then(
      results => {
        [inFilms, events, todayFilms] = results;

        inFilms.forEach(buildFilm);

        resolve(films);
      },
      error => {
        reject(error);
      }
    );


  });
};

module.exports = getFilms;
