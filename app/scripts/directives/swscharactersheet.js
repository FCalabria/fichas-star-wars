'use strict';

/**
 * @ngdoc directive
 * @name fichasStarWarsApp.directive:characterSheet
 * @description
 * # characterSheet
 */
angular.module('fichasStarWarsApp')
  .directive('swsCharacterSheet', function () {
    return {
      scope: {
        ch: '=character'
      },
      templateUrl: 'scripts/directives/swscharactersheet.tpl.html',
      restrict: 'E',
      controller: function() {
        this.defaultPic = 'http://dontforgetatowel.com/wp-content/uploads/2014/06/Star-Wars-propaganda-leia-poster.jpg';
      },
      controllerAs: 'vm'
    };
  });
