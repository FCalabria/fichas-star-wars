'use strict';

/**
 * @ngdoc directive
 * @name fichasStarWarsApp.directive:swsFooter
 * @description
 * # swsFooter
 */
angular.module('fichasStarWarsApp')
  .directive('swsFooter', function () {
    return {
      templateUrl: 'scripts/directives/swsfooter.tpl.html',
      restrict: 'E',
      scope: {
        saveCb : '&',
        cancelCb : '&',
        editCb : '&',
        resetCb : '&'
      },
      controller: function($location, $anchorScroll, $scope) {
        this.editMode = $location.url() === '/create';
        this.edit = function() {
          this.editMode = true;
          $scope.editCb();
        };
        this.save = function() {
          this.editMode = false;
          $scope.saveCb();
        };
        this.cancel = function() {
          this.editMode = false;
          $scope.cancelCb();
        };
        this.reset = function() {
          this.editMode = true;
          $scope.resetCb();
        };
        this.goToTop = function() {
          // TODO: Doesnt work;
          $location.hash('top');
          console.log($anchorScroll());
          $anchorScroll();
        };
      },
      controllerAs: 'vm'
    };
  });
