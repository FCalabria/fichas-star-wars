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
    var urlBase = '/api/sheets';

    // Public API here
    return {
      getList: function () {
          return http.get( urlBase + '/list');
        },
      getSheet: function (sheet) {
        sheet  = {'id' : '1'};
          return http.get(urlBase + '/' + sheet.id);
      }
    };
  });
