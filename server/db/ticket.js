const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  customerId: {
    type: String,
    unique: false,
    required: true
  },
  category: {
    type: String,
    unique: false,
    required: false
  },
  assignTo: {
    type: String,
    unique: false,
    required: false
  },
  description: {
    type: String,
    unique: false,
    required: false
  },
  comment: {
    type: String,
    unique: false,
    required: false
  },
  dateCallReceived: {
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
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);