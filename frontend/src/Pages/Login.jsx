import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Container,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login({handelChnage}) {
  const [details, setDetails] = useState({
    email: "",
    pass: "",
  });

  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();

  function addToast(msg) {
    toastIdRef.current = toast({ description: msg });
  }

  const handleChange = (e) => {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://bmi-app-3cbh.onrender.com/user/login", details)
      .then((res) => {
        console.log(res.data);
        Cookies.set('Token', res.data.token , { expires: 7 })
        addToast("Login Successful !");
        handelChnage()
        navigate("/bmi")
      })
      .catch((err) => {
        console.log(err.message);
        addToast("Login Error!")
      });
  };

  return (
    <Container maxW="md">
      <Heading as="h2" size="xl" mt={10} mb={10}>
        Login Here
      </Heading>
      <form onSubmit={handelSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="email@mail.com"
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Enter Password</FormLabel>
          <Input
            type="password"
            name="pass"
            value={details.pass}
            onChange={handleChange}
            placeholder="********"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Login;
