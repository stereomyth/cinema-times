
  'use strict';

  angular.module('gulp-angular')
    .controller('MainController', function($scope, $log, $localStorage, Res, Films) {

      // TimeLord.check();

      // $scope.clean = true;

      $scope.options = $localStorage.options = $localStorage.options || {hidden: []};
      // $localStorage.general = $localStorage.general || {};

      Res.get('cinemas').then(cinemas => $scope.cinemas = cinemas);

      Films.get().then(films => {
        $scope.films = films;
      });




      // $log.debug(Api.get('cinemas').then(response => {
        // $scope.cinemas = response.cinemas;
      // });

      // Api.get('films').then(response => {
      //   $scope.films = response.films;
      // });


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

      // if ($localStorage.options.cinema) {
      //   getFilms();
      // }

      $scope.saveCinema = () => {
        // $localStorage.options.cinema = $scope.options.cinema;
        // getFilms();
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
  );


