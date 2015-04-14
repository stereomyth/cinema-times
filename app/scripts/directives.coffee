'use strict';

angular.module 'Cineworld'

  .directive 'film', (Data) ->

    templateUrl: '/partials/film.html'

    scope: 
      d: '='

    link: (scope, element) ->

      scope.times = Data.get api: 'performances', film: scope.d.edi



