const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  status: {
    type: String,
    unique: false,
    required: false
  },
  role: {
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
  }
});

module.exports = mongoose.model("User", userSchema);