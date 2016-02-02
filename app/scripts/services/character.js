'use strict';

/**
* @ngdoc service
* @name fichasStarWarsUtils.character
* @description
* # character
* Factory in the fichasStarWarsUtils.
*/
angular.module('starWarsCharacter', [])
.factory('swsc', function (_) {
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

  var emptyChar = {
    player: '',
    name: '',
    imgUrl:'',
    race: '',
    age: 0,
    height: 0,
    weight: 0,
    scale: 0,
    sensitive: false,
    FUDGEPts: 5,
    forcePts: 4,
    darKSidePts: 0,
    description: '',
    attributes: {
      des: [0],
      con: [0],
      mec: [0],
      per: [0],
      for: [0],
      tec: [0]
    },
    habilities: {
      des: {
        acrobacias: [0, 0],
        arcaicas: [0, 0],
        artesMarciales: [0, 0],
        blasters: [0, 0],
        cuerpoACuerpo: [0, 0],
        delito: [0, 0],
        esconderse: [0, 0],
        equilibrio: [0, 0],
        esquivar: [0, 0],
        pesadas: [0, 0],
        sableDeLuz: [0, 0],
        sigilo: [0, 0]
      },
      con: {
        alienigenas: [0, 0],
        bajosFondos: [0, 0],
        burocracia: [0, 0],
        ciencia: [0, 0],
        cultura: [0, 0],
        lenguas: [0, 0],
        sistPlanetarios: [0, 0],
        supervivencia: [0, 0],
        tecnologia: [0, 0]
      },
      mec: {
        artilleria: [0, 0],
        astrogracion: [0, 0],
        cabalgar: [0, 0],
        comunicaciones: [0, 0],
        condTierra: [0, 0],
        escudos: [0, 0],
        pilAndadores: [0, 0],
        pilAstronave: [0, 0],
        repulsores: [0, 0],
        sensores: [0, 0]
      },
      per: {
        atencion: [0, 0],
        avIntenciones: [0, 0],
        buscar: [0, 0],
        instruccion: [0, 0],
        interrogar: [0, 0],
        intimidar: [0, 0],
        jugar: [0, 0],
        liderazgo: [0, 0],
        negociar: [0, 0],
        orientacion: [0, 0],
        persuadir: [0, 0],
        rastrear: [0, 0],
        reconocimiento: [0, 0],
        timar: [0, 0]
      },
      for: {
        armArrojadizas: [0, 0],
        correr: [0, 0],
        escalar: [0, 0],
        nadar: [0, 0],
        pelea: [0, 0],
        saltar: [0, 0],
        voluntad: [0, 0]
    },
      tec: {
        demolicion: [0, 0],
        primAuxilios: [0, 0],
        progComputadores: [0, 0],
        progDroides: [0, 0],
        repNaves: [0, 0],
        repRepulsores: [0, 0],
        repSables: [0, 0],
        seguridad: [0, 0]
      },
      force: {
        controlar: [0, 0],
        sentir: [0, 0],
        alterar: [0, 0]
      }
    },
    raceChar: [],
    gifts: [],
    defaults: [],
    weapons: [],
    armour: [],
    equipment: []
  };

  return {
    create: function(charact) {
      if(charact.sensitive && !charact.hasOwnProperty('forcePts')) {charact.forcePts = 8;}
      charact = _.merge(emptyChar, charact);

      charact.attributes.foBase = this.calcFO(charact.attributes.for[0], charact.scale);
      charact.attributes.fdBase = this.calcFD(charact.attributes.for[0], charact.scale);
      charact.attributes.ini = this.calcIni(charact.attributes.des[0], charact.attributes.per[0]);
      charact.attributes.mov = this.calcMov(charact.attributes.des[0], charact.attributes.per[0]);
      charact.healthAndFatigue = charact.healthAndFatigue || this.calcHaF(charact.attributes.for[0], charact.attributes.des[0]);

      charact = this.calcBaseHab(charact, 'des');
      charact = this.calcBaseHab(charact, 'con');
      charact = this.calcBaseHab(charact, 'mec');
      charact = this.calcBaseHab(charact, 'per');
      charact = this.calcBaseHab(charact, 'for');
      charact = this.calcBaseHab(charact, 'tec');
      charact = this.calcBaseHab(charact, 'force');

      return charact;
    },
    calcBaseHab : function(character, attribute) {
      _.forEach(character.habilities[attribute], function(value, key) {
        if (character.attributes[attribute] && _.isFinite(character.attributes[attribute][0])) {
          value[0] = character.attributes[attribute][0] - 2;
        } else {
          value[0] = -2;
        }
      });
      return character;
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
