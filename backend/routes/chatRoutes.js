const express = require("express");
const router = express.Router();
const {
  _fetchUsers,
  addMessage,
  getAllMessages,
} = require("../controller/chatController");

router.post("/users", _fetchUsers);
router.post("/addMsg", addMessage);
router.post("/readMessages", getAllMessages);

module.exports = router;
