'use strict';

/**
 * @ngdoc service
 * @name fichasStarWarsApp.dataManager
 * @description
 * # dataManager
 * Factory in the fichasStarWarsApp.
 */
angular.module('fichasStarWarsApp')
  .factory('dataManager', function ($http) {
    var http = $http;

    // Public API here
    return {
      getSheetIndex: function () {
          return http.get('/mockFiles/sheetsIndex.json');
        },
      getSheet: function (sheet) {
        sheet  = {};
          return http.get('/mockFiles/sheet1.json');
      }
    };
  });
