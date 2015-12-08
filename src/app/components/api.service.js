/* globals apiKey */
'use strict';

// stupid api interface I had to build because the Cineworld Api doesn't
// accept JSONP functions with dots in and Angular always uses dots. 
export class FilmsApi {
  constructor ($q, $window, $log, $http) {
    'ngInject';

    return {

      list: [],

      get: function (route, params) {
        let self = this;
        return $q(function(resolve, reject) {
          let api = 'http://www.cineworld.com/api/quickbook/' + route,
            slotNum = self.findSlot(),
            name = 'apiCallback' + slotNum,
            config = {params: {key: apiKey, callback: name}};

          Object.assign(config.params, params);

          // create global function to catch JSONP function
          $window[name] = function (json) {
            resolve(json);

            // set slot to free
            self.list[slotNum] = true;

            // kill function after use
            delete $window[name];
          };

          // http request to api endpoint
          $http.jsonp(api, config)
            .then(function (response) {
              $log.debug('http success', response);
            }, function (response) {
              // currently always errors with 404 but still returns JSONP?
              // reject();
              // $log.debug('http error', response);
            });

        });
      },

      findSlot: function () {
        // find next open slot for global function 
        
        let nextFreeSlot = this.list.findIndex(function (e) { return e; });

        if (nextFreeSlot === -1) {
          nextFreeSlot = this.list.length;
          this.list.push(false);
        } else {
          this.list[nextFreeSlot] = false;
        }

        return nextFreeSlot;
      }

    };

  }
}
