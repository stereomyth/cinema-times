/* globals moment */
(function() {
  'use strict';

  angular.module('gulp-angular',
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
        localStorage['ngStorage-options'] = '{}';
      }
    })

    .constant('moment', moment);

})();
