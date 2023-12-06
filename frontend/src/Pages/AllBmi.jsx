import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  Heading,
  Stack,
  StackDivider,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function AllBmi() {
  const [allBmi, setAllBmi] = useState([]);
  const token = Cookies.get("Token") || "";


  useEffect(() => {
    axios({
      method: "GET",
      url: "https://bmi-app-3cbh.onrender.com/bmi/getall",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setAllBmi(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, []);

  return (
    <>
      <Heading as="h2" size="xl" mt={10} mb={10}>
        See BMI History
      </Heading>
      <Heading as="h3" size="md" mt={10} mb={10}>
        {allBmi[0]?.username}'s BMI
      </Heading>
        <Container maxW={"1200px"} >
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Height</Th>
                  <Th>Weight</Th>
                  <Th>Time</Th>
                  <Th>Bmi</Th>
                  <Th>Funtion</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allBmi?.map((ele)=>{
                  return(
                    <Tr key={ele._id}>
                      <Td>{ele.height}</Td>
                      <Td>{ele.weight}</Td>
                      <Td>{ele.time}</Td>
                      <Td>{ele.bmi.toFixed(2)}</Td>
                      <Td><Button colorScheme="red">Delete</Button></Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
    </>
  );
}

export default AllBmi;
