const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Message = require("../model/Message");

const _fetchUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.body.sender } }).select(
    "-password"
  );
  res.json(users);
});

const addMessage = asyncHandler(async (req, res) => {
  const { from, to, message } = req.body;
  try {
    const msg = await Message.create({
      message: message,
      users: [from, to],
      sender: from,
    });
    if (msg) return res.json({ msg: "success" });
  } catch (err) {
    res.json(err);
  }
});

const getAllMessages = asyncHandler(async (req, res) => {
  const { from, to } = req.body;
  const rawMesages = await Message.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });
  const messages = rawMesages.map((msg) => {
    return {
      me: msg.sender.toString() === from,
      msg: msg.message,
    };
  });
  res.json(messages);
});

module.exports = { _fetchUsers, addMessage, getAllMessages };
