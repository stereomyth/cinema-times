export class MainController {
  constructor ($scope, $log, Api, $localStorage, $filter, TimeLord, moment) {
    'ngInject';

    TimeLord.check();

    $scope.clean = true;

    $scope.cinema = $localStorage.cinema || {};
    if (!$localStorage.hidden) {
      $localStorage.hidden = {};
    }
    $scope.hidden = $localStorage.hidden;

    Api.cinemas().then(function (response) {
      $scope.cinemas = response;
    });

    let getFilms = function () {
      Api.films().then(function (films) {

        for (let edi in $scope.hidden) {
          let film = $filter('filter')(films, {edi: parseInt(edi)}, true)[0];

          if (film) {
            film.hidden = $scope.hidden[edi];
          } else {
            $log.debug('removed old film from hidden list');
            delete $scope.hidden[edi];
          }
        }

        $scope.films = films;
      });
    };

    if ($localStorage.cinema) {
      getFilms();
    }

    $scope.saveCinema = function () {
      $localStorage.cinema = $scope.cinema;
      getFilms();
    };

    $scope.clearAll = function () {
      $localStorage.$reset();
    };

    $scope.clearApi = function () {
      // loop list of saved api data
    };

    $scope.clearHidden = function () {
      $localStorage.hidden = {};
    };

  }

  exampleFunction() {
    //function 
  }

}
