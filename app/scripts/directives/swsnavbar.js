'use strict';

/**
 * @ngdoc directive
 * @name fichasStarWarsApp.directive:SwsNavbar
 * @description
 * # SwsNavbar
 */
angular.module('fichasStarWarsApp')
  .directive('swsNavbar', function () {

    return {
      templateUrl: 'scripts/directives/swsnavbar.tpl.html',
      restrict: 'E',
      scope: {},
      controller: function($location, $routeParams, $scope, $rootScope, dataManager, _) {
        var vmNavbar = this;
        this.loadedSheet = 0;
        this.sheets = [];
        $scope._ = _;

        this.isLoaded = function (sheetId) {
          return sheetId === $routeParams.sheetId;
        };
        this.isActive = function (viewLocation) {
          return $scope._.startsWith($location.path(), viewLocation);
        };

        this.refreshMenu = function() {
          dataManager.getList().then(
            function(success) {
              vmNavbar.sheets = success.data;
              // TODO: Load the first sheet automatically;
            },
            function(error) {
              console.log(error);
            }
          );
        };

        $rootScope.$on('refreshMenu', function() {
          vmNavbar.refreshMenu();
        });

        this.refreshMenu();
      },
      controllerAs: 'vmNavbar'
    };
  });
