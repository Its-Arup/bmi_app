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

function Register() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const toast = useToast();
  const toastIdRef = useRef();

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
    console.log(details);
    axios
      .post("https://bmi-app-3cbh.onrender.com/user/register", details)
      .then((res) => {
        console.log(res.data);
        addToast("Register Successful!");
        setDetails({
          username: "",
          email: "",
          pass: "",
        });
      })
      .catch((err) => {
        console.log(err.message);
        addToast("Error to Create Account!");
      });
  };

  return (
    <Container maxW="md">
      <Heading as="h2" size="xl" mt={10} mb={10}>
       Register Here
      </Heading>
      <form onSubmit={handelSubmit}>
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={details.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="email@mail.com"
            value={details.email}
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Enter Password</FormLabel>
          <Input
            type="password"
            name="pass"
            placeholder="*******"
            value={details.pass}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Register;
