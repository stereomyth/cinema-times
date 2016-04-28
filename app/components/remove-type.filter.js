'use strict';

angular.module('gulp-angular')
  .filter('removeType', function() {
    return input => input
      // .replace('(2D) ','')
      // .replace('(3D) ','')
      // .replace('(IMAX) ','')
      // .replace('(IMAX 3-D) ','')
    ;

  })
;
