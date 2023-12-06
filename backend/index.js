const express = require("express");
const { Connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const app = express();
const cors = require('cors');
const { bmiRouter } = require("./Routes/bmi.route");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/bmi", bmiRouter);

app.get("/", function(req, res){
  res.send({msg :"home_page"})
})

app.listen(PORT, async () => {
  try {
    await Connection;
    console.log(`server listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
