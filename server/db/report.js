const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: false
  },
  routeId: {
    type: String,
    unique: false,
    required: false
  },
  userId: {
    type: String,
    unique: false,
    required: false
  },
  description: {
    type: String,
    unique: false,
    required: false
  },
  createdAt: {
    type: String,
    unique: false,
    required: false
  },
  updatedAt: {
    type: String,
    unique: false,
    required: false
  },
  createdBy: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Report", reportSchema);