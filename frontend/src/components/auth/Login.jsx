import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Stack,
  Image,
  CardFooter,
  Button,
  ButtonGroup,
  Box,
  InputGroup,
  InputRightElement,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import ViteIcon from "../../../public/vite.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { _loginAuth } from "../../app/auth";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoading, mutate } = useMutation(_loginAuth, {
    onSuccess: (res) => {
      if (res.status > 200) {
        toast({ status: "error", title: res.msg, duration: 3000 });
      } else {
        toast({
          status: "success",
          title: `welcome ${res.name}`,
          duration: 3000,
        });
        localStorage.setItem("udata", JSON.stringify(res));
        navigate("/");
      }
    },
    onError: (res) => {
      console.log(res);
    },
  });
  const { handleSubmit, register } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = (data) => mutate(data);

  return (
    <Card maxW="md" variant="outline" minH={300} minW={400}>
      <CardHeader
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        {" "}
        <Box fontSize={24} fontWeight="bold">
          CHATIFY
        </Box>
        <Image src={ViteIcon} alt="vite-icon" />
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" {...register("email")} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack spacing={2}>
            <ButtonGroup width="100%">
              <Button
                isLoading={isLoading}
                loadingText="PROCESSING"
                type="submit"
                colorScheme="messenger"
                size="md"
                width="360px"
              >
                LOGIN
              </Button>
            </ButtonGroup>
            <Button
              _disabled={isLoading}
              loadingText="Don't have an account ? Register here."
              onClick={() => navigate("/register")}
              fontSize={12}
            >
              Don't have an account ? Register here.
            </Button>
          </Stack>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
