import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TypingIcon from "../../assets/img/typing.gif";
import Message from "./Message";

export default function Body({ room }) {
  const { isUserTyping } = useSelector((state) => state.chat);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [room.messages]);

  return (
    <Box h={490} overflowY={room?.messages.length > 7 ? "scroll" : "none"}>
      {room?.messages.map((value, key) => {
        return <Message key={key} {...value} />;
      })}
      {isUserTyping.typing && (
        <Message
          me={false}
          typing={isUserTyping.typing}
          msg={
            <img src={TypingIcon} alt="typing-icon" height="1px" width="30px" />
          }
        />
      )}
    </Box>
  );
}
