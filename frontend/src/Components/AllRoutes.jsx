import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Bmi from "../Pages/Bmi";
import AllBmi from "../Pages/AllBmi";
import PrivateRoute from "./PrivateRoute";

function AllRoutes({handelChnage}) {
  return (
    <Routes>
      <Route path="/login" element={<Login handelChnage={handelChnage}/>} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/bmi"
        element={
          <PrivateRoute>
            <Bmi />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <AllBmi />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
