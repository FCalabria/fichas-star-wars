'use strict';

/**
 * @ngdoc service
 * @name fichasStarWarsApp.dataManager
 * @description
 * # dataManager
 * Factory in the fichasStarWarsApp.
 */
app.factory('dataManager', function ($http) {
    var http = $http;
    var sheetsUrl = '/api/sheets';

    // Public API here
    return {
      getList: function () {
          return http.get(sheetsUrl + '/list');
        },
      getSheet: function (sheet) {
          return http.get(sheetsUrl + '/' + sheet.id);
      }
    };
  });
