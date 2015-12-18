/* globals apiKey */
'use strict';

// stupid api interface I had to build because the Cineworld Api doesn't
// accept JSONP functions with dots in and Angular always uses dots. 
export class FilmsApi {
  constructor ($q, $window, $log, $http, $localStorage, moment) {
    'ngInject';

    return {

      callBackList: [],

      cinemas: function () {
        let self = this;

        return $q(function (resolve, reject) {
          self.get('cinemas').then(function (response) {
            resolve(response);
          }, function (response) {
            reject(response);
          });
        });
      },

      films: function () {
        let self = this;

        return $q(function (resolve, reject) {
          self.get('films', {full: true, date: moment().format('YYYYMMDD')})
            .then(function (response) {
              resolve(response);
            }, function (response) {
              reject(response);
            });
        });
      },

      shows: function (film) {
        let self = this;

        return $q(function (resolve, reject) {
          let params = {film: film, date: moment().format('YYYYMMDD')};

          self.get('performances', params, film + '-shows', true)
            .then(function (response) {
              resolve(response);
            }, function (response) {
              reject(response);
            });
        });
      },

      get: function (route, params, label, temporary) {
        let self = this;

        return $q(function (resolve, reject) {
            label = label || route;

            if ($localStorage[label]) {
              
              // if local exists use local
              $log.debug('local', label);
              resolve($localStorage[label]);

            } else {

              // otherwise hit api
              self.remote(route, params).then(function (response) {

                if (Object.keys(response)[0] === 'errors') {
                  $log.debug('api error', response.errors);
                  reject(response);
                } else {
                  let json = self.letterOpener(response);
                  $localStorage[label] = json;
                  if (temporary) {
                    $localStorage.temp.push(label);
                  }
                  resolve(json);
                }
              }, function (response) {
                reject(response);
              });

            }
        });
      },

      remote: function (route, params) {
        let self = this;

        return $q(function(resolve, reject) {
          let api, slotNum, callBackName, config;

          $log.debug('remote', route);

          api = 'http://www.cineworld.com/api/quickbook/' + route;
          slotNum = self.findSlot();
          callBackName = 'apiCallback' + slotNum;
          config = {
            params: {
              key: apiKey, 
              cinema: $localStorage.cinema,
              callback: callBackName
            }
          };

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
              // $log.debug('http success', response);
            }, function (response) {
              // currently always errors with 404 but still returns JSONP?
              reject();
              // $log.debug('http error', response);
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
      },

    };

  }
}
