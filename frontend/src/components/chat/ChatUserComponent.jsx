import React from "react";
import {
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { updateRoom } from "../../app/redux/ChatSlice";
import { useDispatch } from "react-redux";
import { getAllMsgs } from "../../app/auth";
import { useQuery } from "react-query";

export default function ChatUserComponent({ name, data, profile }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = React.useState(false);
  const sender = JSON.parse(localStorage.getItem("udata")) || [];

  const msgsQry = useQuery(
    ["readAllMessages", { from: sender._id, to: data?._id }],
    () => getAllMsgs({ from: sender._id, to: data?._id })
  );

  const onChat = (formData) => {
    dispatch(updateRoom({ ...formData, messages: msgsQry.data || [] }));
  };

  return (
    <CardHeader
      _hover={{
        backgroundColor: "#f5f7f6",
        cursor: "pointer",
        borderRadius: 5,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onChat(data)}
    >
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar src={profile} />
          <Box>
            <Heading textAlign="left" size="sm">
              {name === sender.name ? "Yourself" : name}
            </Heading>
          </Box>
        </Flex>
        {isHovered && (
          <IconButton
            borderRadius={20}
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<SettingsIcon />}
            backgroundColor="#fff"
            boxShadow="1px 1px 1px 0.5px rgba(0, 0, 0, 0.1)"
          />
        )}
      </Flex>
    </CardHeader>
  );
}
