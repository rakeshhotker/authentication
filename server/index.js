const express = require("express");
const app = express();

const cors = require("cors");
//middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/auth", require("./routes/jwtAuth"));
app.listen(5000, () => {
  console.log("Server listening on Port 5000");
});
