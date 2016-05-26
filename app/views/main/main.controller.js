
  'use strict';

  angular.module('cineworld')
    .controller('MainController', function($scope, $log, $localStorage, Res, Films) {

      // TimeLord.check();

      $scope.options = $localStorage.options;

      Res.get('cinemas', {cinema: null}).then(cinemas => { $scope.cinemas = cinemas; });

      let getFilms = () => {
        Films.get().then(films => { $scope.films = films; });
      };

      if ($scope.options.cinema) {
        getFilms();
      } else {
        $scope.showOptions = true;
      }

      $scope.selectCinema = () => {
        delete $localStorage.films;
        getFilms();
      };

      $scope.clearAll = () => {
        $localStorage.$reset();
      };

      $scope.clearApi = () => {
        delete $localStorage.films;
        delete $localStorage.cinemas;
      };

      $scope.clearHidden = () => {
        $localStorage.options.hidden = [];
      };

    }
  );


