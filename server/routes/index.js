(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var storage = require('node-persist');
  var shortid = require('shortid');
  var _ = require('lodash');

  storage.initSync();

// TODO: Validation
  var setInitialValues = function() {
    var initList = [
      {
        "id" : "1",
        "player" : "Paqui Calabria",
        "name" : "Han Solo",
        "sensitive" : false,
      },
      {
        "id" : shortid.generate(),
        "player" : "Adri",
        "name" : "Ng'kaar",
        "sensitive" : true,
      }
    ];
    storage.setItem('sheets', initList);
  }

  function getAll(){
    return new Promise(function(resolve, reject) {
      storage.getItem('sheets', function(error, value) {
        if (error) {
          reject(error);
        } else if (value === undefined) {
          reject('No list of characters');
        } else {
          resolve(value);
        }
      });
    });
  };

  function createIndex(completeArray) {
    var filteredArray = [];
    completeArray.forEach(function(sheet) {
      sheet = _.pick(sheet, ['name', 'player', 'id']);
      filteredArray.push(sheet);
    });
    return filteredArray;
  };

  function getOne(id, array) {
    var sheet = _.findWhere(array, {'id': id});
    return new Promise(function(resolve, reject) {
      if (sheet === undefined) {
        reject('No sheet with this id');
      } else {
        resolve(sheet);
      }
    });
  };

  function addOne(array, sheet) {
    return new Promise(function(resolve, reject) {
      array.push(sheet);
      resolve(sheet);
    });
  };

  function updateOne(array, sheet) {
    var oldIndex =  _.findIndex(array, {'id': sheet.id});
    return new Promise(function(resolve, reject) {
      if (oldIndex === -1 || !array) {
        reject('No sheet with this id');
      } else {
        array[oldIndex] = sheet;
        resolve(sheet);
      }
    });
  };

  function deleteOne(array, id) {
    var toDelete =  _.findIndex(array, {'id': id});
    return new Promise(function(resolve, reject) {
      if (toDelete === -1 || !array) {
        reject('No sheet with this id');
      } else {
        array = array.splice(toDelete, 1);
        resolve({'id' : id});
      }
    });
  };

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
  // TODO: Manage errors and objects validity
  router.get('/api/sheets/list', function(req, res) {
    getAll()
    .then(function(value) {
      res.json(createIndex(value));
    }, function(error) {
      res.status(400).send(error);
    });
  });

  router.get('/api/sheets/:id', function(req, res) {
    getAll()
    .then(function(resolve) {
      return getOne(req.params.id, resolve);
    })
    .then(function(resolve) {
      res.json(resolve);
    }, function(reject) {
      res.status(400).send(reject);
    });
  });

  router.post('/api/sheets', function(req, res) {
    var sheet = req.body;
    sheet.id = shortid.generate();
    getAll().then(function(result) {
      return addOne(result, sheet);
    }).then(function(resolve) {
      res.json(resolve);
    }, function(reject) {
      res.status(400).send(reject);
    });
  });

  router.put('/api/sheets', function(req, res) {
    var sheet = req.body;
    getAll().then(function(result) {
      return updateOne(result, sheet);
    }).then(function(resolve) {
      res.json(resolve);
    }, function(reject) {
      res.status(400).send(reject);
    });
  });

  router.delete('/api/sheets/:id', function(req, res) {
    getAll().then(function(result) {
      return deleteOne(result, req.params.id);
    }).then(function(resolve) {
      res.json(resolve);
    }, function(reject) {
      res.status(400).send(reject);
    });
  });

  router.delete('/api/sheets/all', function(req, res) {
    storage.removeItem('sheets').then(function() {
      res.send('All sheets deleted');
    }, function(error) {
      res.status(400).send(error);
    });
  });

  setInitialValues();
  module.exports = router;

}());
