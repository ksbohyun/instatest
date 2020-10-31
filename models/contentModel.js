const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  file: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
  },
  userId: {
    type: String,
    // required: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Content = mongoose.model("content", contentSchema);
