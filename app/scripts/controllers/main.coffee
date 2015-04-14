'use strict';

angular.module 'Cineworld'
  .controller 'MainCtrl', ($scope, $filter, store, Data, currDate) ->

    $scope.selected = store.get 'cinema-id'

    # $scope.events = Data.get api: 'categories'
    # $scope.events = Data.get api: 'events'
    $scope.films = Data.get api: 'films'

    # $scope.$watch 'selected', (id) ->
    #   if id?
    #     store.set 'cinema-id', id
        # console.log 'set cinema id to '


