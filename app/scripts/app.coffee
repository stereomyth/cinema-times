'use strict';

angular.module 'Cineworld', [
    'ngAnimate', 'ngCookies' 
    'ngResource', 'ngRoute' 
    'ngSanitize', 'ngTouch'
    'services', 'angular-storage'
  ]
  .config ($routeProvider) ->
    $routeProvider

      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'

      .when '/about', 
        templateUrl: 'views/about.html'
        controller: 'AboutCtrl'
      
      .otherwise
        redirectTo: '/'
