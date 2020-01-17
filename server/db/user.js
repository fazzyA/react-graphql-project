const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


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

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    console.log(this.password)
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
// console.log(this.password)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});


module.exports = mongoose.model("User", userSchema);