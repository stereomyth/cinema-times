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
      
      Api.get('performances', {film: scope.film.edi, date: 20151210})
        .then(function (responce) {
          scope.shows = responce;
        });
    }
  };
}
