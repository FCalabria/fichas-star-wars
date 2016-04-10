(function() {

  'use strict';
  var express = require('express'),
  router = express.Router(),
  storage = require('node-persist'),
  shortid = require('shortid'),
  _ = require('lodash');

  storage.initSync();
// TODO: Validation

  function getAll() {
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
  }

  function saveAll(array) {
    return new Promise(function(resolve, reject) {
      storage.setItem('sheets', array, function(error, value) {
        if (error) {
          reject(error);
        } else if (value === undefined) {
          reject('Error setting full list of characters');
        } else {
          resolve(value);
        }
      });
    });
  }

  function createIndex(completeArray) {
    var filteredArray = [];
    completeArray.forEach(function(sheet) {
      sheet = _.pick(sheet, ['name', 'player', 'id']);
      filteredArray.push(sheet);
    });
    return filteredArray;
  }

  function getOne(id, array) {
    var sheet = _.findWhere(array, {'id': id});
    return new Promise(function(resolve, reject) {
      if (sheet === undefined) {
        reject('No sheet with this id');
      } else {
        resolve(sheet);
      }
    });
  }

  function addOne(array, sheet) {
    array.push(sheet);
    return saveAll(array).then(function(resolve) {
      return sheet;
    });
  }

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
  }

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
  }

  function createCharacter(sheet, res) {
    sheet.id = shortid.generate();
    getAll().then(function(result) {
      return addOne(result, sheet);
    }).then(function(resolve) {
      res.json(resolve);
    }, function(reject) {
      res.status(400).send(reject);
    });
  }

  function updateCharacter(sheet, res) {
    getAll().then(function(result) {
      return updateOne(result, sheet);
    }).then(function(resolve) {
      res.json(resolve);
    }, function(reject) {
      res.status(400).send(reject);
    });
  }

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

  router.get('/api/sheets/export/:id', function(req, res) {
    getAll()
    .then(function(resolve) {
      return getOne(req.params.id, resolve);
    })
    .then(function(jsonToSend) {
      var fileName = jsonToSend.name.replace(/\s/g, '') + '.json';
      storage.setItem(fileName, [jsonToSend])
      .then(function() {
        res.download('./persist/' + fileName, fileName);
      })
      .finally(function() {
        storage.removeItem(fileName);
      })
    }, function(reject) {
      res.status(400).send(reject);
    });
  });

  router.post('/api/sheets', function(req, res) {
    var sheet = req.body;
    createCharacter(sheet, res);
  });

  router.post('/api/sheets/import', function(req, res) {
    var sheet = {};
    req.body instanceof Array ? sheet = req.body[0] : sheet = req.body;
    if (!sheet.id) {
      createCharacter(sheet, res);
    } else {
      updateCharacter(sheet, res);
    }
  });

  router.put('/api/sheets', function(req, res) {
    var sheet = req.body;
    updateCharacter(sheet, res);
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

  router.delete('/api/sheets', function(req, res) {
    return storage.removeItem('sheets', function(error) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.send('All sheets deleted');
      }
    });
  });

  module.exports = router;

}());
