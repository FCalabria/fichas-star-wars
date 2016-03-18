'use strict';

/**
* @ngdoc function
* @name fichasStarWarsApp.controller:ImportCtrl
* @description
* # ImportCtrl
* Controller of the fichasStarWarsApp
*/
angular.module('fichasStarWarsApp')
.controller('ImportCtrl', function (
  dataManager,
  $location,
  $rootScope,
  $scope
) {
  this.uploadFile = function(file, errFiles) {
    if (file) {
      dataManager.importSheet(file).then(function (response) {
        $rootScope.$emit('refreshMenu');
        $location.path('/list/' + response.data.id);
      });
    }
  }
});
