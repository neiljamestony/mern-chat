import { useEffect, useState } from "react";
import {
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  AvatarBadge,
} from "@chakra-ui/react";
import { MoreHoriz } from "@mui/icons-material";
import { updateRoom } from "../../app/redux/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMsgs } from "../../app/auth";
import { useQuery } from "react-query";
import { socket } from "../../socket/socket";

export default function ChatUserComponent({ name, data, profile, _id }) {
  const dispatch = useDispatch();
  const [onlineUsers, sols] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const sender = JSON.parse(localStorage.getItem("udata")) || [];

  const msgsQry = useQuery(
    ["readAllMessages", { from: sender._id, to: data?._id }],
    () => getAllMsgs({ from: sender._id, to: data?._id })
  );

  const onChat = (formData) => {
    dispatch(updateRoom({ ...formData, messages: msgsQry.data || [] }));
  };

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.auth = { uid: sender._id };
      socket.on("users", (response) => {
        sols((prev) => [...prev, response]);
      });
    }
  }, []);

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
          <Avatar src={profile}>
            {onlineUsers.includes(_id) && (
              <AvatarBadge boxSize="1.10em" bg="green.500" />
            )}
          </Avatar>
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
            border="none"
            icon={<MoreHoriz fontSize="medium" />}
            backgroundColor="#fff"
            boxShadow="1px 1px 1px 0.5px rgba(0, 0, 0, 0.1)"
          />
        )}
      </Flex>
    </CardHeader>
  );
}
