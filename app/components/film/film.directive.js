'use strict';

angular.module('gulp-angular')
  .directive('film', function () {
    return {

      restrict: 'A',
      templateUrl: 'components/film/film.html',
      scope: {
        film: '=',
        hiddenList: '='
      },
      link: function (scope) {

        scope.hideFilm = function (film) {
          film.hidden = scope.hiddenList[film.edi] = !scope.hiddenList[film.edi];
        };

        scope.v = {
          shows: true
        };

      }

    };
  })
;
