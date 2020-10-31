const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = User = mongoose.model("user", userSchema);
