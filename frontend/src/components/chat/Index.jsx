import React from "react";
import { Card, CardBody, HStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { _fetchUsers } from "../../app/auth";
import Sidebar from "./Sidebar";
import Message from "./Message";

const Chat = ({ messages, setMessages }) => {
  return (
    <Card maxW="xl" variant="outline" minH={600} minW={1200}>
      <CardBody margin={0} padding={0}>
        <HStack spacing={0}>
          <Sidebar />
          <Message />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default Chat;
