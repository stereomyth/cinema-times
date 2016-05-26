'use strict';

angular.module('cineworld')
  .factory('Res', function ($q, $log, $localStorage, moment, Api) {
    return {

      get: function (action, extParams) {

        return $q(function (resolve, reject) {
          if ($localStorage[action]) {
            $log.debug('local', action);
            resolve($localStorage[action]);
          } else {
            $log.debug('remote', action);
            let params = angular.extend({route: action }, extParams);

            Api.get(params, function (response) {
              $localStorage[action] = response[action];
              $localStorage.stamps[action] = moment();
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
