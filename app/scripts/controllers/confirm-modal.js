'use strict';

angular.module('fichasStarWarsApp')
.controller('ConfirmModalCtrl', function ($uibModalInstance) {
  this.ok = function() {
    $uibModalInstance.close();
  };

  this.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
