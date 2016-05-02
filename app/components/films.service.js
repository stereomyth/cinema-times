'use strict';

angular.module('gulp-angular')
  .factory('Films', function ($q, $window, $log, $http, $localStorage, Api) {
    return {

      get: function (params) {
        let self = this;

        return $q(function (resolve, reject) {

          if ($localStorage.films) {
            $log.debug('local films');
            resolve($localStorage.films);
          } else {
            $log.debug('remote films');

            Api.films(params, function (films) {

              resolve(self.convert(films));

            }, function (error) {
              reject(error);
            });

          }

        });

      },

      convert: films => {

        let reg = {
          three: /^\(3[dD]\) /,
          imax: /^\(IMAX\) /,
          two: /^\(2[dD]\) /,
          i3d: /^\(IMAX 3-?[dD]\) /
        };

        let converted = films.films.map(inFilm => {
          let type;

          let outFilm = {
            title: inFilm.title,
            url: inFilm.inFilm_url,
            classification: inFilm.classification,
            advisory: inFilm.advisory,
            poster: inFilm.poster_url,
            still: inFilm.still_url,
            types: {}
          };

          if (reg.three.test(inFilm.title)) {
            type = 'three';
          } else if (reg.imax.test(inFilm.title)) {
            type = 'imax';
          } else if (reg.i3d.test(inFilm.title)) {
            type = 'i3d';
          } else {
            type = 'two';
          }

          outFilm.title = inFilm.title.replace(reg[type], '');
          outFilm.types[type] = {
            edi: inFilm.edi,
            poster: inFilm.poster_url
          };

          return outFilm;
        });

        angular.forEach(converted, function (film, i) {
          if (film) {
            for (var i2 = i + 1; i2 < converted.length; i2++) {
              if (converted[i2].title === film.title) {
                angular.extend(film.types, converted[i2].types);
                converted[i2] = '';
              }
            }
          }
        });

        films = converted.filter(film => film);
        $localStorage.films = films;

        return films;
      }

    };
  })
;
