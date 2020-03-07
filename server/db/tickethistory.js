const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tickethistorySchema = new Schema({
  ticketId: {
    type: String,
    unique: false,
    required: true
  },
  assignedTo: {
    type: String,
    unique: false,
    required: false
  },
  assignedBy: {
    type: String,
    unique: false,
    required: false
  },
  status: {
    type: String,
    unique: false,
    required: false
  },
  forwardDept: {
    type: String,
    unique: false,
    required: false
  },
  comments: {
    type: String,
    unique: false,
    required: false
  }});

module.exports = mongoose.model("Tickethistory", tickethistorySchema);