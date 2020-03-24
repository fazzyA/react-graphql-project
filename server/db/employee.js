const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: false
  },
  userId: { 
    type: String,
    unique: false,
    required: true
  }, 
  gender: {
    type: String,
    unique: false,
    required: false
  },
  ratePerHour: {
    type: String,
    unique: false,
    required: false
  },
  jobTitle: {
    type: String,
    unique: false,
    required: false
  },
  hoursPerWeek: {
    type: String,
    unique: false,
    required: false
  },
  joinDate: {
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
  payrollid: {
    type: String,
    unique: false,
    required: false
  },
  badge: {
    type: String,
    unique: false,
    required: false
  },
  pin: {
    type: String,
    unique: false,
    required: false
  },
  picture: {
    type: String,
    unique: false,
    required: false
  },
  department: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Employee", employeeSchema);