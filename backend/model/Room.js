const mongoose = require("mongoose");
const User = require("./User");

const roomSchema = mongoose.Schema(
  {
    socket_id: {
      type: String,
      required: true,
    },
    roomname: {
      type: String,
      required: true,
    },
    users: [
      {
        user_id: {
          type: String,
        },
      },
    ],
    messages: [
      {
        user_id: {
          type: String,
        },
        username: {
          type: String,
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    created_at: "created_at",
    updated_at: "updated_at",
  }
);

module.exports = mongoose.model("Room", roomSchema);
