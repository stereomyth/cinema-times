'use strict';

angular.module('gulp-angular')
  .factory('Api', function ($resource, $localStorage, moment) {
    let apiKey = 'TNk2:R3P';
    return $resource('http://www.cineworld.com/api/quickbook/:route',
      {key: apiKey, cinema: $localStorage.cinema, callback: 'JSON_CALLBACK', date: moment().format('YYYYMMDD')}, {
        cinemas: {method: 'JSONP', params: {route: 'cinemas', cinema: null}},
        films: {method: 'JSONP', params: {full: true}},
        shows: {method: 'JSONP'}
      }
    );
  })
;
