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
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import ViteIcon from "../../../public/vite.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { _registerAuth } from "../../app/auth";
import { useMutation } from "react-query";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);

  const { mutate, isLoading } = useMutation(_registerAuth, {
    onSuccess: (res) => {
      if (res.status > 200) {
        toast({ title: res.msg, status: "error", duration: 3000 });
      } else {
        toast({
          title: `welcome ${res.name}`,
          status: "success",
          duration: 3000,
        });
        localStorage.setItem("udata", JSON.stringify(res));
        navigate("/");
      }
    },
    onError: (err) => {
      toast.error("an error has occured, please try again");
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    if (data.confirmPassword !== data.password) {
      toast({
        title: `Confirm password mismatch!`,
        status: "error",
        duration: 3000,
      });
    }
    mutate(data);
  };

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
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                {...register("name")}
                maxLength={30}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                maxLength={30}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  maxLength={30}
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
            <FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showCPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    maxLength={30}
                    {...register("confirmPassword")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowCPassword(!showCPassword)}
                    >
                      {showCPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack spacing={2}>
            <ButtonGroup width="100%">
              <Button
                type="submit"
                colorScheme="messenger"
                size="md"
                width="360px"
                isLoading={isLoading}
                loadingText="PROCESSING"
              >
                REGISTER
              </Button>
            </ButtonGroup>
            <Button
              onClick={() => navigate("/login")}
              fontSize={12}
              _disabled={isLoading}
            >
              Already have an account ? Login here.
            </Button>
          </Stack>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
