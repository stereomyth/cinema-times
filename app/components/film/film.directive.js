'use strict';

angular.module('gulp-angular')
  .directive('film', function ($localStorage) {
    return {

      restrict: 'A',
      templateUrl: 'components/film/film.html',
      scope: {
        film: '='
      },

      link: function (scope) {
        let hidden = $localStorage.options.hidden;

        scope.toggleHidden = film => {
          if (film.hidden) {
            for (let type in film.types) {
              hidden.splice(hidden.findIndex(element => element === film.types[type].edi), 1);
            }
          } else {
            for (let type in film.types) {
              hidden.push(film.types[type].edi);
            }
          }
          film.hidden = !film.hidden;
        };

        // scope.v = {
        //   shows: true
        // };

      }

    };
  })
;
