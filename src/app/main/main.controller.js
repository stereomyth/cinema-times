export class MainController {
  constructor ($scope, $log, api) {
    'ngInject';

    $scope.cheese = 'hello';

    $scope.films = api.jp();
  }

  exampleFunction() {
    //function 
  }

}
