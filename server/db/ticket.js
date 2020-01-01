const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  customerId: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);