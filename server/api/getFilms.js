var moment = require('moment');
var api = require('../api/api.js');

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('cineworld-one');


let eventFilms, todayFilms, cinemaId, today = moment().format('YYYYMMDD');

let psudoGet = (name, query = {}, type) => {
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

let arrayCompare = (comparator, array) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === comparator) {
      array.splice(i, 1);
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
  return new Promise((resolve, reject) => {

    let film = {
      title: inFilm.title,
      _id: '' + inFilm.edi,
      poster: inFilm.poster_url,
      variant: '2D',
      isEvent: arrayCompare(inFilm.title, eventFilms),
      screenings: {},
      type: 'film'
    }

    for (variant in regex) {
      if (regex[variant].test(inFilm.title)) {
        film.title = inFilm.title.replace(regex[variant], '');
        film.variant = variant;
        film.oldTitle = inFilm.title;
        break;
      }
    }

    db.get(film._id, (err, body) => {
      if(!err) {
        film._rev = body._rev;

        if (arrayCompare(inFilm.edi, todayFilms)) {
          console.log('today -->', film.title);
          // get film times from api

          film.screenings[today] = body.screenings[today] || {};
          film.screenings[today][cinemaId] = {some: 'times'};
        }
      }
      db.insert(film, (err, body) => {
        if(!err) {
          resolve(film);
        } else {
          reject(err);
        }
      });
    });

  });
}

let getFilms = (cinema) => {
  return new Promise((resolve, reject) => {
    cinemaId = cinema;

    console.log('get remote films ------------------');
    Promise.all([
      psudoGet('events'),
      psudoGet('films', {full: true, cinema: cinema}),
      psudoGet('today', {full: true, cinema: cinema, date: today}, 'films')
    ]).then(
      results => {
        [eventFilms, inFilms, todayFilms] = results;

        todayFilms = todayFilms.map(film => film.edi);
        eventFilms = eventFilms.map(film => film.name);

        return inFilms;
      }
    ).then(
      films => {
        return Promise.all(films.map(buildFilm)).then(resolve);
      }
    ).catch(reject);


  });
};

module.exports = getFilms;
