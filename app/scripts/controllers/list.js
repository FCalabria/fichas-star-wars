'use strict';

/**
* @ngdoc function
* @name fichasStarWarsApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the fichasStarWarsApp
*/
angular.module('fichasStarWarsApp')
.controller('ListCtrl', function (
  dataManager,
  $routeParams,
  $scope,
  $rootScope,
  $location,
  $uibModal,
  swsc
) {
  var vm = this;
  var modalParams = {
    keyboard: false,
    size: 'xs',
    templateUrl: 'modal-confirm.html',
    controller: 'ConfirmModalCtrl as vm'
  };
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

  this.exportSheet = function() {
    dataManager.exportSheet($routeParams.sheetId);
  };

  this.resetSheet = function() {
    $scope.chEdit = angular.copy($scope.ch);
  };

  this.deleteSheet = function() {
    $uibModal.open(modalParams).result.then(
      function() {
        vm.confirmDelete();
      }
    );
  };

  this.confirmDelete = function() {
    dataManager.deleteSheet($routeParams.sheetId).then(function() {
      $rootScope.$emit('refreshMenu');
      $location.path('/create');
    }, function(error) {
      console.log(error);
    });
  };


});
