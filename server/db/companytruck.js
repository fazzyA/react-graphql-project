const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companytruckSchema = new Schema({
  number: {
    type: String,
    unique: false,
    required: false
  },
  plate: {
    type: String,
    unique: false,
    required: false
  },
  modal: {
    type: String,
    unique: false,
    required: false
  },
  milesPerHr: {
    type: String,
    unique: false,
    required: false
  },
  license: {
    type: String,
    unique: false,
    required: false
  },
  avgFM: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Companytruck", companytruckSchema);