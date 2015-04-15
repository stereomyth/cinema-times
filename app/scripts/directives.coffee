'use strict';

angular.module 'Cineworld'

  .directive 'film', (Data) ->

    templateUrl: '/partials/film.html'

    scope: 
      d: '='

    link: (scope, element) ->

      # scope.times = Data.get api: 'performances', film: scope.d.edi



  .directive 'options', (Data, store) ->

    templateUrl: '/partials/options.html'

    scope: {}

    link: (scope, element) ->
      lsE = 'options-events'
      lsC = 'options-cinema'

      scope.saveCinema = ->
        store.set lsC, scope.cinema

      scope.saveEvents = ->
        store.set lsE, scope.events

      scope.buildEvents = ->
        console.log 'build events'
        apiEvents = Data.get api: 'events'

        scope.events = {}

        angular.forEach apiEvents.events, (val, key) ->
          scope.events[val.code] = {name: val.name, checked: false}
          # scope.events.push({code: val.code, name: val.name, checked: true})

        store.set lsE, scope.events

      scope.cinemas = Data.get api: 'cinemas'

      scope.cinema = store.get lsC

      scope.events = store.get lsE

      if !scope.events?
        scope.buildEvents()

      # console.log scope.events     



