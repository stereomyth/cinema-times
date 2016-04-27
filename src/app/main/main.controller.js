export class MainController {
  constructor ($scope, $log, Api, $localStorage, $filter, TimeLord) {
    'ngInject';

    TimeLord.check();

    $scope.clean = true;

    $scope.cinema = $localStorage.cinema || {};
    if (!$localStorage.hidden) {
      $localStorage.hidden = {};
    }
    $scope.hidden = $localStorage.hidden;

    Api.get('cinemas').then(response => {
      $scope.cinemas = response.cinemas;
    });

    let getFilms = () => {
      Api.get('films').then(films => {

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

    $scope.saveCinema = () => {
      $localStorage.cinema = $scope.cinema;
      getFilms();
    };

    $scope.clearAll = () => {
      $localStorage.$reset();
    };

    $scope.clearApi = () => {
      // loop list of saved api data
    };

    $scope.clearHidden = () => {
      $localStorage.hidden = {};
    };

  }

}
