'use strict';

/**
* @ngdoc function
* @name fichasStarWarsApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the fichasStarWarsApp
*/
angular.module('fichasStarWarsApp')
.controller('ListCtrl', function (dataManager, $routeParams, $scope, swsc) {
  var vm = this;
  $scope.ch = {};
  this.editMode = false;
  if($routeParams.sheetId) {
    dataManager.getSheet({'id': $routeParams.sheetId}).then(
      function(success) {
        $scope.ch = success.data;
      }
    );
  }

  this.editSheet = function() {
    this.editMode = true;
    this.resetSheet();
  };

  this.saveSheet = function() {
    dataManager.saveSheet($scope.vmSheet.character).then(function(succ) {
      $scope.ch = succ.data;
      vm.editMode = false;
    }, function(error) {
      console.log(error);
    });
  };

  this.cancelSheet = function() {
    this.editMode = false;
  };

  this.resetSheet = function() {
    $scope.vmSheet.character = angular.copy(swsc.create($scope.ch));
  };
});
