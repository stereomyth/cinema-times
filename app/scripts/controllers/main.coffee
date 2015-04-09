'use strict';

angular.module 'Cineworld'
  .controller 'MainCtrl', ($scope, $filter, Local, Api, store) ->

    $scope.cinemas = Local.get filename: 'cinemas'

    $scope.films = Local.get filename: 'films2'

    $scope.selected = store.get 'cinema-id'

    $scope.date = new Date()
    $scope.date = $filter('date') $scope.date, 'yyyyMMdd'

    $scope.events = Api.get api: 'events'

    $scope.$watch 'selected', (id) ->
      if id?
        store.set 'cinema-id', id
        console.log 'set cinema id'


