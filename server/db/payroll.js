const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema({
  employeeId: {
    type: String,
    unique: false,
    required: true
  },
  date: {
    type: String,
    unique: false,
    required: false
  },
  salary: {
    type: String,
    unique: false,
    required: false
  },
  ratePerHour: {
    type: String,
    unique: false,
    required: false
  },
  ratePerDay: {
    type: String,
    unique: false,
    required: false
  },
  totalWorkedHours: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Payroll", payrollSchema);