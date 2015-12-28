'use strict';

/**
 * @ngdoc service
 * @name fichasStarWarsUtils.character
 * @description
 * # character
 * Factory in the fichasStarWarsUtils.
 */
angular.module('starWarsCharacter', [])
  .factory('swsc', function () {
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

    return {
      create: function(charact) {
        charact.player = charact.player || '';
        charact.name = charact.name || '';
        charact.imgUrl = charact.imgUrl || '';
        charact.race = charact.race || '';
        charact.age = charact.age || 0;
        charact.height = charact.height || 0;
        charact.weight = charact.weight || 0;
        charact.scale = charact.scale || 0;
        charact.sensitive = charact.sensitive || false;
        if(charact.sensitive && !charact.hasOwnProperty('forcePts')) {charact.forcePts = 8;}
        charact.FUDGEPts = charact.FUDGEPts || 5;
        charact.forcePts = charact.forcePts || 4;
        charact.darKSidePts = charact.darKSidePts || 0;
        charact.description = charact.description || '';

        charact.attributes = charact.attributes || {};
        charact.attributes.des = charact.attributes.des || [0];
        charact.attributes.con = charact.attributes.con || [0];
        charact.attributes.mec = charact.attributes.mec || [0];
        charact.attributes.per = charact.attributes.per || [0];
        charact.attributes.for = charact.attributes.for || [0];
        charact.attributes.tec = charact.attributes.tec || [0];
        charact.attributes.foBase = this.calcFO(charact.attributes.for[0], charact.scale);
        charact.attributes.fdBase = this.calcFD(charact.attributes.for[0], charact.scale);
        charact.attributes.ini = this.calcIni(charact.attributes.des[0], charact.attributes.per[0]);
        charact.attributes.mov = this.calcMov(charact.attributes.des[0], charact.attributes.per[0]);

        charact.healthAndFatigue = charact.healthAndFatigue || this.calcHaF(charact.attributes.for[0], charact.attributes.des[0]);

        charact.habilities = charact.habilities || {};
        charact.habilities.des = charact.habilities.des || {};
        charact.habilities.con = charact.habilities.con || {};
        charact.habilities.mec = charact.habilities.mec || {};
        charact.habilities.per = charact.habilities.per || {};
        charact.habilities.for = charact.habilities.for || {};
        charact.habilities.tec = charact.habilities.tec || {};
        charact.habilities.force = charact.habilities.force || {};

        return charact;
      },
      calcFO : function(fort, scale) {
        return fort + scale;
      },
      calcFD : function(fort, scale) {
        return fort + scale;
      },
      calcIni : function(des, per) {
        return initMap[des][per];
      },
      calcMov : function(des, per) {
        return movMap[des][per];
      },
      calcHaF : function(fort, des) {
        var HaF = [{}, {}, {}, {}, {}];
        HaF = getHaFRange(HaF, des);
        HaF = getHaFPoints(HaF, fort);
        return HaF;
      }

    };
  });
