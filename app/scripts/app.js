'use strict';

/**
 * @ngdoc overview
 * @name fichasStarWarsApp
 * @description
 * # fichasStarWarsApp
 *
 * Main module of the application.
 */
 var app = angular.module('fichasStarWarsApp', [
   'ngAnimate',
   'ngCookies',
   'ngResource',
   'ngRoute',
   'ngSanitize',
   'ngTouch',
   'ngFileUpload',
   'ui.bootstrap',
   'angular-repeat-n',
   'pascalprecht.translate',
   'starWarsCharacter'
 ]);
  app.constant('_', window._)
  .config(function ($routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/create/blank', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        controllerAs: 'vm'
      })
      .when('/create/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl',
        controllerAs: 'vm'
      })
      .when('/list/:sheetId?', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/create/blank'
      });
  })
  .config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'language/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('es');
  });
