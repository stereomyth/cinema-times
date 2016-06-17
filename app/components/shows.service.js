'use strict';

angular.module('cineworld')
  .factory('Shows', function ($q, $log, $localStorage, moment, Api) {
    return {

      params: {route: 'performances', cinema: $localStorage.options.cinema, date: moment().format('YYYYMMDD')},

      get: function () {
        let self = this;
        // let params = {route: 'performances', cinema: $localStorage.options.cinema, date: moment().format('YYYYMMDD')};

        return $q(function (resolve) {
          if ($localStorage.stamps.shows && moment($localStorage.stamps.shows).isSame(moment(), 'day')) {
            $log.debug('local shows');
            resolve();
          } else {

            $localStorage.films.forEach(film => {
              self.film(film);
            });

            // $localStorage.stamps.shows = moment();
            resolve();
          }

        });

      },

      film: function (film) {
        let self = this;
        if (film.today && !film.hidden) {

          angular.forEach(film.types, type => {
            if (!type.shows) {
              self.params.film = type.edi;

              Api.get(self.params, (data) => {
                $log.debug('remote', film.title, type.name);
                type.shows = [];
                data.performances.forEach(performance => {
                  let show = {
                    stamp: moment(performance.time, 'HH:mm'),
                    time: performance.time,
                    url: performance.booking_url,
                    subs: performance.subtitled
                  };
                  type.shows.push(show);
                });
                self.gauge(type.shows);
              });
            } else {
              $log.debug('local', film.title, type.name);
              self.gauge(type.shows);
            }

          });

        }
      },

      gauge: function (shows) {
        if (shows && shows.length) {
          shows.forEach(show => {
            if (moment(show.time, 'HH:mm').add(25, 'm').isAfter(moment())) {
              show.available = true;
            }
          });
        }
      }

    };
  })
;
