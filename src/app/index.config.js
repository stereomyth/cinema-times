'use strict';

export function config ($logProvider, $httpProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $httpProvider.interceptors.push('dotInjector');

}
