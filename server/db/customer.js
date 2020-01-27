const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: false
  },
  phone: {
    type: String,
    unique: false,
    required: false
  },
  address: {
    type: String,
    unique: false,
    required: false
  },
  fax: {
    type: String,
    unique: false,
    required: false
  },
  area : {
    type: String,
    required : false
  }
});

module.exports = mongoose.model("Customer", customerSchema);