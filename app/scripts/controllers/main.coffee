'use strict';

angular.module 'Cineworld'
  .controller 'MainCtrl', ($scope, $filter, store, Data, currDate) ->

    $scope.selected = store.get 'cinema-id'

    # $scope.events = Data.get api: 'categories'
    # $scope.events = Data.get api: 'events'
    $scope.films = Data.get api: 'films'

    storeFilter = store.get 'options-events'

    $scope.eventFilter = []

    angular.forEach storeFilter, (val, key) ->
      if not val.checked
        $scope.eventFilter.push key

    eventFilms = Data.get api: 'films', event: $scope.eventFilter

    $scope.eventFilms = []

    angular.forEach eventFilms.films, (val, key) ->
      $scope.eventFilms.push val.edi


    # $scope.eventCodes = 


    # console.log $scope.eventCodes

    # console.log $scope.eventCodes['test1']

   


    # angular.forEach $scope.eventFilms.films (val, key) ->
      # $scope.eventsEdi.push val

    # console.log $scope.eventsEdi
    # $scope.$watch 'selected', (id) ->
    #   if id?
    #     store.set 'cinema-id', id
        # console.log 'set cinema id to '



    


