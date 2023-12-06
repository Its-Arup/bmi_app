import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar({handelChnage}) {
  const toast = useToast();
  const toastIdRef = useRef();
  let token = Cookies.get("Token") || null;

  function addToast(msg) {
    toastIdRef.current = toast({ description: msg });
  }

  const hendelLogout = () => {
    axios
      .get("https://bmi-app-3cbh.onrender.com/user/logout")
      .then((res) => {
        addToast("Logout Successful!");
        Cookies.remove("Token");
        handelChnage()
      })
      .catch((err) => {
        addToast("Logout Error!");
      });
  };


  return (
    <Container mt={2}>
      <Flex>
        <Box p="4">
          <Link to={"/login"}>Login</Link>
        </Box>
        <Spacer />
        {!token && (
          <Box p="4">
            <Link to={"/register"}>SignUp</Link>
          </Box>
        )}
        <Spacer />
        <Box p="4">
          <Link to={"/bmi"}>Bmi Calculator</Link>
        </Box>
        <Spacer />
        <Box p="4">
          <Link to={"/history"}>Bmi History</Link>
        </Box>
        <Spacer />
        {token && (
          <Box p="4">
            <Button colorScheme="blue" onClick={hendelLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Flex>
    </Container>
  );
}

export default Navbar;
