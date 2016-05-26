'use strict';

angular.module('cineworld')
  .directive('showTimes', function (Api, $log, moment) {
    return {

      restrict: 'A',
      templateUrl: 'components/show-times/show-times.html',
      scope: {
        film: '=showTimes'
      },

      link: function (scope) {

        let available = function (time) {
          return moment(time, 'hh:mm').add(25, 'm').isAfter(moment());
        };

        Api.shows(scope.film.edi).then(function (data) {
          scope.shows = [];
          data.forEach(function (show) {
            if (available(show.time)) {
              scope.shows.push(show);
            }
          });

          if (scope.shows.length < 1) {
            $log.debug('no shows', scope.film.title);
            scope.$parent.v.shows = false;
          }
        });

      }

    };
  })
;
