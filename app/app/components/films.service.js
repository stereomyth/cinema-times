'use strict';

angular.module('cineworld')
  .factory('Films', function ($q, $window, $log, $http, $localStorage, Api, moment) {
    return {

      get: function () {
        let self = this;
        let params = {route: 'films', cinema: $localStorage.options.cinema};

        return $q(function (resolve, reject) {

          // if ($localStorage.films && moment($localStorage.stamps.films).isSame(moment(), 'day')) {
          //   $log.debug('local: films');
          //   resolve($localStorage.films);
          // } else {
            $log.debug('remote: films');

            Api.query(params,
              films => { 

                let edis = {};

                films.forEach((film, edi) => {
                  for (let variant in film.variants) {
                    edis[film.variants[variant].edi] = edi;
                  }
                });

                $localStorage.options.hidden.forEach(edi => {
                  if (films[edis[edi]]) {
                    films[edis[edi]].hidden = true;
                  }
                });

                $localStorage.films = films;
                $localStorage.stamps.films = moment();

                resolve(films);
              },
              error => { reject(error); }
            );

            //     response.today.forEach(film => {
            //       response.films[edis[film.edi]].today = true;
            //     });

          // }

        });

      }

    };
  })
;
