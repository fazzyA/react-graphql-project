const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  date: {
    type: String,
    unique: false,
    required: true
  },
  startTime: {
    type: String,
    unique: false,
    required: false
  },
  endTime: {
    type: String,
    unique: false,
    required: false
  },
  techId: {
    type: String,
    unique: false,
    required: false
  },
  companyTruckId: {
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
  status: {
    type: String,
    unique: false,
    required: false
  },
  gasExpense: {
    type: String,
    unique: false,
    required: false
  },
  chemicalExpense: {
    type: String,
    unique: false,
    required: false
  },
  profit: {
    type: String,
    unique: false,
    required: false
  },
  loss: {
    type: String,
    unique: false,
    required: false
  },
  totalSales: {
    type: String,
    unique: false,
    required: false
  },
  totalHrs: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Route", routeSchema);