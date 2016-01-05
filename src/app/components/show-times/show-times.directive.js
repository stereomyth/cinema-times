'use strict';

export function ShowTimesDirective(Api, $log, moment) {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: 'app/components/show-times/show-times.html',
    scope: {
      film: '=showTimes'
    },
    link: function (scope) {
      
      let available = function (time) {
        return moment(time, 'hh:mm').add(25, 'm').isAfter(moment());
      };

      Api.shows(scope.film.edi).then(function (data) {
        scope.shows = [];
        data.forEach(function (show, index) {
          if (available(show.time)) {
            scope.shows.push(show);
          }
        });

        if (scope.shows.length < 1) {
          console.log('no shows', scope.film.title);
          scope.$parent.v.shows = false;
        } 
      });

    }
  };
}
