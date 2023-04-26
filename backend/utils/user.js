let users = [];

const onAuth = () => {
  socket.on("authenticate", (user) => {
    users.push({ id: user.id, uname: user.username });
  });
};

module.exports = { onAuth };
