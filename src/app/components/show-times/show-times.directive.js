'use strict';

export function ShowTimesDirective(Api, $log) {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: 'app/components/show-times/show-times.html',
    scope: {
        film: '=showTimes'
    },
    link: function (scope) {
      
      Api.shows(scope.film.edi).then(function (responce) {
        scope.shows = responce;
      });
    }
  };
}
