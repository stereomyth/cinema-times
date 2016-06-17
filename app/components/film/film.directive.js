'use strict';

angular.module('cineworld')
  .directive('film', function () {
    return {

      restrict: 'A',
      templateUrl: 'components/film/film.html'
      // scope: {
      //   film: '='
      // },

      // link: function (scope) {
      //   let hidden = $localStorage.options.hidden;



      //   // scope.v = {
      //   //   shows: true
      //   // };

      //   scope.objl = obj => Object.keys(obj).length;

      // }

    };
  })
;
