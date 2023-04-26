import React from "react";
import { Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { _fetchUsers } from "../app/auth";
import Chat from "./chat/Index";

export default function Home() {
  const navigate = useNavigate();
  const [messages, setMessages] = React.useState([]);
  const udata = localStorage.getItem("udata") || [];

  React.useEffect(() => {
    if (!udata.length) navigate("/login");
  }, [udata]);

  return (
    <Container maxW="xl" centerContent>
      <Chat messages={messages} setMessages={setMessages} />
    </Container>
  );
}
