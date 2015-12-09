'use strict';

export function FilmDirective($log) {
  'ngInject';

  let directive = {
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
    // controller: NavbarController,
    // controllerAs: 'vm',
    // bindToController: true
  };

  return directive;
}

// class NavbarController {
//   constructor () {
//     'ngInject';

    
//   }
// }
