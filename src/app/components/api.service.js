/* globals apiKey */
'use strict';

// stupid api interface I had to build because the Cineworld Api doesn't
// accept JSONP functions with dots in and Angular always uses dots. 
export class FilmsApi {
  constructor ($q, $window, $log, $http) {
    'ngInject';

    return {
      get: function (name, params) {
        return $q(function(resolve, reject) {
          let api = 'http://www.cineworld.com/api/quickbook/cinemas',
            config = {params: {key: apiKey, callback: name}};

          Object.assign(config.params, params);

          // create global function to catch JSONP function
          $window[name] = function (json) {
            // $log.debug(json);
            resolve(json);

            // kill function after use
            delete $window[name];
          };

          // http request to api endpoint
          $http.jsonp(api, config)
            .then(function (response) {
              // $log.debug('http success');
            }, function (response) {
              reject();
              $log.debug('http error');
            });

        });
      }
    };

  }
}
