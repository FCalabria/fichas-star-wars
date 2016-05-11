'use strict';

/**
 * @ngdoc directive
 * @name fichasStarWarsApp.directive:characterEdit
 * @description
 * # characterEdit
 */
angular.module('fichasStarWarsApp')
  .directive('swsCharacterEdit', function (_) {
    return {
      templateUrl: 'scripts/directives/swscharacteredit.tpl.html',
      restrict: 'E',
      scope: {
        ch: '=character'
      },
      controller: function($scope, $http, swsc) {
        var vmSheet = this;
        var totalHabPts = 0;
        var lastValidCharacter = swsc.create({});
        $scope.$watch('ch', function(newValue, oldValue) {
          if ((typeof newValue !== 'undefined' && typeof oldValue === 'undefined') || (_.isEmpty(newValue) && typeof newValue === 'object')) {
            init();
          }
        });

        this.removeHabPts = function() {
          totalHabPts -= 4;
          this.habPts = calcHabPoints($scope.ch);
          this.desPts += 1;
        };
        this.addHabPts = function() {
          totalHabPts += 4;
          this.habPts = calcHabPoints($scope.ch);
          this.desPts -= 1;
        };
        this.changeSensitive = function() {
          hasEnoughPoints();
          if ($scope.ch.sensitive) {
            $scope.ch.forcePts = 8;
            this.desPts = calcDesPoints($scope.ch);
          } else {
            $scope.ch.forcePts = 4;
            this.desPts = calcDesPoints($scope.ch);
          }
        };
        this.changeAttr = function() {
          hasEnoughPoints();
          var att = $scope.ch.attributes;
          this.desPts = calcDesPoints($scope.ch);
            $scope.ch.attributes.foBase[0] = swsc.calcFO(att.for[0], $scope.ch.scale);
            $scope.ch.attributes.fdBase[0] = swsc.calcFD(att.for[0], $scope.ch.scale);
            $scope.ch.attributes.ini[0] = swsc.calcIni(att.des[0], att.per[0]);
            $scope.ch.attributes.mov[0] = swsc.calcMov(att.des[0], att.per[0]);
            $scope.ch.healthAndFatigue = swsc.calcHaF(att.for[0], att.des[0]);
            $scope.ch = swsc.calcBaseHab($scope.ch, 'des');
            $scope.ch = swsc.calcBaseHab($scope.ch, 'con');
            $scope.ch = swsc.calcBaseHab($scope.ch, 'mec');
            $scope.ch = swsc.calcBaseHab($scope.ch, 'per');
            $scope.ch = swsc.calcBaseHab($scope.ch, 'for');
            $scope.ch = swsc.calcBaseHab($scope.ch, 'tec');
            $scope.ch = swsc.calcBaseHab($scope.ch, 'force');
          };
        this.changeHab = function() {
          hasEnoughPoints();
          this.habPts = calcHabPoints($scope.ch);
        };
        this.addSpecial = function(field) {
          $scope.ch[field].push({
            name : '',
            description : '',
            effect : ['', 0],
            cost : 0
          });
        };
        this.deleteSpecial = function(field, data) {
          var array = $scope.ch[field];
          var i = _.findIndex(array, function(toCompare) {
            return _.isEqual(toCompare, data);
          });
          if (i !== -1) {
            array.splice(i, 1);
            $scope.ch = swsc.assignSpecialPoints($scope.ch);
          }
        };
        this.changeSpecial = function() {
          hasEnoughPoints();
          this.desPts = calcDesPoints($scope.ch);
          $scope.ch = swsc.assignSpecialPoints($scope.ch);
        };
        this.addWeapon = function() {
          $scope.ch.weapons.push({
            name: '',
            fo: 0,
            range: [0, 0, 0, 0],
            notes: ''
          });
        };
        this.addArmour = function() {
          $scope.ch.armour.push({
            name : '',
            notes : '',
            fd: 0
          });
        };
        this.addEquipment = function() {
          $scope.ch.equipment.push({
            name : '',
            description : ''
          });
        };
        this.deleteEquipment = function(group, toDelete) {
          var i = _.findIndex($scope.ch[group], toDelete);
          if (i !== -1) { $scope.ch[group].splice(i, 1); }
        };
        var calcDesPoints = function(character) {
          if (character.sensitive) {--points;}
          var totalAttr = swsc.usedAttrPoints(character.attributes);
          var totalSpecial = swsc.usedSpecialPoints(character.raceChar, character.gifts, character.defaults);
          return 10 - totalAttr - totalSpecial - Math.ceil(vmSheet.habPts/4);
        };
        var calcHabPoints = function(character) {
          return totalHabPts - swsc.usedHabPoints(character);
        };
        var hasEnoughPoints = function () {
          if (calcHabPoints($scope.ch) < 0 || calcDesPoints($scope.ch) < 0) {
            $scope.ch = _.cloneDeep(lastValidCharacter);
          } else {
            lastValidCharacter = _.cloneDeep($scope.ch);
          }
        };
        var getAttrAndHab = function() {
           $http.get('./scripts/directives/attributes-list.json').then(
            function(attributes) {
              $http.get('./scripts/directives/habilities-list.json').then(
                function(habilities) { vmSheet.attributesAndHabilities = _.concat(attributes.data, habilities.data); }
              );
            }
          ).catch(
            function(error) { console.log(error.data); }
          );
        }

        var init = function() {
          $scope.ch = swsc.create($scope.ch);
          hasEnoughPoints();
          vmSheet.habPts = calcHabPoints($scope.ch);
          vmSheet.desPts = calcDesPoints($scope.ch);
          getAttrAndHab();
        }

      },
      controllerAs: 'vmSheet'
    };
  });
