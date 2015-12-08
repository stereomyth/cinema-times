export class MainController {
  constructor ($scope, $log, $http, $window, $q, api) {
    'ngInject';

    api.get('test').then(function (response) {
      $scope.result = response;
    });

  }

  exampleFunction() {
    //function 
  }

}
