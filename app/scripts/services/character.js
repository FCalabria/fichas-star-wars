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
    var defaultChar = {
      raceChar : [],
      gifts : [],
      defaults : []
    };
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
        des: {},
        con: {},
        mec: {},
        per: {},
        for: {},
        tec: {},
        force: {}
      }
    }

    return {
      create: function(charact) {
        if(charact.sensitive && !charact.hasOwnProperty('forcePts')) {charact.forcePts = 8;}
        charact = _.merge(emptyChar, charact);

        charact.attributes.foBase = this.calcFO(charact.attributes.for[0], charact.scale);
        charact.attributes.fdBase = this.calcFD(charact.attributes.for[0], charact.scale);
        charact.attributes.ini = this.calcIni(charact.attributes.des[0], charact.attributes.per[0]);
        charact.attributes.mov = this.calcMov(charact.attributes.des[0], charact.attributes.per[0]);
        charact.healthAndFatigue = charact.healthAndFatigue || this.calcHaF(charact.attributes.for[0], charact.attributes.des[0]);

        var desDefault = charact.attributes.des - 2;
        charact.habilities.des.acrobacias = charact.habilities.des.acrobacias || [desDefault];
        charact.habilities.des.arcaicas = charact.habilities.des.arcaicas || [desDefault];
        charact.habilities.des.artesMarciales = charact.habilities.des.artesMarciales || [desDefault];
        charact.habilities.des.blasters = charact.habilities.des.blasters || [desDefault];
        charact.habilities.des.cuerpoACuerpo = charact.habilities.des.cuerpoACuerpo || [desDefault];
        charact.habilities.des.delito = charact.habilities.des.delito || [desDefault];
        charact.habilities.des.esconderse = charact.habilities.des.esconderse || [desDefault];
        charact.habilities.des.equilibrio = charact.habilities.des.equilibrio || [desDefault];
        charact.habilities.des.esquivar = charact.habilities.des.esquivar || [desDefault];
        charact.habilities.des.pesadas = charact.habilities.des.pesadas || [desDefault];
        charact.habilities.des.sableDeLuz = charact.habilities.des.sableDeLuz || [desDefault];
        charact.habilities.des.sigilo = charact.habilities.des.sigilo || [desDefault];

        var conDefault = charact.attributes.con - 2;
        charact.habilities.con.alienigenas = charact.habilities.con.alienigenas || [conDefault];
        charact.habilities.con.bajosFondos = charact.habilities.con.bajosFondos || [conDefault];
        charact.habilities.con.burocracia = charact.habilities.con.burocracia || [conDefault];
        charact.habilities.con.ciencia = charact.habilities.con.ciencia || [conDefault];
        charact.habilities.con.cultura = charact.habilities.con.cultura || [conDefault];
        charact.habilities.con.lenguas = charact.habilities.con.lenguas || [conDefault];
        charact.habilities.con.sistPlanetarios = charact.habilities.con.sistPlanetarios || [conDefault];
        charact.habilities.con.supervivencia = charact.habilities.con.supervivencia || [conDefault];
        charact.habilities.con.tecnologia = charact.habilities.con.tecnologia || [conDefault];

        var mecDefault = charact.attributes.mec - 2;
        charact.habilities.mec.artilleria = charact.habilities.mec.artilleria || [mecDefault];
        charact.habilities.mec.astrogracion = charact.habilities.mec.astrogracion || [mecDefault];
        charact.habilities.mec.cabalgar = charact.habilities.mec.cabalgar || [mecDefault];
        charact.habilities.mec.comunicaciones = charact.habilities.mec.comunicaciones || [mecDefault];
        charact.habilities.mec.condTierra = charact.habilities.mec.condTierra || [mecDefault];
        charact.habilities.mec.escudos = charact.habilities.mec.escudos || [mecDefault];
        charact.habilities.mec.pilAndadores = charact.habilities.mec.pilAndadores || [mecDefault];
        charact.habilities.mec.pilAstronave = charact.habilities.mec.pilAstronave || [mecDefault];
        charact.habilities.mec.repulsores = charact.habilities.mec.repulsores || [mecDefault];
        charact.habilities.mec.sensores = charact.habilities.mec.sensores || [mecDefault];

        var perDefault = charact.attributes.per - 2;
        charact.habilities.per.atencion = charact.habilities.per.atencion || [perDefault];
        charact.habilities.per.avIntenciones = charact.habilities.per.avIntenciones || [perDefault];
        charact.habilities.per.buscar = charact.habilities.per.buscar || [perDefault];
        charact.habilities.per.instruccion = charact.habilities.per.instruccion || [perDefault];
        charact.habilities.per.interrogar = charact.habilities.per.interrogar || [perDefault];
        charact.habilities.per.intimidar = charact.habilities.per.intimidar || [perDefault];
        charact.habilities.per.jugar = charact.habilities.per.jugar || [perDefault];
        charact.habilities.per.liderazgo = charact.habilities.per.liderazgo || [perDefault];
        charact.habilities.per.negociar = charact.habilities.per.negociar || [perDefault];
        charact.habilities.per.orientacion = charact.habilities.per.orientacion || [perDefault];
        charact.habilities.per.persuadir = charact.habilities.per.persuadir || [perDefault];
        charact.habilities.per.rastrear = charact.habilities.per.rastrear || [perDefault];
        charact.habilities.per.reconocimiento = charact.habilities.per.reconocimiento || [perDefault];
        charact.habilities.per.timar = charact.habilities.per.timar || [perDefault];

        var forDefault = charact.attributes.for - 2;
        charact.habilities.for.armArrojadizas = charact.habilities.for.armArrojadizas || [forDefault];
        charact.habilities.for.correr = charact.habilities.for.correr || [forDefault];
        charact.habilities.for.escalar = charact.habilities.for.escalar || [forDefault];
        charact.habilities.for.nadar = charact.habilities.for.nadar || [forDefault];
        charact.habilities.for.pelea = charact.habilities.for.pelea || [forDefault];
        charact.habilities.for.saltar = charact.habilities.for.saltar || [forDefault];
        charact.habilities.for.voluntad = charact.habilities.for.voluntad || [forDefault];

        var tecDefault = charact.attributes.tec - 2;
        charact.habilities.tec.demolicion = charact.habilities.tec.demolicion || [tecDefault];
        charact.habilities.tec.primAuxilios = charact.habilities.tec.primAuxilios || [tecDefault];
        charact.habilities.tec.progComputadores = charact.habilities.tec.progComputadores || [tecDefault];
        charact.habilities.tec.progDroides = charact.habilities.tec.progDroides || [tecDefault];
        charact.habilities.tec.repNaves = charact.habilities.tec.repNaves || [tecDefault];
        charact.habilities.tec.repRepulsores = charact.habilities.tec.repRepulsores || [tecDefault];
        charact.habilities.tec.repSables = charact.habilities.tec.repSables || [tecDefault];
        charact.habilities.tec.seguridad = charact.habilities.tec.seguridad || [tecDefault];

        var forceDefault = -2;
        charact.habilities.force.controlar = charact.habilities.force.controlar || [forceDefault];
        charact.habilities.force.sentir = charact.habilities.force.sentir || [forceDefault];
        charact.habilities.force.alterar = charact.habilities.force.alterar || [forceDefault];

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
