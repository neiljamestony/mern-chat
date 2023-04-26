import { useEffect } from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { _fetchUsers } from "../../app/auth";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import UserComponent from "./UserComponent";

export default function Sidebar() {
  return (
    <Box
      minH={600}
      minWidth="30%"
      borderRadius="3px 0 0 3px"
      borderRight="1px solid #d2d5d9"
    >
      <Box
        display="block"
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <Box fontSize={23} fontWeight="bold">
          CHATIFY
        </Box>
        <Box mt={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />

            <Input type="text" placeholder="Search People" />
          </InputGroup>
        </Box>
      </Box>
      <UserComponent />
    </Box>
  );
}
