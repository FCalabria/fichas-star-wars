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
      controller: function($location, dataManager, $routeParams, $scope, _) {
        this.loadedSheet = 0;
        this.sheets = [];
        $scope._ = _;
        var vm = this;
        dataManager.getSheetIndex().then(
          function(success) {
            vm.sheets = success.data;
            // TODO: Load the first sheet automatically;
          },
          function(error) {
            console.log(error);
          }
        );
        this.isLoaded = function (sheetId) {
          return sheetId === $routeParams.sheetId;
        };
        this.isActive = function (viewLocation) {
          return $scope._.startsWith($location.path(), viewLocation);
        };
      },
      controllerAs: 'vm'
    };
  });
