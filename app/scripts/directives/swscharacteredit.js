'use strict';

/**
 * @ngdoc directive
 * @name fichasStarWarsApp.directive:characterEdit
 * @description
 * # characterEdit
 */
angular.module('fichasStarWarsApp')
  .directive('swsCharacterEdit', function () {
    return {
      templateUrl: 'scripts/directives/swscharacteredit.tpl.html',
      restrict: 'E',
      controller: function($scope, swsc, $rootScope) {
        var vmSheet = this;
        var totalHabPts = 0;

        this.removeHabPts = function() {
          totalHabPts -= 4;
          this.habPts = calcHabPoints(this.character);
          this.desPts += 1;
        };
        this.addHabPts = function() {
          totalHabPts += 4;
          this.habPts = calcHabPoints(this.character);
          this.desPts -= 1;
        };
        this.changeSensitive = function() {
          if (this.character.sensitive) {
            this.character.forcePts = 8;
            this.desPts = calcDesPoints(vmSheet.character);
          } else {
            this.character.forcePts = 4;
            this.desPts = calcDesPoints(vmSheet.character);
          }
        };
        this.changeAttr = function(character) {
            calcDesPoints(character);
            var att = character.attributes;
            this.character.attributes.foBase = swsc.calcFO(att.for[0], character.scale);
            this.character.attributes.fdBase = swsc.calcFD(att.for[0], character.scale);
            this.character.attributes.ini = swsc.calcIni(att.des[0], att.per[0]);
            this.character.attributes.mov = swsc.calcMov(att.des[0], att.per[0]);
            this.character.healthAndFatigue = swsc.calcHaF(att.for[0], att.des[0]);
        };
        this.changeHab = function(character) {
          this.habPts = calcHabPoints(character);
        };
        var calcDesPoints = function(character) {
          var points = 10;
          if (character.sensitive) {--points;}
          var totalAttr = swsc.usedAttrPoints(character.attributes);

          points = points - totalAttr;
          if (vmSheet.hasOwnProperty('desPts')) {vmSheet.desPts = points;}
          return points;
        };
        var calcHabPoints = function(character) {
          return totalHabPts - swsc.usedHabPoints(character);
        };

        this.character = swsc.create($scope.ch);
        this.habPts = calcHabPoints(this.character);
        this.desPts = calcDesPoints(this.character);
      },
      controllerAs: 'vmSheet'
    };
  });
