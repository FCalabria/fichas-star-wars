var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var characterSchema = {
  _id: { type: String },
  player: { type: String },
  name: {
    type: String,
    required: true
  }
};

mongoose.model('Character', characterSchema);
