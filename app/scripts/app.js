'use strict';

/**
 * @ngdoc overview
 * @name fichasStarWarsApp
 * @description
 * # fichasStarWarsApp
 *
 * Main module of the application.
 */
angular
  .module('fichasStarWarsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-repeat-n',
    'pascalprecht.translate',
    'starWarsCharacter'
  ])
  .constant('_', window._)
  .config(function ($routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        controllerAs: 'vm'
      })
      .when('/list/:sheetId?', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/create'
      });
  })
  .config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'language/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('es');
  });
