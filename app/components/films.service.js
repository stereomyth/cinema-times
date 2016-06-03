'use strict';

angular.module('cineworld')
  .factory('Films', function ($q, $window, $log, $http, $localStorage, Api, moment) {
    return {

      get: function () {
        let self = this;
        let params = {route: 'films', cinema: $localStorage.options.cinema};

        return $q(function (resolve, reject) {

          if ($localStorage.films && moment($localStorage.stamps.films).isSame(moment(), 'day')) {
            $log.debug('local films');
            resolve($localStorage.films);
          } else {
            $log.debug('remote films');

            $q.all({films: self.films(params), today: self.today(params)})
              .then(function (response) {
                let edis = {};

                response.films.forEach((film, index) => {
                  for (let type in film.types) {
                    edis[film.types[type].edi] = index;
                  }
                });

                response.today.forEach(film => {
                  response.films[edis[film.edi]].today = true;
                });

                $localStorage.options.hidden.forEach(edi => {
                  if (response.films[edis[edi]]) {
                    response.films[edis[edi]].hidden = true;
                  }
                });

                $localStorage.films = response.films;
                $localStorage.stamps.films = moment();
                resolve(response.films);
              }, error => {
                reject(error);
              });
          }

        });

      },

      films: function (params) {
        let self = this;
        params.full = true;

        return $q(function (resolve, reject) {
          Api.get(params,
            films => { resolve(self.convert(films)); },
            error => { reject(error); }
          );
        });
      },

      today: function (params) {
        params.date = moment().format('YYYYMMDD');

        return $q(function (resolve, reject) {
          Api.get(params,
            data => { resolve(data.films); },
            error => { reject(error); }
          );
        });
      },

      convert: films => {

        let reg = {
          three: /^\(3[dD]\) /,
          imax: /^\(IMAX\) /,
          two: /^\(2[dD]\) /,
          i3d: /^\((3[dD] IMAX|IMAX 3-?[dD])\) /,
          unlimited: / (-\s)?Unlimited (Card\s)?Screening/
        };

        let converted = films.films.map(inFilm => {
          let type, typeName;

          let outFilm = {
            title: inFilm.title,
            url: inFilm.film_url,
            classification: inFilm.classification,
            advisory: inFilm.advisory,
            poster: inFilm.poster_url,
            still: inFilm.still_url,
            types: {}
          };

          if (reg.three.test(inFilm.title)) {
            type = 'three';
            typeName = '3D';
          } else if (reg.imax.test(inFilm.title)) {
            type = 'imax';
            typeName = 'IMAX';
          } else if (reg.i3d.test(inFilm.title)) {
            type = 'i3d';
            typeName = 'IMAX 3D';
          } else if (reg.unlimited.test(inFilm.title)) {
            type = 'unlimited';
            typeName = 'U';
          } else {
            type = 'two';
            typeName = '2D';
          }

          outFilm.title = inFilm.title.replace(reg[type], '');
          outFilm.types[type] = {
            edi: inFilm.edi,
            poster: inFilm.poster_url,
            name: typeName
          };

          return outFilm;
        });

        converted.forEach(function (film, i) {
          if (film) {
            for (var i2 = i + 1; i2 < converted.length; i2++) {
              if (converted[i2].title === film.title) {
                angular.extend(film.types, converted[i2].types);
                converted[i2] = '';
              }
            }
          }
        });

        return converted.filter(film => film);
      }

    };
  })
;
