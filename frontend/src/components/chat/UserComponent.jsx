import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "../../assets/css/UserComponent.css";
import { _fetchUsers } from "../../app/auth";
import { useQuery } from "react-query";
import { socket } from "../../socket/socket";
import ChatUserComponent from "./ChatUserComponent";

export default function UserComponent() {
  const sender = JSON.parse(localStorage.getItem("udata")) || [];
  const query = useQuery(["fetchUsers", { sender: sender._id }], () =>
    _fetchUsers({ sender: sender._id })
  );
  useEffect(() => {
    if (sender) {
      socket.emit("add-user", sender._id);
    }
  }, [sender, socket]);

  return (
    <Box
      height={486}
      overflow="hidden"
      _hover={{
        overflowY: query.data?.length > 5 ? "scroll" : "none",
      }}
    >
      {query?.data?.map((value, key) => {
        return (
          <ChatUserComponent
            data={value}
            {...value}
            key={key}
            socket={socket}
          />
        );
      })}
    </Box>
  );
}
