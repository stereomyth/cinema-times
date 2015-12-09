import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { FilmDirective } from '../app/components/film/film.directive';
import { FilmsApi } from '../app/components/api.service';

angular.module('cineworld', [
    'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ngStorage'
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('film', FilmDirective)
  .service('Api', FilmsApi)
;
