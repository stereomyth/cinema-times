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

  .factory 'jsonpIntercept', ($window, $timeout, $q) ->

    request: (config) ->

      if config.method is 'JSONP'

        callbackId = angular.callbacks.counter.toString(36)
        config.callbackName = 'angularcallbacks_' + callbackId
        config.url = config.url.replace('JSON_CALLBACK', config.callbackName)
        
        $timeout ->
          $window[config.callbackName] = angular.callbacks['_' + callbackId]
        , 0, false

      return config

    response: (response) ->

      config = response.config
      if config.method is 'JSONP'
        delete $window[config.callbackName]
      
      return response

    responseError: (rejection) ->

      config = rejection.config;
      if config.method is 'JSONP'
        delete $window[config.callbackName]

      return $q.reject rejection

      # return rejection

  .config ($httpProvider) ->
    $httpProvider.interceptors.push('jsonpIntercept');
  