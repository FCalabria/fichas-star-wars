'use strict';

/**
* @ngdoc service
* @name fichasStarWarsUtils.points
* @description
* # points
* Factory in the fichasStarWarsUtils.
*/
angular.module('starWarsCharacter')
.factory('swsPoints', function (_) {
  var usedSpecialPoints = function(raceChar, gifts, defaults) {
    var usedPoints = 0;
    var i = 0;
    for(i in raceChar) {
      if (raceChar[i].hasOwnProperty('cost')) { usedPoints += raceChar[i].cost; }
    }
    for(i in gifts) {
      if (gifts[i].hasOwnProperty('cost')) { usedPoints += gifts[i].cost; }
    }
    for(i in defaults) {
      if (defaults[i].hasOwnProperty('cost')) { usedPoints += defaults[i].cost; }
    }
    return usedPoints;
  };

  var usedAttrPoints = function(attributes) {
    return attributes.des[0] + attributes.mec[0] + attributes.tec[0] + attributes.con[0] + attributes.for[0] + attributes.per[0];
  };

  var usedHabPoints = function(character) {
    var attrs = character.attributes;
    var habs = character.habilities;
    var usedPoints = 0;
    _.forEach(habs, function(value, key) {
      var initValue;
      if (attrs.hasOwnProperty(key)) {
        initValue = attrs[key][0] - 2;
      } else {
        initValue = -2;
      }
      _.forEach(habs[key], function(value) {
        usedPoints += value[0] - initValue;
      });
    });
    return usedPoints;
  };

  var assignSpecialPoints = function(character) {
    var specialFields = ['gifts', 'defaults', 'raceChar'];
    var joined = {};

    // Create map of characteristics affected and the total value of the +/- points because of the specials
    for(var i in specialFields) {
      var field = specialFields[i];
      for(var j in character[field]) {
        var special = character[field][j].effect;
        if (special.length === 2) {
          joined.hasOwnProperty(special[0]) ? joined[special[0]] += special[1] : joined[special[0]] = special[1];
        }
      }
    }

    //clean special values and reassign them
    _.forEach(character.attributes, function(attr) {
      if (_.isArray(attr) && attr.length > 1) { attr.splice(1, 1); }
    });
    _.forEach(character.habilities, function(hab) {
      if (_.isArray(hab) && hab.length > 1) { hab.splice(1, 1); }
    });
    _.forEach(joined, function(value, key) {
      if (_.has(character, key)) { _.set(character, key+'[1]', value); }
    });
    return character;
  };


  return {
    usedAttrPoints : usedAttrPoints,
    usedHabPoints : usedHabPoints,
    usedSpecialPoints : usedSpecialPoints,
    assignSpecialPoints : assignSpecialPoints
  };

});
