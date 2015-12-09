export class MainController {
  constructor ($scope, $log, Api, $localStorage, $filter) {
    'ngInject';

    $scope.clean = true;

    $scope.cinema = $localStorage.cinema || {};
    $scope.hidden = $localStorage.hidden || {};

    Api.get('cinemas').then(function (response) {
      $scope.cinemas = response;
    });

    Api.get('films', {date: 20151210, full: true}).then(function (films) {

      for (let edi in $scope.hidden) {
        // $log.debug(edi);
        let film = $filter('filter')(films, {edi: parseInt(edi)}, true)[0];
        // $log.debug(film);
        if (film) {
          film.hidden = $scope.hidden[edi];
        } else {
          $log.debug('removed old film from hidden list');
          delete $scope.hidden[edi];
        }
      }

      $scope.films = films;
    });

    $scope.saveCinema = function () {
      $localStorage.cinema = $scope.cinema;
    };

  }

  exampleFunction() {
    //function 
  }

}
