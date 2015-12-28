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
      scope: {
        ch: '=character'
      },
      templateUrl: 'scripts/directives/swscharacteredit.tpl.html',
      restrict: 'E',
      controller: function($scope, swsc, $rootScope) {
        var vm = this;

        this.removeHabPts = function() {
          this.habPts = this.habPts - 4;
          this.desPts = this.desPts + 1;
        };
        this.addHabPts = function() {
          this.habPts = this.habPts + 4;
          this.desPts = this.desPts - 1;
        };
        this.changeSensitive = function() {
          if (this.character.sensitive) {
            this.character.forcePts = 8;
            this.desPts = calcDesPoints(vm.character);
          } else {
            this.character.forcePts = 4;
            this.desPts = calcDesPoints(vm.character);
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

        var calcDesPoints = function(character) {
          var points = 10;
          if (character.sensitive) {--points;}
          var totalAttr = character.attributes.des[0] +
                          character.attributes.mec[0] +
                          character.attributes.tec[0] +
                          character.attributes.con[0] +
                          character.attributes.for[0] +
                          character.attributes.per[0];
          points = points - totalAttr;
          if (vm.hasOwnProperty('desPts')) {vm.desPts = points;}
          return points;
        };
        var saveSheet = function() {
          console.log(vm.character);
        };

        this.character = swsc.create($scope.ch);
        this.habPts = 0;
        this.desPts = calcDesPoints(this.character);

        $rootScope.$on('save', function() {
          saveSheet();
        });
      },
      controllerAs: 'vm'
    };
  });
