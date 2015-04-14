angular.module 'services', []

  .factory 'currDate', ($filter) ->
    return $filter('date') new Date(), 'yyyyMMdd' 

  .factory 'Local', ($resource) -> 
    $resource 'data/:filename.json', {}

  .factory 'Api', ($resource) ->
    $resource 'http://www.cineworld.com/api/:qb/:api', {key: $key, callback: 'JSON_CALLBACK'}, 
      { get: { method: 'JSONP' } }

  .factory 'Data', (Api, store, currDate) ->

    get: (params) ->
      paramString = JSON.stringify params

      local = store.get(paramString)
      
      if local? 

        return local;

      else

        # console.log "calling #{params.api} api"

        if params.api isnt 'categories' and params.api isnt 'events'
          params.qb = 'quickbook'

        if params.api is 'cinemas' or params.api is 'films'
          params.full = true

        if params.api is 'films' or params.api is 'performances'
          params.cinema = store.get 'cinema-id'
          params.date = currDate

        console.log params

        return Api.get params, (response) ->
          response.params = params
          store.set paramString, response
  