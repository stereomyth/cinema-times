'use strict';

export function FilmDirective() {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: 'app/components/film/film.html',
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
}
