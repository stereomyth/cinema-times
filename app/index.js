/* globals moment */
(function() {
  'use strict';

  angular.module('cineworld',
    ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ngStorage'])

    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main/main.html',
          controller: 'MainController',
          controllerAs: 'main'
        })
        .otherwise({
          redirectTo: '/'
        })
      ;
    })

    .config(function ($logProvider) {
      $logProvider.debugEnabled(true);
      if (!localStorage['ngStorage-options']) {
        localStorage['ngStorage-options'] = JSON.stringify({
          typeTabs: 'none',
          panel: 'all',
          clean: true,
          cinema: '',
          hidden: []
        });
      }
      if (!localStorage['ngStorage-stamps']) {
        localStorage['ngStorage-stamps'] = JSON.stringify({});
      }
    })

    .constant('moment', moment);

})();
