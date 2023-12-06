import {
  Container,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";

import axios from "axios";
import Cookies from "js-cookie";

import React, { useState } from "react";

function Bmi() {
  const [bmivalue, setValue] = useState({
    weight: 50.0,
    height: 1.73,
    time: Date(),
  });

  const [actualBmi, setactualBmi] = useState(0);

  const handelSubmit = (e) => {
    e.preventDefault();

    const calculation = bmivalue.weight / (bmivalue.height * bmivalue.height);

    const currentTime = Date();

    setValue({ ...bmivalue, time: currentTime });

    setactualBmi(calculation);
    console.log(bmivalue);
    console.log(calculation);

    const token = Cookies.get("Token") || "";

    const payload = {
      weight: bmivalue.weight,
      height: bmivalue.height,
      time: bmivalue.time,
      bmi: calculation,
    };

    axios({
      method: "POST",
      url: "https://bmi-app-3cbh.onrender.com/bmi/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container maxW="md">
      <Heading as="h2" size="xl" mt={10} mb={10}>
        BMI Calculator
      </Heading>
      <form onSubmit={handelSubmit}>
        <FormLabel>Enter Your Weight</FormLabel>
        <NumberInput
          precision={2}
          step={0.5}
          value={bmivalue.weight}
          onChange={(valueString) =>
            setValue({ ...bmivalue, weight: Number(valueString) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel>Enter Your Height In Meter</FormLabel>
        <NumberInput
          defaultValue={1.73}
          precision={2}
          step={0.1}
          value={bmivalue.height}
          onChange={(valueString) =>
            setValue({ ...bmivalue, height: Number(valueString) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
      {actualBmi != 0 && (
        <Box w="100%" p={4}>
          <Heading as="h2" size="xl">
            Your BMI is : {actualBmi.toFixed(2)}
          </Heading>
        </Box>
      )}
    </Container>
  );
}

export default Bmi;
