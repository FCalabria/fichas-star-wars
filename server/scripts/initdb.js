(function() {

  'use strict';
  var storage = require('node-persist'),
    fs = require('fs');

  storage.initSync();
  fs.readFile('./app/defaultDB/sheets.json', function (err, data) {
    if (err) {
      throw err;
    }
    storage.setItem('sheets', JSON.parse(data.toString()));
  });
}());
