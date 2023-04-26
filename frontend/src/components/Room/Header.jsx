import React from "react";
import {
  CardHeader,
  Box,
  Flex,
  Avatar,
  Heading,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

export default function Header({ room }) {
  return (
    <CardHeader h={70} p={3} borderBottom="1px solid #d2d5d9">
      <Flex spacing="4">
        <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap" mb={14}>
          <Avatar src={room.profile}>
            <AvatarBadge boxSize="1.10em" bg="green.500" />
          </Avatar>
          <Box>
            <Heading size="sm">{room?.name}</Heading>
          </Box>
        </Flex>
        <IconButton
          borderRadius={20}
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<SettingsIcon />}
          backgroundColor="#fff"
          boxShadow="1px 1px 1px 0.5px rgba(0, 0, 0, 0.1)"
        />
      </Flex>
    </CardHeader>
  );
}
