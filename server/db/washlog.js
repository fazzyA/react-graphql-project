const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const washlogSchema = new Schema({
  routeId: {
    type: String,
    unique: false,
    required: true
  },
  washOrderId: {
    type: String,
    unique: false,
    required: false
  },
  stopNumber: {
    type: String,
    unique: false,
    required: false
  },
  reachAt: {
    type: String,
    unique: false,
    required: false
  },
  departAt: {
    type: String,
    unique: false,
    required: false
  },
  createdAt: {
    type: String,
    unique: false,
    required: false
  },
  status: {
    type: String,
    unique: false,
    required: false
  },
  companyJobSIte: {
    type: String,
    unique: false,
    required: false
  },
  specialInstruction: {
    type: String,
    unique: false,
    required: false
  },
  vehicleType: {
    type: String,
    unique: false,
    required: false
  },
  listpieces: [{
    type: String,
    unique: false,
    required: false
  }],
  estimateTime: {
    type: String,
    unique: false,
    required: false
  },
  hoursWorked: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Washlog", washlogSchema);