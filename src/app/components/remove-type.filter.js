'use strict';

export function RemoveTypeFilter() {
  'ngInject';

  return function (input) {
    return input
      .replace('2D -','')
      .replace('3D -','')
      .replace('IMAX ','')
      .replace('IMAX 3D -','');
  };
}
