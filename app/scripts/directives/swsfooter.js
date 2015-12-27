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
      scope: {},
      controller: function($location, $anchorScroll) {
        this.editMode = false;

        this.edit = function() {
          console.log('edit');
          this.editMode = true;
        };
        this.save = function() {
          this.resetForm();
        };
        this.cancel = function() {
          this.resetForm();
        };
        this.goToTop = function() {
          // TODO: Doesnt work;
          $location.hash('top');
          console.log($anchorScroll());
          $anchorScroll();
        };
        this.resetForm = function() {
          this.editMode = false;
        };
      },
      controllerAs: 'vm'
    };
  });
