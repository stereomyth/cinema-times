'use strict';

export function DotInjector($log) {
  'ngInject';

  return {
    request: function(config) {
      // config.requestTimestamp = new Date().getTime();
      $log.debug(config);

      return config;
    },
    requestError: function(config) {
      // config.requestTimestamp = new Date().getTime();
      $log.debug(config);

      return config;
    },
    response: function(response) {
      // response.config.responseTimestamp = new Date().getTime();
      $log.debug(response);
      return response;
    },
    responseError: function(response) {
      // response.config.responseTimestamp = new Date().getTime();
      $log.debug(response);
      return response;
    }
  };
}
