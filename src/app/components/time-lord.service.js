'use strict';

export class TimeLord {
  constructor ($q, $window, $log, $http, $localStorage) {
    'ngInject';


    let service = {
      todaysDate: Date.now(),

      check: function () {

        

        // compare dates between 
      },

      remember: function () {
        $localStorage.remember = this.todaysDate;
      }

    };

    return service;

  }
}
