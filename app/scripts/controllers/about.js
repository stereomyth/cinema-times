'use strict';

/**
 * @ngdoc function
 * @name codeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the codeApp
 */
angular.module('Cineworld')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
