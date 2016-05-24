'use strict';

angular.module('gulp-angular')
  .factory('Res', function ($q, $log, $localStorage, moment, Api) {
    return {

      get: function (action) {

        return $q(function (resolve, reject) {

          if ($localStorage[action]) {
            $log.debug('local', action);
            resolve($localStorage[action]);
          } else {
            $log.debug('remote', action);

            Api[action](function (response) {
              $localStorage[action] = response[action];
              resolve(response[action]);
            }, function (error) {
              reject(error);
            });
          }

        });

      }

    };
  })
;
