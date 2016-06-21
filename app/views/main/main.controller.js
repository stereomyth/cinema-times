'use strict';

angular.module('cineworld')
  .controller('MainController', function($scope, $log, $localStorage, Res, Films, Shows) {

    $scope.options = $localStorage.options;

    Res.get('cinemas', {cinema: null}).then(cinemas => { $scope.cinemas = cinemas; });

    let getFilms = () => {
      Films.get().then(films => {
        $scope.films = films;
        Shows.get();
      });
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

    $scope.$watch('options.panel', function (panel) {
      $scope.filter = panel === 'today' ? {today: true} : '';
    });

    let hidden = $localStorage.options.hidden;

    $scope.objl = obj => Object.keys(obj).length;

    let remove = (film, type) => {
        hidden.splice(hidden.findIndex(element => element === film.types[type].edi), 1);
    };

    $scope.toggleHidden = film => {
      if (film.hidden) {
        for (let type in film.types) {
          remove(film, type);
        }
        film.hidden = !film.hidden;
        Shows.film(film);
      } else {
        for (let type in film.types) {
          hidden.push(film.types[type].edi);
        }
        film.hidden = !film.hidden;
      }
    };

  })
;
