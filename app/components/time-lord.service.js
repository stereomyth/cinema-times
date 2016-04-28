'use strict';

angular.module('gulp-angular')
  .factory('TimeLord', function ($resource, $localStorage, moment, $log) {

    return {

      check: function () {

        $localStorage.temp = $localStorage.temp || [];

        let currentDay = $localStorage.currentDay,
          today = moment();

        if (!currentDay || currentDay && !today.isSame(currentDay, 'day')) {

          $log.debug('Getting new data');
          $localStorage.currentDay = moment();

          delete $localStorage.films;
          $localStorage.temp.forEach(function (entry) {
            delete $localStorage[entry];
          });

          $localStorage.temp = [];

        }

      }

    };
  })
;
