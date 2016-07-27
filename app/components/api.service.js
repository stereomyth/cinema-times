'use strict';

angular.module('cineworld')
  .factory('Api', function ($resource, $localStorage) {
    let apiKey = 'TNk2:R3P';
    return $resource('http://www.cineworld.com/api/quickbook/:route',
      {key: apiKey, cinema: $localStorage.options.cinema, callback: 'JSON_CALLBACK'}, { get: {method: 'JSONP'} }
    );
  })
;
