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
        $log.debug('getting', route);
        let self = this;
        return $q(function (resolve, reject) {

            if ($localStorage[route]) {
              
              // if local exists use local
              $log.debug('local', route);
              resolve($localStorage[route]);

            } else {

              // otherwise hit api
              self.remote(route, params).then(function (response) {
                let json = self.letterOpener(response);
                resolve(json);
                $localStorage[route] = json;
              }, function (response) {
                reject(response);
              });

            }
        });
      },

      remote: function (route, params) {
        let self = this;
        return $q(function(resolve, reject) {
          $log.debug('remote', route);
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
      },

      letterOpener: function (json) {
        // remove wrapping object
        return json[Object.keys(json)[0]];
      }

    };

  }
}
