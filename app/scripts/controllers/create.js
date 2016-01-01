'use strict';

/**
 * @ngdoc function
 * @name fichasStarWarsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fichasStarWarsApp
 */
angular.module('fichasStarWarsApp')
  .controller('CreateCtrl', function ($scope, $rootScope, $location, dataManager, swsc) {
  $scope.ch = {};

    this.saveSheet = function() {
      dataManager.saveSheet($scope.vmSheet.character).then(function(succ) {
        console.log('saved new with id ' + succ.data.id);
        $rootScope.$emit('refreshMenu');
        $location.path('/list/' + succ.data.id);
      }, function(error) {
        console.log(error);
      });
    };

    this.resetSheet = function() {
      $scope.ch = {};
      $scope.vmSheet.character = swsc.create($scope.ch);
    };

  });
