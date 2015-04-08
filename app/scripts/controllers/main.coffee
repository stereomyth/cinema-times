'use strict';



angular.module 'Cineworld'
  .controller 'MainCtrl', ($scope, Local, store) ->

    $scope.cinemas = Local.get filename: 'cinemas'

    $scope.selected = store.get 'cinema-id'

    $scope.$watch 'selected', (id) ->
      if id?
        store.set 'cinema-id', id
        console.log 'set cinema id'


