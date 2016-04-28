'use strict';

angular.module('gulp-angular')
  .factory('Res', function ($q, $window, $log, $http, $localStorage, moment, Api) {
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

      cinemas: function () {
        if ($localStorage.cinemas) {
          return $localStorage.cinemas;
        } else {
          return Api.cinemas(arguments);
        }
      },

      get: function (action, args) {
        // label = label || route;

        if ($localStorage.general[action]) {

          // if local exists use local
          $log.debug('local', action);
          return $localStorage.general[action];

        } else {

          $log.debug('remote', action);
          $localStorage.general[action] = this.remote[action](args);
          return this.remote[action](args);

        }
      }

    };
  })
;
