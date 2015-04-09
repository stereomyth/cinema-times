angular.module 'services', []
  .factory 'Local', ($resource) -> 
    $resource 'data/:filename.json', {}
  .factory 'Api', ($resource) ->
    $resource 'http://www.cineworld.com/api/:api', {}, 
      {
        get: { method: 'JSONP', params: {key: $key, callback: 'JSON_CALLBACK'} }
      }
    # $resource 'http://www.cineworld.com/api/:api', {key: $key, callback: "JSON_CALLBACK"}, {get: {method: 'JSONP'}}