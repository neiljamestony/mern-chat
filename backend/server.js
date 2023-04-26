const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
env.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
const server = require("http").createServer(app);
connectDB();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let onlineUsers = new Map();
io.on("connection", (socket) => {
  // const uid = socket.handshake.auth.uid;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.sockets.emit("users", userId);
  });

  socket.on("send-msg", (data) => {
    const socketUser = onlineUsers.get(data.to);
    if (socketUser) {
      socket.to(data.to).emit("receive-msg", data.message);
    }
  });

  socket.on("typing", (data) => {
    const socketUser = onlineUsers.get(data.to);
    if (socketUser) {
      socket
        .to(socketUser)
        .emit("receive-typing", { typing: data.typing, sender: data.sender });
    }
  });

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
