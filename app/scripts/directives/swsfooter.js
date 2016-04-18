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
        exportCb : '&',
        resetCb : '&',
        deleteCb : '&'
      },
      controller: function($location, $anchorScroll, $scope) {
        this.editMode = $location.url().indexOf('/create') !== -1;
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
        this.export = function() {
          $scope.exportCb();
        };
        this.reset = function() {
          this.editMode = true;
          $scope.resetCb();
        };
        this.delete = function() {
          $scope.deleteCb();
        };
        this.goToTop = function() {
          // TODO: Doesnt work;
          $location.hash('top');
          console.log($anchorScroll());
          $anchorScroll();
        };
      },
      controllerAs: 'vm',
      link: function(scope, element, attrs) {
        if (attrs.cancelCb) { scope.cancelShow = true; }
        if (attrs.editCb) { scope.editShow = true; }
        if (attrs.saveCb) { scope.saveShow = true; }
        if (attrs.exportCb) { scope.exportShow = true; }
        if (attrs.resetCb) { scope.resetShow = true; }
        if (attrs.deleteCb) { scope.deleteShow = true; }
      }
    };
  });
