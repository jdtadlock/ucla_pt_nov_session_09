const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UberEatSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  }
});

module.exports = mongoose.model('UberEat', UberEatSchema);
