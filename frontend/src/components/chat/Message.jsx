import React from "react";
import RoomIndex from "../Room/Index";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export default function Message() {
  const { room } = useSelector((state) => state.chat);
  return (
    <Box minH={600} minW="70%">
      {room === null ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box> CLICK ANY OF YOUR CONTACT TO VIEW MESSAGES</Box>
        </Box>
      ) : (
        <RoomIndex room={room} />
      )}
    </Box>
  );
}
