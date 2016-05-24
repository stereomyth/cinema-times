'use strict';

angular.module('gulp-angular')
  .factory('Api', function ($resource, $localStorage) {
    let apiKey = 'TNk2:R3P';
    return $resource('http://www.cineworld.com/api/:qb/:route',
      {key: apiKey, cinema: $localStorage.options.cinema, callback: 'JSON_CALLBACK'}, {
        cinemas: {method: 'JSONP', params: {route: 'cinemas', cinema: null, qb: 'quickbook'}},
        events:  {method: 'JSONP', params: {route: 'events'}},
        cats:    {method: 'JSONP', params: {route: 'categories'}},
        films:   {method: 'JSONP', params: {route: 'films', full: true, qb: 'quickbook'}},
        today:   {method: 'JSONP', params: {route: 'films', qb: 'quickbook'}},
        shows:   {method: 'JSONP', params: {route: 'performances', qb: 'quickbook'}}
      }
    );
  })
;
