import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Navbar from "./Components/Navbar";
import Cookies from "js-cookie";

function App() {
  
  const [flag, setFlag] = useState(false);
  
  let token = Cookies.get("Token") || null;
  
  useEffect(() => {
    token = Cookies.get("Token") || null;
  }, [flag]);

  const handelChnage = () => {
    setFlag((prev) => !prev);
  };

  return (
    <div className="App">
      <Navbar handelChnage={handelChnage}/>
      <AllRoutes handelChnage={handelChnage}/>
    </div>
  );
}

export default App;
