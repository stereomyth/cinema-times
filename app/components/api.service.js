'use strict';

angular.module('gulp-angular')
  .factory('Api', function ($resource, $localStorage) {
    let apiKey = 'TNk2:R3P';
    return $resource('http://www.cineworld.com/api/quickbook/:route',
      {key: apiKey, cinema: $localStorage.options.cinema, callback: 'JSON_CALLBACK'}, {
        cinemas: {method: 'JSONP', params: {route: 'cinemas', cinema: null}},
        films: {method: 'JSONP', params: {route: 'films', full: true}},
        shows: {method: 'JSONP'}
      }
    );
  })
;
