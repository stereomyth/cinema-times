'use strict';

angular.module('gulp-angular')
  .factory('Res', function ($q, $log, $localStorage, moment, Api) {
    return {

      get: function (action, route) {
        route = route || action;

        return $q(function (resolve, reject) {
          if ($localStorage[action]) {
            $log.debug('local', action);
            resolve($localStorage[action]);
          } else {
            $log.debug('remote', action);

            Api[action](function (response) {
              $localStorage[action] = response[route];
              resolve(response[route]);
            }, function (error) {
              reject(error);
            });
          }

        });

      }

    };
  })
;
