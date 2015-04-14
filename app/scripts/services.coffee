angular.module 'services', []

  .factory 'currDate', ($filter) ->
    return $filter('date') new Date(), 'yyyyMMdd' 

  .factory 'Local', ($resource) -> 
    $resource 'data/:filename.json', {}

  .factory 'Api', ($resource) ->
    $resource 'http://www.cineworld.com/api/:qb/:api', {key: $key, callback: 'JSON_CALLBACK'}, 
      { get: { method: 'JSONP' } }

  .factory 'Data', (Api, store) ->

    get: (params) ->
      paramString = JSON.stringify params

      local = store.get(paramString)
      
      if local? 

        return local;

      else

        console.log 'calling api'

        if params.api isnt 'categories' and params.api isnt 'events'
          params.qb = 'quickbook'

        return Api.get params, (response) ->
          store.set paramString, response;
  