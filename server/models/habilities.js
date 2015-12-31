var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var habilitiesSchema = {
  des: {
    required: true,
    type: {}
  }
};

mongoose.model('Habilities', habilitiesSchema);
