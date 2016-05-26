'use strict';

angular.module('cineworld')
  .filter('removeType', function() {
    return input => input
      // .replace('(2D) ','')
      // .replace('(3D) ','')
      // .replace('(IMAX) ','')
      // .replace('(IMAX 3-D) ','')
    ;

  })
;
