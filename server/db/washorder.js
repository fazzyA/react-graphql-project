const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const washorderSchema = new Schema({
  status: {
    type: String,
    unique: false,
    required: false
  },
  description: {
    type: String,
    unique: false,
    required: false
  },
  customerId: {
    type: String,
    unique: false,
    required: true
  },
  location: {
    type: String,
    unique: false,
    required: false
  },
  payment: {
    type: String,
    unique: false,
    required: false
  },
  customerVerification: {
    type: String,
    unique: false,
    required: false
  },
  region: {
    type: String,
    unique: false,
    required: false
  },
  comments: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Washorder", washorderSchema);