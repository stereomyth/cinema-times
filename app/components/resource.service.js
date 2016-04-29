'use strict';

angular.module('gulp-angular')
  .factory('Res', function ($q, $window, $log, $http, $localStorage, moment, Api) {
    return {

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

      cinemas: function () {
        if ($localStorage.cinemas) {
          return $localStorage.cinemas;
        } else {
          Api.cinemas(arguments, response => {
            $localStorage.cinemas = response.cinemas;
            return response.cinemas;
          });
        }
      },

      get: function (action) {

          return $q(function (resolve, reject) {

            if ($localStorage[action]) {
              $log.debug('local', action);
              resolve($localStorage[action]);
            } else {
              $log.debug('remote', action);

              Api[action](function (response) {
                $localStorage[action] = response[action];
                resolve(response[action]);
              }, function (error) {
                reject(error);
              });
            }

          });

      }

    };
  })
;
