angular.module 'services', []
	.factory 'Local', ($resource) -> 
		$resource 'data/cinemas.json', {}