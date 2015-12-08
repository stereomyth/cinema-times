export class MainController {
  constructor ($scope, $log, api) {
    'ngInject';

    api.get('cinemas').then(function (response) {
      $scope.result = response;
    });

  }

  exampleFunction() {
    //function 
  }

}
