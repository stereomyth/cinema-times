/* globals apiKey */
'use strict';

// stupid api interface I had to build because the Cineworld Api doesn't
// accept JSONP functions with dots in and Angular always uses dots. 
export class FilmsApi {
  constructor ($q, $window, $log, $http, $localStorage) {
    'ngInject';

    return {

      callBackList: [],

      get: function (route, params) {
        let self = this;
        return $q(function (resolve, reject) {

            if ($localStorage.route) {
              resolve($localStorage.route);
            } else {
              self.remote(route, params).then(function (response) {
                resolve(response);
                $localStorage.route = response;
              }, function (response) {
                reject(response);
              });
            }
        });
      },

      remote: function (route, params) {
        let self = this;
        return $q(function(resolve, reject) {
          let api = 'http://www.cineworld.com/api/quickbook/' + route,
            slotNum = self.findSlot(),
            callBackName = 'apiCallback' + slotNum,
            config = {params: {key: apiKey, callback: callBackName}};

          Object.assign(config.params, params);

          // create global function to catch JSONP function
          $window[callBackName] = function (json) {
            resolve(json);

            // set slot to free
            self.callBackList[slotNum] = true;

            // kill function after use
            delete $window[callBackName];
          };

          // http request to api endpoint
          $http.jsonp(api, config)
            .then(function (response) {
              $log.debug('http success', response);
            }, function (response) {
              // currently always errors with 404 but still returns JSONP?
              reject();
              $log.debug('http error', response);
            });

        });
      },

      findSlot: function () {
        // find next open slot for global function 
        let list = this.callBackList,
          nextFreeSlot = list.findIndex(function (e) { return e; });

        if (nextFreeSlot === -1) {
          nextFreeSlot = list.length;
          list.push(false);
        } else {
          list[nextFreeSlot] = false;
        }

        return nextFreeSlot;
      }

    };

  }
}
