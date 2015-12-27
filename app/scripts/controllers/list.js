'use strict';

/**
* @ngdoc function
* @name fichasStarWarsApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the fichasStarWarsApp
*/
angular.module('fichasStarWarsApp')
.controller('ListCtrl', function (dataManager, $routeParams) {
  var vm = this;
  if($routeParams.sheetId) {
    this.characterData = {'id': $routeParams.sheetId};
    dataManager.getSheet(this.characterData).then(
      function(success) {
        vm.characterData = success.data;
      }
    );
  }
});
