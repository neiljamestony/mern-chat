import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import { socket } from "../../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom, isTyping } from "../../app/redux/ChatSlice";
import { sendMsg } from "../../app/auth";

export default function Footer() {
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState(null);
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.chat);
  const sender = JSON.parse(localStorage.getItem("udata")) || [];

  const onMessage = async () => {
    await sendMsg({ from: sender._id, to: room._id, message: msg });
    let r = { ...room };
    r.messages = [...r.messages, { me: true, msg: msg }];
    socket.emit("send-msg", { from: sender._id, to: room._id, message: msg });
    dispatch(updateRoom(r));
    setMsg("");
  };

  useEffect(() => {
    socket.on("receive-msg", (msg) => {
      setNewMsg({ me: false, msg: msg });
    });
  }, []);

  // CHECK IF THE USER IS TYPING
  useEffect(() => {
    socket.emit("typing", {
      to: room._id,
      typing: msg.length > 0,
      sender: sender.name,
    });
  }, [msg]);

  // APPEND NEW MESSAGES TO ROOM MESSAGES ARRAY

  useEffect(() => {
    let r = { ...room };
    r.messages = [...r.messages, newMsg];
    newMsg && dispatch(updateRoom(r));
  }, [newMsg]);

  useEffect(() => {
    socket.on("receive-typing", (response) => {
      dispatch(isTyping(response));
    });
  }, []);

  return (
    <Box
      h={50}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      gap={2}
    >
      <Input
        flexGrow={1}
        type="text"
        placeholder="Enter Message"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        onKeyPress={(e) => e.key === "Enter" && onMessage()}
        autoFocus
      />
      <Button onClick={onMessage}>Send</Button>
    </Box>
  );
}
