const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Chat = mongoose.model('chat', chatSchema);
