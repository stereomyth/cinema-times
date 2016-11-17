var moment = require('moment');
var api = require('../api/api.js');
let tiny = require('../couch/promises.js');


let eventFilms, todayFilms, cinemaId, today = moment().format('YYYYMMDD');

let psudoGet = (name, query = {}, type) => {
  return tiny.get(name).then(response => {
    return response[type || name];
  }, error => {
    return api(type || name, query).then(json => {
      return tiny.insert(json, name).then(body => {
        return json[type || name];
      })
    });
  })
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
  let film = {
    title: inFilm.title,
    _id: '' + inFilm.edi,
    poster: inFilm.poster_url,
    variant: '2D',
    isEvent: arrayCompare(inFilm.title, eventFilms),
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

  return tiny.get(film._id).then(dbFilm => {
    film._rev = dbFilm._rev;

    if (arrayCompare(inFilm.edi, todayFilms)) {
      console.log('today -->', film.title);
      // get film times from api

      film.screenings = dbFilm.screenings || {};
      film.screenings[cinemaId] = {screenings: 'for ' + cinemaId};
    }
  }).then(thing => {
    return tiny.insert(film);
  }).then(stuff => {
    return film;
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
