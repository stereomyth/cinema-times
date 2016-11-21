'use strict';

angular.module('cineworld')
  .factory('Api', function ($resource, $localStorage) {
    return $resource('http://localhost:3000/api/:route/:cinema', {cinema: $localStorage.options.cinema});
  })
;
