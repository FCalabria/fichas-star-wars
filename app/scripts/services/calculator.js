'use strict';

/**
* @ngdoc service
* @name fichasStarWarsUtils.calculator
* @description
* # calculator
* Factory in the fichasStarWarsUtils.
*/
angular.module('starWarsCharacter')
.factory('swsCalculator', function (_) {
  //First dest, then perc
  var initMap = {
    '-2' : {'-2' : -2, '-1' : -1, '0' : -1, '1' : 0, '2' : 0, '3' : 1, '4' : 1},
    '-1' : {'-2' : -1, '-1' : -1, '0' : 0, '1' : 0, '2' : 1, '3' : 1, '4' : 1},
    '0' : {'-2' : -1, '-1' : 0, '0' : 0, '1' : 1, '2' : 1, '3' : 1, '4' : 2},
    '1' : {'-2' : 0, '-1' : 0, '0' : 1, '1' : 1, '2' : 1, '3' : 2, '4' : 2},
    '2' : {'-2' : 0, '-1' : 1, '0' : 1, '1' : 1, '2' : 2, '3' : 2, '4' : 3},
    '3' : {'-2' : 1, '-1' : 1, '0' : 1, '1' : 2, '2' : 2, '3' : 3, '4' : 3},
    '4' : {'-2' : 1, '-1' : 1, '0' : 2, '1' : 2, '2' : 3, '3' : 3, '4' : 4},
  };
  //First dest, then perc
  var movMap = {
    '-2' : {'-2' : 3, '-1' : 3, '0' : 4, '1' : 4, '2' : 4, '3' : 5, '4' : 5},
    '-1' : {'-2' : 3, '-1' : 4, '0' : 5, '1' : 5, '2' : 5, '3' : 6, '4' : 6},
    '0' : {'-2' : 4, '-1' : 5, '0' : 6, '1' : 6, '2' : 6, '3' : 7, '4' : 7},
    '1' : {'-2' : 4, '-1' : 5, '0' : 6, '1' : 6, '2' : 7, '3' : 7, '4' : 7},
    '2' : {'-2' : 4, '-1' : 5, '0' : 6, '1' : 7, '2' : 7, '3' : 8, '4' : 8},
    '3' : {'-2' : 5, '-1' : 6, '0' : 7, '1' : 7, '2' : 8, '3' : 8, '4' : 8},
    '4' : {'-2' : 5, '-1' : 6, '0' : 7, '1' : 7, '2' : 8, '3' : 8, '4' : 9},
  };
  //First fort, then range
  var HaFPointsMap = {
    '-2' : [3, 1, 1, 1, 1],
    '-1' : [3, 2, 1, 1, 1],
    '0' : [3, 2, 2, 1, 1],
    '1' : [4, 2, 2, 1, 1],
    '2' : [4, 2, 2, 2, 1],
    '3' : [4, 3, 2, 2, 1],
    '4' : [4, 3, 2, 1, 1],
  };
  //First dest, then range
  var HaFTrackFromMap = {
    '-2' : [1, 3, 5, 6, 7],
    '-1' : [1, 3, 5, 7, 8],
    '0' : [1, 3, 5, 7, 9],
    '1' : [1, 4, 6, 8, 10],
    '2' : [1, 4, 7, 9, 11],
    '3' : [1, 4, 7, 10, 12],
    '4' : [1, 4, 7, 10, 12]
  };
  var getHaFPoints = function(HaFArray, fort) {
    for(var i in HaFArray) {
      HaFArray[i].points = HaFPointsMap[fort][i];
    }
    return HaFArray;
  };
  var getHaFRange = function(HaFArray, des) {
    for(var i in HaFArray) {
      HaFArray[i].trackingFrom = HaFTrackFromMap[des][i];
    }
    for (var j = 0; j < HaFArray.length - 1; j++) {
      HaFArray[j].trackingTo = HaFArray[j+1].trackingFrom - 1;
    }
    return HaFArray;
  };
  var calcBaseHab = function(character, attribute) {
    _.forEach(character.habilities[attribute], function(value, key) {
      if (character.attributes[attribute] && _.isFinite(character.attributes[attribute][0])) {
        value[0] = character.attributes[attribute][0] - 2;
      } else {
        value[0] = -2;
      }
    });
    return character;
  };
  var calcFO = function(fort, scale) {
    return fort + scale;
  };
  var calcFD = function(fort, scale) {
    return fort + scale;
  };
  var calcIni = function(des, per) {
    return initMap[des][per];
  };
  var calcMov = function(des, per) {
    return movMap[des][per];
  };
  var calcHaF = function(fort, des) {
    var HaF = [{}, {}, {}, {}, {}];
    HaF = getHaFRange(HaF, des);
    HaF = getHaFPoints(HaF, fort);
    return HaF;
  };
  return {
    getHaFPoints: getHaFPoints,
    getHaFRange: getHaFRange,
    calcBaseHab: calcBaseHab,
    calcFO: calcFO,
    calcFD: calcFD,
    calcIni: calcIni,
    calcMov: calcMov,
    calcHaF: calcHaF
  };
});
