'use strict';

angular.module 'Cineworld'

  .directive 'film', (Local) ->

    templateUrl: '/partials/film.html'

    scope: 
      d: '='

    link: (scope, element) ->

      scope.times = Local.get filename: 'sponge'



