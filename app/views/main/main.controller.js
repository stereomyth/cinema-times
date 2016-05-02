
  'use strict';

  angular.module('gulp-angular')
    .controller('MainController', function($scope, $log, $localStorage, Res, Films) {

      // TimeLord.check();

      // $scope.clean = true;

      $scope.all = true;

      $scope.options = $localStorage.options;
      // $localStorage.general = $localStorage.general || {};

      Res.get('cinemas').then(cinemas => { $scope.cinemas = cinemas; });

      let getFilms = () => {
        Films.get({cinema: $scope.options.cinema})
          .then(films => { $scope.films = films; });
      };

      if ($scope.options.cinema) {
        getFilms();
      } else {
        $scope.showOptions = true;
      }

      // let getFilms = () => {
      //   Api.get('films').then(films => {

      //     for (let edi in $scope.hidden) {
      //       let film = $filter('filter')(films, {edi: parseInt(edi)}, true)[0];

      //       if (film) {
      //         film.hidden = $scope.hidden[edi];
      //       } else {
      //         $log.debug('removed old film from hidden list');
      //         delete $scope.hidden[edi];
      //       }
      //     }

      //     $scope.films = films;
      //   });
      // };

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


