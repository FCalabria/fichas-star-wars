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
    var sheetsUrl = '/api/sheets';

    // Public API here
    return {
      getList: function () {
          return http.get(sheetsUrl + '/list');
        },
      getSheet: function (sheet) {
          return http.get(sheetsUrl + '/' + sheet.id);
      },
      saveSheet: function(sheet) {
        if (sheet.id) {
          return http.put(sheetsUrl, sheet);
        } else {
          return http.post(sheetsUrl, sheet);
        }
      },
      deleteSheet: function(sheetId) {
        return http.delete(sheetsUrl + '/' + sheetId);
      },
      importSheet: function(file) {
        return http.post(sheetsUrl + '/import', file);
      },
      exportSheet: function(sheetId) {
        return http.get(sheetsUrl + '/export/' + sheetId);
      }
    };
  });
