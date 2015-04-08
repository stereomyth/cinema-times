'use strict';

angular.module 'Cineworld'
	.controller 'MainCtrl', ($scope, Local) ->

		$scope.cinemas = Local.get()