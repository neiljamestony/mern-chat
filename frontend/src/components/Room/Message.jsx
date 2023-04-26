import React from "react";
import { Box, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export default function Message({ me, msg, typing }) {
  const sender = JSON.parse(localStorage.getItem("udata")) || [];
  const { room } = useSelector((state) => state.chat);
  return (
    <Box
      padding={2}
      display="flex"
      justifyContent={me ? "flex-end" : "flex-start"}
      alignItems="center"
    >
      {!me && (
        <Avatar
          ml={!me && 2}
          mr={!me && -2}
          mt="auto"
          src={room.profile}
          size="xs"
        />
      )}
      <Box
        padding={2}
        borderRadius={20}
        maxWidth="60%"
        bg={me ? "#1b70e0" : "#e6e8e7"}
        mr={me ? 4 : 0}
        ml={me ? 0 : 4}
        color={me ? "#fff" : "black"}
      >
        {msg}
      </Box>
      {me && (
        <Avatar
          ml={me && -2}
          mr={me && 2}
          mt="auto"
          src={sender.profile}
          size="xs"
        />
      )}
    </Box>
  );
}
