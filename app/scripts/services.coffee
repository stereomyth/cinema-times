angular.module 'services', []
  .factory 'Local', ($resource) -> 
    $resource 'data/:filename.json', {}