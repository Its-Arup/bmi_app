import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = Cookies.get("Token");

  return token ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
