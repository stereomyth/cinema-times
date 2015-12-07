'use strict';

export class FilmsApi {
  constructor ($log, $resource) {
    'ngInject';

    return $resource(
      'http://www.cineworld.com/api/quickbook/cinemas', {key: 'MY_KEY', callback: 'JSON_CALLBACK'}, {
        jp: {method: 'JSONP', isArray: false}
      }
    );
  }
}
