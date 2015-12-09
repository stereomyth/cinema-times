'use strict';

export function FilmDirective($log) {
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
        scope.hiddenList[film.edi] = !scope.hiddenList[film.edi];
        film.hidden = scope.hiddenList[film.edi];
      };

    }
  };
}
