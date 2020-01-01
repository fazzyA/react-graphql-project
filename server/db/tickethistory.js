const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickethistorySchema = new Schema({
  assignedTo: {
    type: String,
    unique: false,
    required: false
  },
  ticketId: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Tickethistory", tickethistorySchema);