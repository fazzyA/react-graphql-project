const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeescheduleSchema = new Schema({
  employeeId: {
    type: String,
    unique: false,
    required: true
  },
  dayOfWeek: {
    type: String,
    unique: false,
    required: false
  },
  joinTime: {
    type: String,
    unique: false,
    required: false
  },
  off: {
    type: Boolean,
    unique: false,
    required: false
  },
  createdAt: {
    type: String,
    unique: false,
    required: false
  },
  perDayPaid: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Employeeschedule", employeescheduleSchema);