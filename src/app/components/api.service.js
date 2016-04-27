'use strict';

export class FilmsApi {
  constructor ($q, $window, $log, $http, $localStorage, moment, $resource) {
    'ngInject';

    let apiKey = 'TNk2:R3P';

    return {

      // films: function () {
      //   let self = this;

      //   return $q(function (resolve, reject) {
      //     self.get('films', {full: true, date: moment().format('YYYYMMDD')})
      //       .then(function (response) {
      //         resolve(response);
      //       }, function (response) {
      //         reject(response);
      //       });
      //   });
      // },

      // shows: function (film) {
      //   let self = this;

      //   return $q(function (resolve, reject) {
      //     let params = {film: film, date: moment().format('YYYYMMDD')};

      //     self.get('performances', params, film + '-shows', true)
      //       .then(function (response) {
      //         resolve(response);
      //       }, function (response) {
      //         reject(response);
      //       });
      //   });
      // },

      get: function (route, params, label) {
      // get: function (route, params, label, temporary) {
        let self = this;

        return $q(function (resolve, reject) {
            label = label || route;

            if ($localStorage[label]) {
              
              // if local exists use local
              $log.debug('local', label, $localStorage[label]);
              resolve($localStorage[label]);

            } else {

              params = params || {};
              params.route = route;

              self.remote[route](params, 
                response => {
                  $log.debug('remote', route, response);
                  resolve(response);
                }, 
                response => reject(response)
              );

            }
        });
      },

      remote: $resource('http://www.cineworld.com/api/quickbook/:route', 
        {key: apiKey, cinema: $localStorage.cinema, callback: 'JSON_CALLBACK', date: moment().format('YYYYMMDD')}, {
          cinemas: {method: 'JSONP', params: {cinema: null}},
          films: {method: 'JSONP', params: {full: true}},
          shows: {method: 'JSONP'}
        }),

      // remove wrapping object
      letterOpener: json => json[Object.keys(json)[0]]

    };

  }
}
